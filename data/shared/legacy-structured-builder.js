import { entry, event, issue, range, route, routeBlock } from './helpers.js';

const stripHtml = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const firstYear = value => Number(String(value || '').match(/(?:19|20)\d{2}/)?.[0] || 0);
const normaliseDash = value => String(value || '').replace(/[‐‑‒–—]/g, '-');

function parseIssueToken(value) {
  const token = String(value || '').trim();
  return /^\d+$/.test(token) ? Number(token) : token;
}

function defaultPriority(item) {
  const tags = new Set(item.tags || []);
  if (tags.has('optional')) return 'optional';
  if (tags.has('essential') || tags.has('spine')) return 'core';
  if (tags.has('event') || tags.has('crossover')) return 'important';
  return 'recommended';
}

function matchCreatorRule(title, rules = []) {
  const rule = rules.find(item => item.test instanceof RegExp ? item.test.test(title) : title.includes(item.test));
  return rule || {};
}

function inferSeriesAndYear(rawSeries, config, context) {
  let series = rawSeries.trim();
  let explicitYear = 0;
  const yearMatch = series.match(/\((\d{4})\)\s*$/);
  if (yearMatch) {
    explicitYear = Number(yearMatch[1]);
    series = series.replace(/\s*\(\d{4}\)\s*$/, '').trim();
  }
  series = config.seriesAliases?.[series] || series;
  if (config.transformSeries) series = config.transformSeries(series, context);
  const volumeYear = explicitYear || config.seriesYears?.[series] || config.defaultVolumeYear || firstYear(context.block?.dates) || firstYear(config.dates);
  return { series, volumeYear };
}

