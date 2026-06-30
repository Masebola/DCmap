import { escapeHtml } from '../assets/js/utils.js';
import { issueStats, structuredEraStats } from '../assets/js/progress.js';
import { isOptionalEntry } from '../assets/js/data-model.js';
import { store } from '../assets/js/state.js';
import { entryCard, eventCard, issueChecklist, progressBar, badge, creatorLine } from './shared.js';

const expandedEntries = new Set();
const expandedEvents = new Set();

export function toggleInlineEntry(id) {
  expandedEntries.has(id) ? expandedEntries.delete(id) : expandedEntries.add(id);
}

export function toggleInlineEvent(id) {
  expandedEvents.has(id) ? expandedEvents.delete(id) : expandedEvents.add(id);
}

function preferences() {
  return store.value.preferences || {};
}

function activeRouteIds(model) {
  const stored = preferences().activeLanes || {};
  if (!Object.prototype.hasOwnProperty.call(stored, model.id)) return new Set(model.routes.keys());
  return new Set(stored[model.id] || []);
}

function entryVisible(entry) {
  const stats = issueStats(entry.issues || []);
  const prefs = preferences();
  if (isOptionalEntry(entry) && !prefs.includeOptional) return false;
  if (prefs.routeView === 'completed') return stats.complete;
  if (prefs.routeView === 'all') return true;
  if (prefs.autoHideCompleted && stats.complete) return false;
  return true;
}

function eventVisibleForLanes(event, active) {
  if (!event.routeIds?.length || event.type === 'hard-gate') return true;
  return event.routeIds.some(id => active.has(id));
}

function routeToolbar() {
  const prefs = preferences();
  return `<div class="route-toolbar panel">
    <div class="toolbar-group"><span class="toolbar-label">View</span><div class="segmented compact-segmented">
      ${[['reading','Reading list'],['all','All'],['completed','Completed']].map(([value,label]) => `<button class="${prefs.routeView===value?'active':''}" data-action="set-route-view" data-view="${value}">${label}</button>`).join('')}
    </div></div>
    <button class="filter-toggle${prefs.includeOptional?' active':''}" data-action="toggle-optional" aria-pressed="${Boolean(prefs.includeOptional)}">Optional ${prefs.includeOptional?'on':'off'}</button>
    <button class="filter-toggle${prefs.autoHideCompleted?' active':''}" data-action="toggle-auto-hide" aria-pressed="${Boolean(prefs.autoHideCompleted)}">Auto-hide ${prefs.autoHideCompleted?'on':'off'}</button>
    <a class="secondary-button compact-button" href="#/completed">Completed library</a>
  </div>`;
}

function laneToolbar(model) {
  const active = activeRouteIds(model);
  return `<section class="lane-toolbar panel"><div class="lane-toolbar-head"><div><span class="eyebrow">ACTIVE READING LANES</span><strong>${active.size} of ${model.routes.size} selected</strong></div><div><button class="secondary-button compact-button" data-action="select-all-lanes" data-era-id="${escapeHtml(model.id)}">Select All</button><button class="secondary-button compact-button" data-action="clear-all-lanes" data-era-id="${escapeHtml(model.id)}">Clear All</button></div></div><div class="lane-chip-grid">${[...model.routes.values()].map(route => `<button class="lane-chip${active.has(route.id)?' active':''}" data-action="toggle-active-lane" data-era-id="${escapeHtml(model.id)}" data-route-id="${escapeHtml(route.id)}" aria-pressed="${active.has(route.id)}"><span>${route.icon}</span>${escapeHtml(route.shortTitle)}</button>`).join('')}</div></section>`;
}

