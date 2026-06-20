import { escapeHtml } from '../assets/js/utils.js';
import { issueStats, structuredEraStats } from '../assets/js/progress.js';
import { entryCard, eventCard, progressBar } from './shared.js';

export function renderMasterFlow(model) {
  const stats = structuredEraStats(model);
  return `<section class="page-hero"><span class="eyebrow">${escapeHtml(model.subtitle)}</span><h1>${escapeHtml(model.title)}</h1><p>${escapeHtml(model.description)}</p><div class="hero-progress">${progressBar(stats)}<strong>${stats.read} / ${stats.total} unique issues · ${stats.pct}%</strong></div></section>
  <div class="flow-toolbar"><a class="filter-chip active" href="#/era/new52">Master Flow</a><a class="filter-chip" href="#/route/new52">Routes</a><a class="filter-chip" href="#/event/new52">Events</a></div>
  <div class="phase-stack">${model.phases.map(phase=>renderPhase(model,phase)).join('')}</div>`;
}

function renderPhase(model, phase) {
  const entries = [...model.entries.values()].filter(entry=>entry.phaseId===phase.id);
  const events = phase.eventIds.map(id=>model.events.get(id)).filter(Boolean);
  const phaseIssues = [...entries.flatMap(entry=>entry.issues||[]),...events.flatMap(event=>event.chapters||[])];
  if (phase.finale) phaseIssues.push(model.finaleIssue);
  const stats = issueStats(phaseIssues);
  const grouped = phase.routeIds.map(routeId=>{
    const route=model.routes.get(routeId); const routeEntries=entries.filter(entry=>entry.routeId===routeId);
    if(!route || !routeEntries.length) return '';
    return `<section class="route-lane"><div class="lane-heading"><div class="lane-icon accent-${escapeHtml(route.accent)}">${route.icon}</div><div><h3>${escapeHtml(route.shortTitle)}</h3><p>${escapeHtml(route.description)}</p></div><a href="#/route/new52/${route.id}">Open route</a></div><div class="reading-grid">${routeEntries.map(entryCard).join('')}</div></section>`;
  }).join('');
  return `<article class="phase-card"><header class="phase-header"><div class="phase-number">${String(phase.number).padStart(2,'0')}</div><div><span class="eyebrow">${escapeHtml(phase.dates)}</span><h2>${escapeHtml(phase.title)}</h2><p>${escapeHtml(phase.summary)}</p></div><div class="phase-stat"><strong>${stats.pct}%</strong><small>${stats.read}/${stats.total}</small></div></header>${phase.note?`<div class="phase-note">${escapeHtml(phase.note)}</div>`:''}${events.length?`<section class="gate-zone"><div class="section-heading compact"><div><span class="eyebrow">EVENT GATES</span><h3>Pause and read in order</h3></div></div><div class="event-grid">${events.map(eventCard).join('')}</div></section>`:''}${grouped}${phase.finale?`<section class="finale-card"><span class="eyebrow">FINAL PAGE</span><h3>DC Universe: Rebirth #1</h3><p>Finish the selected New 52 routes, then cross the threshold into Rebirth.</p><button class="primary-button" data-action="toggle-finale">${model.finaleIssue && issueStats([model.finaleIssue]).complete?'Mark unread':'Mark read'}</button></section>`:''}</article>`;
}

export function renderRoutes(model, selectedId=null) {
  if(!selectedId){
    return `<section class="page-hero"><span class="eyebrow">NEW 52 ROUTES</span><h1>Read by family without losing the event map.</h1><p>Each route contains only its curated material and links to shared gates when another lane becomes required.</p></section><div class="route-overview-grid">${[...model.routes.values()].map(route=>{
      const issues=route.steps.flatMap(step=>model.entries.get(step)?.issues||model.events.get(step)?.chapters||[]);const stats=issueStats(issues);
      return `<a class="route-overview-card accent-border-${escapeHtml(route.accent)}" href="#/route/new52/${route.id}"><span class="route-big-icon">${route.icon}</span><div><h2>${escapeHtml(route.title)}</h2><p>${escapeHtml(route.description)}</p>${progressBar(stats,true)}<small>${stats.read}/${stats.total} unique issues</small></div></a>`;
    }).join('')}</div>`;
  }
  const route=model.routes.get(selectedId); if(!route) return '<div class="empty-state">Route not found.</div>';
  const steps=route.steps.map(step=>model.entries.get(step)?entryCard(model.entries.get(step)):model.events.get(step)?eventCard(model.events.get(step)):'').join('');
  return `<section class="page-hero route-hero accent-surface-${escapeHtml(route.accent)}"><span class="eyebrow">NEW 52 ROUTE</span><h1>${route.icon} ${escapeHtml(route.title)}</h1><p>${escapeHtml(route.description)}</p></section><div class="route-sequence"><div class="sequence-line"></div>${steps}</div>`;
}

export function renderEvents(model, selectedId=null) {
  if(selectedId){ const event=model.events.get(selectedId); if(!event) return '<div class="empty-state">Event not found.</div>'; const stats=issueStats(event.chapters); return `<section class="page-hero"><span class="eyebrow">${escapeHtml(event.type)} · ${event.year}</span><h1>${escapeHtml(event.title)}</h1><p>${escapeHtml(event.summary)}</p><div class="hero-progress">${progressBar(stats)}<strong>${stats.read}/${stats.total} chapters</strong></div><button class="primary-button" data-action="open-event" data-event-id="${event.id}">Open ordered checklist</button></section>`; }
  const types=['hard-gate','major-crossover','lane-gate','soft-anchor'];
  return `<section class="page-hero"><span class="eyebrow">EVENT LIBRARY</span><h1>Every gate, ordered and explained.</h1><p>Hard gates steer the universe; lane gates only pause the families they touch.</p></section>${types.map(type=>{const events=[...model.events.values()].filter(event=>event.type===type);return events.length?`<section class="section-shell"><div class="section-heading"><div><span class="eyebrow">${escapeHtml(type.replaceAll('-',' '))}</span><h2>${events.length} event${events.length===1?'':'s'}</h2></div></div><div class="event-grid">${events.map(eventCard).join('')}</div></section>`:''}).join('')}`;
}
