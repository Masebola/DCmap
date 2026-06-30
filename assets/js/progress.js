import { ERA_TOTALS, LEGACY_ITEM_TOTALS, STRUCTURED_ERA_IDS, STRUCTURED_LEGACY_IDS, STRUCTURED_MAIN_ISSUE_IDS } from '../../data/progress-manifest.js';
import { percent, unique } from './utils.js';
import { store } from './state.js';

export function issueStats(issueList = []) {
  const ids = unique(issueList.map(issue => typeof issue === 'string' ? issue : issue.id));
  const read = ids.filter(id => store.value.issueProgress[id]).length;
  return { read, total: ids.length, pct: percent(read, ids.length), complete: ids.length > 0 && read === ids.length };
}

export function legacyItemStats(id) {
  const total = LEGACY_ITEM_TOTALS[id] || 1;
  const read = Math.min(total, Math.max(0, Number(store.value.legacyProgress[id] || 0)));
  return { read, total, pct: percent(read, total), complete: read === total };
}

export function legacyEraStats(era) {
  const ids = era.blocks.flatMap(block => block.secs.flatMap(section => section.items.map(item => item.id)));
  const values = ids.map(legacyItemStats);
  const read = values.reduce((sum, value) => sum + value.read, 0);
  const total = values.reduce((sum, value) => sum + value.total, 0);
  return { read, total, pct: percent(read, total), groups: values.filter(value => value.complete).length, groupTotal: values.length };
}

export function structuredEraStats(model, scope = 'main') {
  const source = scope === 'optional' ? model.optionalIssues : scope === 'all' ? model.issues : model.mainIssues;
  return issueStats([...source.values()]);
}

export function globalStats() {
  const migratedIds = new Set(STRUCTURED_LEGACY_IDS);
  const legacyRead = Object.entries(store.value.legacyProgress || {}).reduce((sum, [id, value]) => {
    if (migratedIds.has(id)) return sum;
    const total = LEGACY_ITEM_TOTALS[id];
    return total ? sum + Math.min(total, Math.max(0, Number(value) || 0)) : sum;
  }, 0);
  const structuredRead = STRUCTURED_MAIN_ISSUE_IDS.filter(id => store.value.issueProgress[id]).length;
  const legacyTotal = Object.entries(ERA_TOTALS)
    .filter(([id]) => !STRUCTURED_ERA_IDS.includes(id))
    .reduce((sum, [, value]) => sum + value, 0);
  const total = legacyTotal + STRUCTURED_MAIN_ISSUE_IDS.length;
  const read = legacyRead + structuredRead;
  return { read, total, pct: percent(read, total) };
}