export function renderMasterFlow(model) {
  const stats = structuredEraStats(model, 'main');
  const optional = structuredEraStats(model, 'optional');
  return `<section class="page-hero"><span class="eyebrow">${escapeHtml(model.subtitle)}</span><h1>${escapeHtml(model.title)}</h1><p>${escapeHtml(model.description)}</p><div class="hero-progress">${progressBar(stats)}<strong>${stats.read} / ${stats.total} main-route issues · ${stats.pct}%</strong></div>${optional.total ? `<div class="optional-progress">Optional reading: ${optional.read}/${optional.total}</div>` : ''}</section>
  <div class="flow-toolbar"><a class="filter-chip active" href="#/era/${escapeHtml(model.id)}">Master Flow</a><a class="filter-chip" href="#/route/${escapeHtml(model.id)}">Routes</a><a class="filter-chip" href="#/event/${escapeHtml(model.id)}">Events</a><a class="filter-chip" href="#/outside">Outside the Roadmap</a></div>
  ${laneToolbar(model)}
  <div class="phase-stack">${model.phases.map(phase=>renderPhase(model,phase)).join('')}</div>`;
}

function renderPhase(model, phase) {
  const active = activeRouteIds(model);
  const entries = [...model.entries.values()].filter(entry => entry.phaseId === phase.id && active.has(entry.routeId) && (!isOptionalEntry(entry) || preferences().includeOptional));
  const events = phase.eventIds.map(id => model.events.get(id)).filter(event => event && eventVisibleForLanes(event, active));
  const phaseMainEntries = entries.filter(entry => !isOptionalEntry(entry));
  const phaseIssues = [...phaseMainEntries.flatMap(entry=>entry.issues||[]),...events.flatMap(event=>event.chapters||[])];
  if (phase.finale && model.finaleIssue) phaseIssues.push(model.finaleIssue);
  const stats = issueStats(phaseIssues);
  const grouped = phase.routeIds.filter(routeId => active.has(routeId)).map(routeId => {
    const route = model.routes.get(routeId);
    const routeEntries = entries.filter(entry => entry.routeId === routeId && entryVisible(entry));
    const hiddenComplete = entries.filter(entry => entry.routeId === routeId && issueStats(entry.issues || []).complete).length;
    if (!route || (!routeEntries.length && !hiddenComplete)) return '';
    return `<section class="route-lane"><div class="lane-heading"><div class="lane-icon accent-${escapeHtml(route.accent)}">${route.icon}</div><div><h3>${escapeHtml(route.shortTitle)}</h3><p>${escapeHtml(route.description)}</p></div><a href="#/route/${escapeHtml(model.id)}/${route.id}">Open route</a></div>${routeEntries.length ? `<div class="reading-grid">${routeEntries.map(entryCard).join('')}</div>` : `<div class="completed-hidden-note">${hiddenComplete} completed entr${hiddenComplete===1?'y':'ies'} hidden. Open the route or switch to All.</div>`}</section>`;
  }).join('');
  return `<article class="phase-card"><header class="phase-header"><div class="phase-number">${String(phase.number).padStart(2,'0')}</div><div><span class="eyebrow">${escapeHtml(phase.dates)}</span><h2>${escapeHtml(phase.title)}</h2><p>${escapeHtml(phase.summary)}</p></div><div class="phase-stat"><strong>${stats.pct}%</strong><small>${stats.read}/${stats.total}</small></div></header>${phase.note?`<div class="phase-note">${escapeHtml(phase.note)}</div>`:''}${events.length?`<section class="gate-zone"><div class="section-heading compact"><div><span class="eyebrow">EVENT GATES</span><h3>Pause and read in order</h3></div></div><div class="event-grid">${events.map(eventCard).join('')}</div></section>`:''}${grouped}${phase.finale&&model.finaleIssue?`<section class="finale-card"><span class="eyebrow">FINAL PAGE</span><h3>${escapeHtml(model.finaleIssue.series)} #${escapeHtml(model.finaleIssue.issue)}</h3><p>Finish the selected routes, then cross the threshold into the next era.</p><button class="primary-button" data-action="toggle-finale">${issueStats([model.finaleIssue]).complete?'Mark unread':'Mark read'}</button></section>`:''}</article>`;
}

