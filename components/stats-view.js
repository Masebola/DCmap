import { issueStats, structuredEraStats } from '../assets/js/progress.js';
import { escapeHtml } from '../assets/js/utils.js';
import { isOptionalEntry } from '../assets/js/data-model.js';
import { progressBar } from './shared.js';
import { specialCollectionStats } from './special-collections-view.js';

function routeIssues(model, route) {
  const main=[]; const optional=[];
  for (const step of route.steps) {
    const entry=model.entries.get(step); const event=model.events.get(step);
    if (entry) (isOptionalEntry(entry)?optional:main).push(...(entry.issues||[]));
    if (event) main.push(...(event.chapters||[]));
  }
  return {main,optional};
}

export function renderStats(models = []) {
  const eraRows=models.map(model=>({model,main:structuredEraStats(model,'main'),optional:structuredEraStats(model,'optional'),events:[...model.events.values()].filter(event=>issueStats(event.chapters).complete).length}));
  const allMain=new Map(); const allOptional=new Map();
  models.forEach(model=>{model.mainIssues.forEach((value,key)=>allMain.set(key,value));model.optionalIssues.forEach((value,key)=>{if(!allMain.has(key))allOptional.set(key,value);});});
  const totalMain=issueStats([...allMain.values()]); const totalOptional=issueStats([...allOptional.values()]);
  const elseworlds = specialCollectionStats('elseworlds');
  const collaborations = specialCollectionStats('collaborations');
  const writerMap=new Map();
  models.forEach(model=>model.entries.forEach(entry=>(entry.writers||[]).forEach(writer=>{
    if(!writerMap.has(writer))writerMap.set(writer,new Map());
    (entry.issues||[]).forEach(item=>writerMap.get(writer).set(item.id,item));
  })));
  const writers=[...writerMap].map(([name,issues])=>({name,stats:issueStats([...issues.values()])})).sort((a,b)=>b.stats.total-a.stats.total).slice(0,12);
  return `<section class="page-hero"><span class="eyebrow">READING ANALYTICS</span><h1>Stats</h1><p>Canonical totals across every structured era, with shared bridge issues counted once.</p><div class="stats-hero-grid"><div><strong>${totalMain.read.toLocaleString()}</strong><small>main issues read</small></div><div><strong>${totalMain.total.toLocaleString()}</strong><small>main issues tracked</small></div><div><strong>${totalMain.pct}%</strong><small>structured completion</small></div><div><strong>${totalOptional.read}/${totalOptional.total}</strong><small>optional reading</small></div></div></section>
  <section class="section-shell"><div class="section-heading"><div><span class="eyebrow">BY ERA</span><h2>Structured roadmap progress</h2></div></div><div class="stats-era-grid">${eraRows.map(({model,main,optional,events})=>`<article class="stats-card"><div><span>${escapeHtml(model.dates)}</span><h3>${escapeHtml(model.label)}</h3></div>${progressBar(main,true)}<strong>${main.read}/${main.total} · ${main.pct}%</strong><small>${optional.total?`${optional.read}/${optional.total} optional · `:''}${events}/${model.events.size} events complete</small><a href="#/era/${model.id}">Open era →</a></article>`).join('')}</div></section>
  <section class="section-shell"><div class="section-heading"><div><span class="eyebrow">BY ROUTE</span><h2>Family and character lanes</h2></div></div><div class="stats-route-grid">${models.flatMap(model=>[...model.routes.values()].map(route=>{const lists=routeIssues(model,route);const stats=issueStats(lists.main);return `<article class="route-stat"><span>${escapeHtml(model.label)}</span><h3>${route.icon} ${escapeHtml(route.shortTitle)}</h3>${progressBar(stats,true)}<small>${stats.read}/${stats.total} main issues</small><a href="#/route/${model.id}/${route.id}">Open route</a></article>`;})).join('')}</div></section>
  <section class="section-shell"><div class="section-heading"><div><span class="eyebrow">SEPARATE SPECIAL SHELVES</span><h2>Elseworlds and cross-publisher reading</h2></div></div><p class="section-note">These totals are intentionally excluded from the main-continuity percentage.</p><div class="stats-era-grid special-stats-grid"><article class="stats-card"><div><span>Alternate continuity</span><h3>Elseworlds / Black Label</h3></div>${progressBar(elseworlds,true)}<strong>${elseworlds.read}/${elseworlds.total} · ${elseworlds.pct}%</strong><small>Classic Elseworlds, alternate universes and Black Label</small><a href="#/specials/elseworlds">Open shelf →</a></article><article class="stats-card"><div><span>Cross-publisher library</span><h3>Collaborations</h3></div>${progressBar(collaborations,true)}<strong>${collaborations.read}/${collaborations.total} · ${collaborations.pct}%</strong><small>DC × Marvel and collaborations with other publishers</small><a href="#/specials/collaborations">Open shelf →</a></article></div></section>
  <section class="section-shell"><div class="section-heading"><div><span class="eyebrow">CREATIVE VOICES</span><h2>Most represented writers</h2></div></div><div class="writer-stat-list">${writers.map(({name,stats})=>`<div><strong>${escapeHtml(name)}</strong><span>${stats.read}/${stats.total} issues read</span>${progressBar(stats,true)}</div>`).join('')}</div></section>`;
}
