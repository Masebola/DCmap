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
    <div class="hero-progress">${progressBar(stats)}<strong>${stats.read.toLocaleString()} / ${stats.total.toLocaleString()} issues · ${stats.pct}%</strong></div>
  </section>
  <section class="dashboard-grid">
    <article class="panel continue-panel"><div class="panel-head"><div><span class="eyebrow">CONTINUE</span><h2>Recently marked</h2></div></div>
      ${recent.length ? `<div class="recent-list">${recent.slice(0,6).map(item=>`<div><strong>${escapeHtml(item.title)}</strong><small>${new Date(item.at).toLocaleDateString()}</small></div>`).join('')}</div>` : '<div class="empty-state">Your next completed issue will appear here.</div>'}
    </article>
    <article class="panel"><div class="panel-head"><div><span class="eyebrow">CURRENT BUILD</span><h2>New 52 redesign</h2></div><span class="status-pill">Structured</span></div>
      <p>The New 52 now uses phases, routes, exact event orders and canonical issue progress.</p>
      <a class="primary-link" href="#/era/new52">Open New 52 master flow</a>
    </article>
  </section>
  <section class="section-shell"><div class="section-heading"><div><span class="eyebrow">ERAS</span><h2>Choose a reading era</h2></div></div>
    <div class="era-card-grid">${ERA_INDEX.map(era=>`<a class="era-card${era.id==='new52'?' featured':''}" href="#/era/${era.id}"><span>${escapeHtml(era.dates)}</span><h3>${escapeHtml(era.label)}</h3><p>${ERA_TOTALS[era.id]?.toLocaleString() || 0} represented issues</p><strong>${era.format==='structured'?'New structured format':'Legacy-compatible format'} →</strong></a>`).join('')}</div>
  </section>`;
}