function modeCopy(mode) {
  if (mode === 'parallel') return 'Read these runs independently in any order. Finish the block before moving through its event gate.';
  if (mode === 'strict') return 'Read every item from top to bottom. The order matters here.';
  return 'Read the rows from top to bottom. Keep each issue range together.';
}

function renderEntryRow(entry) {
  const stats = issueStats(entry.issues || []);
  const expanded = expandedEntries.has(entry.id);
  const hasIssues = Boolean(entry.issues?.length);
  const priority = entry.priority || 'recommended';
  return `<article class="route-entry priority-${escapeHtml(priority)}${stats.complete ? ' is-complete' : ''}${hasIssues ? '' : ' is-note'}" data-entry-id="${escapeHtml(entry.id)}">
    <div class="route-entry-main">
      ${hasIssues ? `<button class="route-check" data-action="toggle-entry-complete" data-entry-id="${escapeHtml(entry.id)}" aria-pressed="${stats.complete}" aria-label="${stats.complete ? 'Mark unread' : 'Mark read'}: ${escapeHtml(entry.title)}">${stats.complete ? '✓' : ''}</button>` : '<span class="route-note-icon" aria-hidden="true">i</span>'}
      <button class="route-entry-copy" data-action="open-entry" data-entry-id="${escapeHtml(entry.id)}">
        <span class="route-entry-year">${escapeHtml(entry.year || '')} · ${escapeHtml(priority.replaceAll('-', ' '))}</span>
        <strong>${escapeHtml(entry.title)}</strong>
        ${creatorLine(entry)}
        <small>${escapeHtml(entry.summary || '')}</small>
        ${entry.note ? `<em>${escapeHtml(entry.note)}</em>` : ''}
      </button>
      <div class="route-entry-progress${hasIssues ? '' : ' note-progress'}">
        ${hasIssues ? `<strong>${stats.read} / ${stats.total}</strong>${progressBar(stats, true)}` : '<strong>Guide note</strong>'}
      </div>
      <div class="route-entry-actions">
        ${hasIssues ? `<button class="secondary-button compact-button" data-action="toggle-inline-entry" data-entry-id="${escapeHtml(entry.id)}" aria-expanded="${expanded}">${expanded ? 'Hide issues' : 'Issues'}</button>` : ''}
        ${hasIssues ? `<button class="primary-button compact-button" data-action="mark-entry" data-entry-id="${escapeHtml(entry.id)}" data-mode="${stats.complete ? 'clear' : 'read'}">${stats.complete ? 'Mark unread' : 'Mark read'}</button>` : `<button class="secondary-button compact-button" data-action="open-entry" data-entry-id="${escapeHtml(entry.id)}">Details</button>`}
      </div>
    </div>
    ${expanded && hasIssues ? `<div class="inline-issue-panel"><div class="inline-panel-head"><div><span class="eyebrow">ISSUE CHECKLIST</span><strong>${escapeHtml(entry.title)}</strong></div><div><button class="secondary-button compact-button" data-action="mark-entry" data-entry-id="${escapeHtml(entry.id)}" data-mode="clear">Clear</button><button class="primary-button compact-button" data-action="mark-entry" data-entry-id="${escapeHtml(entry.id)}" data-mode="read">Mark all read</button></div></div>${issueChecklist(entry.issues, entry.id, {ordered:false, compact:true})}</div>` : ''}
  </article>`;
}

function requirementList(event, model) {
  if (event.requiredEntries?.length) {
    return event.requiredEntries.map(id => {
      const entry = model.entries.get(id);
      if (!entry) return '';
      const complete = issueStats(entry.issues || []).complete;
      return `<li class="${complete ? 'requirement-complete' : ''}">${complete ? '✓' : '○'} ${escapeHtml(entry.title)}</li>`;
    }).join('');
  }
  return (event.requiredBefore || []).map(item=>`<li>${escapeHtml(item)}</li>`).join('');
}

