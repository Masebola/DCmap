import { ERA_INDEX } from '../data/era-index.js';
import { ERA_TOTALS } from '../data/progress-manifest.js';
import { globalStats } from '../assets/js/progress.js';
import { escapeHtml } from '../assets/js/utils.js';
import { progressBar } from './shared.js';
import { store } from '../assets/js/state.js';

export function renderDashboard() {
  const stats = globalStats();
  const recent = store.value.recent || [];
  return `<section class="page-hero dashboard-hero">
    <span class="eyebrow">THE LONG BOX PROJECT</span>
    <h1>Your DC reading universe, without continuity fog.</h1>
    <p>Move through eras, follow event gates, and track shared issues once across every route.</p>
    <div class="hero-progress">${progressBar(stats)}<strong>${stats.read.toLocaleString()} / ${stats.total.toLocaleString()} main-route issues · ${stats.pct}%</strong></div>
  </section>
  <section class="dashboard-grid">
    <article class="panel continue-panel"><div class="panel-head"><div><span class="eyebrow">CONTINUE</span><h2>Recently marked</h2></div></div>
      ${recent.length ? `<div class="recent-list">${recent.slice(0,6).map(item=>`<div><strong>${escapeHtml(item.title)}</strong><small>${new Date(item.at).toLocaleDateString()}</small></div>`).join('')}</div>` : '<div class="empty-state">Your next completed issue will appear here.</div>'}
    </article>
    <article class="panel"><div class="panel-head"><div><span class="eyebrow">STRUCTURED MODERN DC</span><h2>New 52 through All In</h2></div><span class="status-pill">v7.1</span></div>
      <p>Every modern era now uses canonical issues, route filters, optional reading controls and exact crossover gates.</p>
      <div class="dashboard-links"><a class="primary-link" href="#/era/new52">Start New 52</a><a class="primary-link" href="#/era/allin">Open All In</a><a class="primary-link" href="#/era/absolute">Absolute Universe</a></div>
    </article>
    <article class="panel"><div class="panel-head"><div><span class="eyebrow">DISCOVER & REVIEW</span><h2>Your modern DC library</h2></div></div><p>Review completed arcs, browse standout stories, inspect statistics or revisit omitted material.</p><div class="dashboard-links"><a class="primary-link" href="#/completed">Completed</a><a class="primary-link" href="#/great-stories">Great Stories</a><a class="primary-link" href="#/stats">Stats</a><a class="primary-link" href="#/outside">Outside Roadmap</a><a class="primary-link" href="#/settings">Settings</a></div></article>
    <article class="panel special-dashboard-card"><div class="panel-head"><div><span class="eyebrow">BEYOND MAIN CONTINUITY</span><h2>Elseworlds & Collaborations</h2></div><span class="status-pill">New</span></div><p>Track Elseworlds, DC Black Label, DC × Marvel and crossovers with other publishers on separate shelves that do not alter main-continuity completion.</p><div class="dashboard-links"><a class="primary-link" href="#/specials/elseworlds">Elseworlds / Black Label</a><a class="primary-link" href="#/specials/collaborations">Collaborations</a></div></article>
  </section>
  <section class="section-shell"><div class="section-heading"><div><span class="eyebrow">ERAS</span><h2>Choose a reading era</h2></div></div>
    <div class="era-card-grid">${ERA_INDEX.map(era=>`<a class="era-card${era.format==='structured'?' featured':''}" href="#/era/${era.id}"><span>${escapeHtml(era.dates)}</span><h3>${escapeHtml(era.label)}</h3><p>${ERA_TOTALS[era.id]?.toLocaleString() || 0} represented issues</p><strong>${era.format==='structured'?'Structured issue tracking':'Legacy-compatible format'} →</strong></a>`).join('')}</div>
  </section>`;
}
