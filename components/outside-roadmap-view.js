import { OUTSIDE_ROADMAP } from '../data/outside-roadmap.js';
import { escapeHtml } from '../assets/js/utils.js';

const filters = { era:'all', status:'all', family:'all', search:'' };

export function setOutsideFilter(name, value) {
  if (Object.prototype.hasOwnProperty.call(filters, name)) filters[name] = value;
}

export function resetOutsideFilters() {
  filters.era = 'all'; filters.status = 'all'; filters.family = 'all'; filters.search = '';
}

function options(values, current) {
  return ['all', ...values].map(value => `<option value="${escapeHtml(value)}"${value===current?' selected':''}>${value==='all'?'All':escapeHtml(value)}</option>`).join('');
}

function statusLabel(status) {
  return ({'skim-summary':'Skim / Summary','not-recommended':'Not Recommended','detached-continuity':'Detached Continuity'})[status] || status;
}

export function renderOutsideRoadmap() {
  const eras = [...new Set(OUTSIDE_ROADMAP.map(item => item.era))];
  const statuses = [...new Set(OUTSIDE_ROADMAP.map(item => statusLabel(item.status)))];
  const families = [...new Set(OUTSIDE_ROADMAP.map(item => item.family))];
  const search = filters.search.trim().toLowerCase();
  const items = OUTSIDE_ROADMAP.filter(item => {
    const status = statusLabel(item.status);
    return (filters.era === 'all' || item.era === filters.era)
      && (filters.status === 'all' || status === filters.status)
      && (filters.family === 'all' || item.family === filters.family)
      && (!search || `${item.title} ${item.writers} ${item.reason} ${item.continuityNote}`.toLowerCase().includes(search));
  });
  return `<section class="page-hero"><span class="eyebrow">CURATED CUTS & CONTEXT</span><h1>Outside the Roadmap</h1><p>Material omitted from the main route remains visible here with its era, family and the reason it was cut, skimmed or detached.</p></section>
  <section class="outside-toolbar panel">
    <label>Era<select data-outside-filter="era">${options(eras,filters.era)}</select></label>
    <label>Status<select data-outside-filter="status">${options(statuses,filters.status)}</select></label>
    <label>Family<select data-outside-filter="family">${options(families,filters.family)}</select></label>
    <label class="outside-search">Search<input type="search" data-outside-filter="search" value="${escapeHtml(filters.search)}" placeholder="Title, writer or reason"></label>
    <button class="secondary-button" data-action="reset-outside-filters">Reset</button>
  </section>
  <section class="outside-grid">${items.length ? items.map(item => `<article class="outside-card status-${escapeHtml(item.status)}"><div class="outside-card-top"><span>${escapeHtml(item.era)}</span><span>${escapeHtml(item.family)}</span></div><h2>${escapeHtml(item.title)}</h2><div class="outside-meta">${escapeHtml(item.writers)} · ${escapeHtml(item.years)}</div><span class="outside-status">${escapeHtml(statusLabel(item.status))}</span><p><strong>Why it is outside:</strong> ${escapeHtml(item.reason)}</p><p><strong>Continuity note:</strong> ${escapeHtml(item.continuityNote)}</p></article>`).join('') : '<div class="empty-state">No titles match the current filters.</div>'}</section>`;
}