function renderEventGate(event, model) {
  const stats = issueStats(event.chapters || []);
  const expanded = expandedEvents.has(event.id);
  const compactComplete = stats.complete && preferences().autoHideCompleted && preferences().routeView === 'reading' && !expanded;
  if (compactComplete) {
    return `<article class="route-event-gate compact-complete event-${escapeHtml(event.type)} is-complete" data-event-id="${escapeHtml(event.id)}"><div><strong>✓ ${escapeHtml(event.title)}</strong><small>${stats.total} chapters completed</small></div><div><button class="secondary-button compact-button" data-action="toggle-inline-event" data-event-id="${escapeHtml(event.id)}">View order</button><button class="secondary-button compact-button" data-action="mark-event" data-event-id="${escapeHtml(event.id)}" data-mode="clear">Mark unread</button></div></article>`;
  }
  return `<article class="route-event-gate event-${escapeHtml(event.type)}${stats.complete ? ' is-complete' : ''}" data-event-id="${escapeHtml(event.id)}">
    <div class="event-gate-banner"><span>${badge(event.type.replaceAll('-', ' '), event.type)}</span><span>${escapeHtml(event.year)}</span></div>
    <div class="event-gate-main">
      <div class="event-gate-copy"><span class="eyebrow">EVENT GATE</span><h3>${escapeHtml(event.title)}</h3>${event.architect ? `<span class="creator-line"><b>${escapeHtml(event.architect)}</b></span>` : ''}<p>${escapeHtml(event.summary)}</p></div>
      <div class="event-gate-progress"><strong>${stats.read} / ${stats.total}</strong><small>chapters read</small>${progressBar(stats, true)}</div>
    </div>
    ${(event.requiredEntries?.length || event.requiredBefore?.length) ? `<div class="event-prerequisites"><strong>Finish before starting:</strong><ul>${requirementList(event, model)}</ul></div>` : ''}
    <div class="event-gate-actions"><button class="secondary-button" data-action="open-event" data-event-id="${escapeHtml(event.id)}">Event details</button><button class="secondary-button" data-action="toggle-inline-event" data-event-id="${escapeHtml(event.id)}" aria-expanded="${expanded}">${expanded ? 'Hide reading order' : 'Open reading order'}</button><button class="primary-button" data-action="mark-event" data-event-id="${escapeHtml(event.id)}" data-mode="${stats.complete ? 'clear' : 'read'}">${stats.complete ? 'Mark event unread' : 'Mark event read'}</button></div>
    ${expanded ? `<div class="inline-event-order"><div class="inline-panel-head"><div><span class="eyebrow">STRICT READING ORDER</span><strong>${escapeHtml(event.title)}</strong></div></div>${issueChecklist(event.chapters, event.id, {ordered:true, compact:true})}${event.next ? `<div class="notice next"><strong>Next:</strong> ${escapeHtml(event.next)}</div>` : ''}</div>` : ''}
  </article>`;
}

function renderRouteBlock(model, block, index) {
  const mode = block.mode || 'sequential';
  const items = block.steps.map(id => {
    const entry = model.entries.get(id);
    if (entry) return entryVisible(entry) ? renderEntryRow(entry) : '';
    const event = model.events.get(id);
    if (event) return renderEventGate(event, model);
    return `<div class="empty-state">Missing route item: ${escapeHtml(id)}</div>`;
  }).filter(Boolean).join('');
  const hiddenCount = block.steps.filter(id => {
    const entry = model.entries.get(id);
    return entry && !entryVisible(entry) && issueStats(entry.issues || []).complete;
  }).length;
  return `<section class="route-block mode-${escapeHtml(mode)}"><header class="route-block-header"><div class="route-block-number">${String(index + 1).padStart(2,'0')}</div><div><div class="route-block-kicker"><span class="mode-badge mode-${escapeHtml(mode)}">${escapeHtml(mode)}</span>${block.year ? `<span>${escapeHtml(block.year)}</span>` : ''}</div><h2>${escapeHtml(block.title)}</h2><p>${escapeHtml(block.description || modeCopy(mode))}</p></div></header><div class="route-block-help">${escapeHtml(block.help || modeCopy(mode))}</div><div class="route-row-list">${items || `<div class="completed-hidden-note">${hiddenCount ? `${hiddenCount} completed entr${hiddenCount===1?'y':'ies'} hidden.` : 'No entries match the current filters.'}</div>`}</div></section>`;
}