export function parseLegacyIssues(item, config, context = {}) {
  const override = config.itemOverrides?.[item.id] || {};
  if (override.issues) return override.issues;
  const sourceTitle = override.issueTitle || item.t || '';
  const text = normaliseDash(sourceTitle);
  const match = text.match(/^(.+?)\s+#([A-Za-z0-9.]+)(?:-([A-Za-z0-9.]+))?/);
  if (!match) {
    if (override.allowEmpty) return [];
    throw new Error(`Could not parse issue range for ${item.id}: ${item.t}`);
  }
  const { series, volumeYear } = inferSeriesAndYear(match[1], config, { ...context, item });
  const start = parseIssueToken(match[2]);
  const end = match[3] ? parseIssueToken(match[3]) : start;
  const releaseYear = override.releaseYear || firstYear(item.n) || firstYear(context.block?.dates) || volumeYear;
  if (Number.isInteger(start) && Number.isInteger(end) && end >= start) return range(series, volumeYear, start, end, releaseYear);
  return [issue(series, volumeYear, start, releaseYear)];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function buildSegments(tokens, routeId, phase, indexBase) {
  const blocks = [];
  let buffer = [];
  let part = 1;
  const flush = () => {
    if (!buffer.length) return;
    blocks.push(routeBlock({
      id:`${routeId}-${phase.id}-reading-${indexBase}-${part++}`,
      title:phase.title,
      year:phase.dates,
      mode:'parallel',
      description:phase.summary,
      help:'Read these independent ranges in any order before moving beyond this phase.',
      steps:buffer
    }));
    buffer = [];
  };
  for (const token of tokens) {
    if (token.kind === 'event') {
      flush();
      blocks.push(routeBlock({
        id:`${routeId}-${phase.id}-${token.id}`,
        title:token.title,
        year:token.year,
        mode:'strict',
        description:token.summary,
        help:'Follow the event checklist in the exact displayed order.',
        steps:[token.id]
      }));
    } else buffer.push(token.id);
  }
  flush();
  return blocks;
}

export function buildStructuredEra(source, config) {
  const flatItems = [];
  source.blocks.forEach((block, blockIndex) => block.secs.forEach((section, sectionIndex) => section.items.forEach((item, itemIndex) => flatItems.push({
    item, block, section, blockIndex, sectionIndex, itemIndex,
    order: blockIndex * 10000 + sectionIndex * 1000 + itemIndex
  }))));

  const parsedById = new Map();
  for (const context of flatItems) {
    if (config.includeItem && !config.includeItem(context.item, context.section, context.block)) continue;
    parsedById.set(context.item.id, parseLegacyIssues(context.item, config, context));
  }

  const eventSpecs = config.events || [];
  const consumed = new Set();
  const eventByFirstItem = new Map();
  const builtEvents = eventSpecs.map(spec => {
    const sourceIds = spec.sourceItemIds || [];
    if (spec.consume !== false) sourceIds.forEach(id => consumed.add(id));
    const chapters = spec.chapters || sourceIds.flatMap(id => parsedById.get(id) || []);
    const optionalChapters = spec.optionalSourceItemIds?.flatMap(id => parsedById.get(id) || []) || spec.optionalChapters || [];
    const first = sourceIds.map(id => flatItems.find(context => context.item.id === id)).filter(Boolean).sort((a,b)=>a.order-b.order)[0];
    if (first) eventByFirstItem.set(first.item.id, spec.id);
    return event({
      ...spec,
      chapters,
      optionalChapters,
      legacyIds:unique([...(spec.legacyIds || []), ...sourceIds, ...sourceIds.map(id => flatItems.find(context => context.item.id === id)?.item.legacyId)])
    });
  });
  const eventMap = new Map(builtEvents.map(item => [item.id, item]));

  const contexts = flatItems.filter(context => parsedById.has(context.item.id));
  const builtEntries = [];
  const entryContext = new Map();
  for (const context of contexts) {
    const { item, section, block } = context;
    if (consumed.has(item.id)) continue;
    const override = config.itemOverrides?.[item.id] || {};
    if (override.exclude) continue;
    const routeId = override.routeId || config.resolveRoute?.(item, section, block) || config.routes?.[0]?.id;
    if (!routeId) continue;
    const creator = { ...matchCreatorRule(item.t, config.creatorRules), ...(override.creator || {}) };
    const built = entry({
      id:override.id || item.id,
      routeId,
      phaseId:block.id,
      title:override.title || item.t,
      year:override.year || block.dates,
      writers:override.writers || creator.writers || [],
      artists:override.artists || creator.artists || [],
      summary:override.summary || item.n || `Continue ${item.t} during ${block.title}.`,
      issues:parsedById.get(item.id) || [],
      priority:override.priority || defaultPriority(item),
      tags:unique([...(item.tags || []), ...(override.tags || [])]),
      legacyIds:unique([item.id, item.legacyId, ...(override.legacyIds || [])]),
      note:override.note || '',
      stop:override.stop || block.pause || ''
    });
    builtEntries.push(built);
    entryContext.set(built.id, context);
  }

  for (const spec of config.extraEntries || []) {
    builtEntries.push(entry({
      priority:'recommended', writers:[], artists:[], tags:[], legacyIds:[], note:'', stop:'',
      ...spec
    }));
  }

  const routeDefs = config.routes || [];
  const builtRoutes = routeDefs.map((definition, routeIndex) => {
    const blocks = [];
    for (const block of source.blocks) {
      const phaseEvents = builtEvents.filter(item => item.phaseId === block.id && item.routeIds?.includes(definition.id));
      const eventFirstIds = new Map(phaseEvents.map(item => {
        const spec = eventSpecs.find(spec => spec.id === item.id);
        const first = (spec?.sourceItemIds || []).map(id => flatItems.find(context => context.item.id === id)).filter(Boolean).sort((a,b)=>a.order-b.order)[0];
        return [first?.item.id, item];
      }).filter(([id]) => id));
      const tokens = [];
      for (const context of flatItems.filter(item => item.block.id === block.id).sort((a,b)=>a.order-b.order)) {
        const eventItem = eventFirstIds.get(context.item.id);
        if (eventItem) tokens.push({ kind:'event', ...eventItem });
        const entryItem = builtEntries.find(item => item.id === (config.itemOverrides?.[context.item.id]?.id || context.item.id));
        if (entryItem?.routeId === definition.id) tokens.push({ kind:'entry', id:entryItem.id });
      }
      for (const extra of builtEntries.filter(item => item.phaseId === block.id && item.routeId === definition.id && !entryContext.has(item.id))) {
        tokens.push({ kind:'entry', id:extra.id });
      }
      blocks.push(...buildSegments(tokens, definition.id, {
        id:block.id,
        title:block.title,
        dates:block.dates,
        summary:block.pause || stripHtml(source.desc)
      }, routeIndex));
    }
    return route({ ...definition, blocks });
  }).filter(item => item.steps.length);

  const phases = source.blocks.map((block, index) => {
    const routeIds = builtRoutes.filter(routeItem => routeItem.blocks.some(routeBlockItem => routeBlockItem.id.includes(`${routeItem.id}-${block.id}-`))).map(item => item.id);
    const eventIds = builtEvents.filter(item => item.phaseId === block.id).map(item => item.id);
    return {
      id:block.id,
      number:index + 1,
      title:block.title,
      dates:block.dates,
      summary:block.pause || stripHtml(source.desc),
      routeIds,
      eventIds,
      note:block.pause || ''
    };
  });

  return {
    format:'structured',
    id:config.id || source.id,
    label:config.label || source.label,
    title:config.title || source.title,
    subtitle:config.subtitle || source.subtitle,
    dates:config.dates || source.dates,
    description:config.description || stripHtml(source.desc),
    asOf:config.asOf || '',
    openingIssue:config.openingIssue || null,
    finaleIssue:config.finaleIssue || null,
    routes:builtRoutes,
    entries:builtEntries,
    events:builtEvents,
    phases
  };
}