export function renderRoutes(model, selectedId=null) {
  if(!selectedId){
    return `<section class="page-hero"><span class="eyebrow">${escapeHtml(model.label.toUpperCase())} ROUTES</span><h1>Read by family without losing the event map.</h1><p>Independent books stay independent until the story genuinely joins them.</p></section>${routeToolbar()}<div class="route-overview-grid">${[...model.routes.values()].map(route=>{
      const mainIssues=route.steps.flatMap(step=>{const entry=model.entries.get(step);if(entry&&!isOptionalEntry(entry))return entry.issues||[];return model.events.get(step)?.chapters||[];});
      const optionalIssues=route.steps.flatMap(step=>{const entry=model.entries.get(step);return entry&&isOptionalEntry(entry)?entry.issues||[]:[];});
      const stats=issueStats(mainIssues);const optional=issueStats(optionalIssues);
      return `<a class="route-overview-card accent-border-${escapeHtml(route.accent)}" href="#/route/${escapeHtml(model.id)}/${route.id}"><span class="route-big-icon">${route.icon}</span><div><h2>${escapeHtml(route.title)}</h2><p>${escapeHtml(route.description)}</p>${progressBar(stats,true)}<small>${stats.read}/${stats.total} main issues${optional.total?` · ${optional.read}/${optional.total} optional`:''}</small></div></a>`;
    }).join('')}</div>`;
  }
  const route=model.routes.get(selectedId); if(!route) return '<div class="empty-state">Route not found.</div>';
  const blocks = route.blocks?.length ? route.blocks : [{id:`${route.id}-all`,title:'Reading route',mode:'sequential',steps:route.steps}];
  return `<section class="page-hero route-hero accent-surface-${escapeHtml(route.accent)}"><span class="eyebrow">${escapeHtml(model.label.toUpperCase())} ROUTE</span><h1>${route.icon} ${escapeHtml(route.title)}</h1><p>${escapeHtml(route.description)}</p><div class="route-mode-legend"><span><b>Parallel</b> independent runs</span><span><b>Sequential</b> top to bottom</span><span><b>Strict</b> exact crossover order</span></div></section>${routeToolbar()}<div class="route-block-stack">${blocks.map((block,index)=>renderRouteBlock(model,block,index)).join('')}</div>`;
}

export function renderEvents(model, selectedId=null) {
  if(selectedId){ const event=model.events.get(selectedId); if(!event) return '<div class="empty-state">Event not found.</div>'; const stats=issueStats(event.chapters); return `<section class="page-hero"><span class="eyebrow">${escapeHtml(event.type)} · ${event.year}</span><h1>${escapeHtml(event.title)}</h1>${event.architect?`<span class="creator-line"><b>${escapeHtml(event.architect)}</b></span>`:''}<p>${escapeHtml(event.summary)}</p><div class="hero-progress">${progressBar(stats)}<strong>${stats.read}/${stats.total} chapters</strong></div><button class="primary-button" data-action="open-event" data-event-id="${event.id}">Open ordered checklist</button></section>`; }
  const types=['hard-gate','major-crossover','lane-gate','soft-anchor'];
  return `<section class="page-hero"><span class="eyebrow">${escapeHtml(model.label.toUpperCase())} EVENTS</span><h1>Every gate, ordered and explained.</h1><p>Hard gates steer the universe; lane gates only pause the families they touch.</p></section>${types.map(type=>{const events=[...model.events.values()].filter(event=>event.type===type);return events.length?`<section class="section-shell"><div class="section-heading"><div><span class="eyebrow">${escapeHtml(type.replaceAll('-',' '))}</span><h2>${events.length} event${events.length===1?'':'s'}</h2></div></div><div class="event-grid">${events.map(eventCard).join('')}</div></section>`:''}).join('')}`;
}
