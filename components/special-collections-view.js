import { SPECIAL_COLLECTIONS, SPECIAL_SECTIONS, SPECIALS_AS_OF } from '../data/special-collections.js';
import { issueStats } from '../assets/js/progress.js';
import { store } from '../assets/js/state.js';
import { escapeHtml, formatIssue } from '../assets/js/utils.js';
import { progressBar, badge } from './shared.js';

const expanded = new Set();
const filters = { group:'all', partner:'all', search:'', view:'reading' };

export function specialEntry(id) {
  return SPECIAL_COLLECTIONS.find(item => item.id === id) || null;
}

export function toggleSpecialInline(id) {
  expanded.has(id) ? expanded.delete(id) : expanded.add(id);
}

export function setSpecialFilter(name, value) {
  if (Object.prototype.hasOwnProperty.call(filters, name)) filters[name] = String(value ?? '');
}

export function specialReadingView() {
  return filters.view === 'reading';
}

export function resetSpecialFilters() {
  filters.group = 'all';
  filters.partner = 'all';
  filters.search = '';
  filters.view = 'reading';
}

function issueLabel(item) {
  if (item.kind === 'graphic-novel') return `${item.series} · Graphic novel`;
  if (item.kind === 'digital') return `${item.series} · Digital one-shot`;
  return formatIssue(item);
}

function options(values, current) {
  return ['all', ...values].map(value => `<option value="${escapeHtml(value)}"${value === current ? ' selected' : ''}>${value === 'all' ? 'All' : escapeHtml(value)}</option>`).join('');
}

function visible(item) {
  const stats = issueStats(item.issues || []);
  const search = filters.search.trim().toLowerCase();
  if (filters.group !== 'all' && item.group !== filters.group) return false;
  if (filters.partner !== 'all' && item.partner !== filters.partner) return false;
  if (filters.view === 'completed' && !stats.complete) return false;
  if (filters.view === 'reading' && store.value.preferences.autoHideCompleted && stats.complete) return false;
  if (search && !`${item.title} ${item.summary} ${(item.writers || []).join(' ')} ${item.group} ${item.partner}`.toLowerCase().includes(search)) return false;
  return true;
}

function specialChecklist(item) {
  return `<ul class="chapter-list compact unordered">${(item.issues || []).map(issue => {
    const read = Boolean(store.value.issueProgress[issue.id]);
    return `<li class="chapter-item${read ? ' is-read' : ''}">
      <button class="issue-toggle" data-action="toggle-special-issue" data-special-id="${escapeHtml(item.id)}" data-issue-id="${escapeHtml(issue.id)}" aria-pressed="${read}" aria-label="${read ? 'Mark unread' : 'Mark read'}: ${escapeHtml(issueLabel(issue))}">${read ? '✓' : ''}</button>
      <div><strong>${escapeHtml(issueLabel(issue))}</strong>${issue.releaseYear ? `<small>${escapeHtml(issue.releaseYear)}</small>` : ''}</div>
    </li>`;
  }).join('')}</ul>`;
}

function specialCard(item) {
  const stats = issueStats(item.issues || []);
  const isExpanded = expanded.has(item.id);
  const label = item.group === 'DC Black Label' ? 'Black Label' : item.group.includes('Elseworld') ? 'Elseworlds' : item.partner;
  return `<article class="special-card${stats.complete ? ' is-complete' : ''}" data-special-id="${escapeHtml(item.id)}">
    <div class="special-card-main">
      <button class="route-check" data-action="toggle-special-entry" data-special-id="${escapeHtml(item.id)}" aria-pressed="${stats.complete}" aria-label="${stats.complete ? 'Mark unread' : 'Mark read'}: ${escapeHtml(item.title)}">${stats.complete ? '✓' : ''}</button>
      <div class="special-card-copy">
        <div class="special-card-top"><span>${escapeHtml(item.years)}</span>${badge(label, item.group === 'DC Black Label' ? 'black-label' : item.section === 'collaborations' ? 'collaboration' : 'elseworld')}</div>
        <h2>${escapeHtml(item.title)}</h2>
        ${(item.writers || []).length ? `<span class="creator-line"><b>${escapeHtml(item.writers.join(', '))}</b>${item.partner && item.partner !== 'DC' ? ` · ${escapeHtml(item.partner)}` : ''}</span>` : ''}
        <p>${escapeHtml(item.summary)}</p>
        ${item.note ? `<div class="special-note">${escapeHtml(item.note)}</div>` : ''}
        ${progressBar(stats, true)}
        <div class="card-meta"><span>${stats.read}/${stats.total} tracked ${stats.total === 1 ? 'item' : 'issues'}</span><span>${escapeHtml(item.priority.replaceAll('-', ' '))}</span></div>
      </div>
    </div>
    <div class="special-card-actions">
      <button class="secondary-button compact-button" data-action="toggle-special-inline" data-special-id="${escapeHtml(item.id)}" aria-expanded="${isExpanded}">${isExpanded ? 'Hide issues' : 'Issues'}</button>
      <button class="primary-button compact-button" data-action="mark-special-entry" data-special-id="${escapeHtml(item.id)}" data-mode="${stats.complete ? 'clear' : 'read'}">${stats.complete ? 'Mark unread' : 'Mark read'}</button>
    </div>
    ${isExpanded ? `<div class="special-inline-panel"><div class="inline-panel-head"><div><span class="eyebrow">CHECKLIST</span><strong>${escapeHtml(item.title)}</strong></div><div><button class="secondary-button compact-button" data-action="mark-special-entry" data-special-id="${escapeHtml(item.id)}" data-mode="clear">Clear</button><button class="primary-button compact-button" data-action="mark-special-entry" data-special-id="${escapeHtml(item.id)}" data-mode="read">Mark all read</button></div></div>${specialChecklist(item)}</div>` : ''}
  </article>`;
}

export function specialCollectionStats(section = null) {
  const entries = section ? SPECIAL_COLLECTIONS.filter(item => item.section === section) : SPECIAL_COLLECTIONS;
  const issueMap = new Map();
  entries.forEach(item => (item.issues || []).forEach(issue => issueMap.set(issue.id, issue)));
  return issueStats([...issueMap.values()]);
}

export function renderSpecialCollections(sectionId = 'elseworlds') {
  const section = SPECIAL_SECTIONS.find(item => item.id === sectionId) || SPECIAL_SECTIONS[0];
  const source = SPECIAL_COLLECTIONS.filter(item => item.section === section.id);
  const groups = [...new Set(source.map(item => item.group))];
  const partners = [...new Set(source.map(item => item.partner).filter(Boolean))];
  const items = source.filter(visible);
  const stats = specialCollectionStats(section.id);
  const completed = source.filter(item => issueStats(item.issues || []).complete).length;
  return `<section class="page-hero special-hero"><span class="eyebrow">BEYOND MAIN CONTINUITY</span><h1>Elseworlds & Collaborations</h1><p>Track alternate DC universes, Black Label stories and cross-publisher meetings without changing your main-continuity completion percentage.</p><div class="hero-progress">${progressBar(stats)}<strong>${stats.read}/${stats.total} shelf issues · ${stats.pct}%</strong></div><div class="optional-progress">${completed}/${source.length} books or series completed in this section · Catalog checked through ${escapeHtml(SPECIALS_AS_OF)}</div></section>
  <div class="flow-toolbar special-tabs">${SPECIAL_SECTIONS.map(item => `<a class="filter-chip${item.id === section.id ? ' active' : ''}" href="#/specials/${item.id}">${escapeHtml(item.label)}</a>`).join('')}</div>
  <section class="special-intro panel"><div><span class="eyebrow">${escapeHtml(section.label.toUpperCase())}</span><h2>${escapeHtml(section.description)}</h2></div>${section.id === 'collaborations' ? '<p>Collaborations are divided into DC × Marvel, digital Marvel crossovers and projects with other publishers or licensed worlds.</p>' : '<p>The shelf combines classic Elseworlds, major alternate universes, the revived Elseworlds line and superhero-focused DC Black Label books.</p>'}</section>
  <section class="special-toolbar panel">
    <div class="toolbar-group"><span class="toolbar-label">View</span><div class="segmented compact-segmented">${[['reading','Reading list'],['all','All'],['completed','Completed']].map(([value,label]) => `<button class="${filters.view === value ? 'active' : ''}" data-action="set-special-view" data-value="${value}">${label}</button>`).join('')}</div></div>
    <label>Group<select data-special-filter="group">${options(groups, filters.group)}</select></label>
    ${section.id === 'collaborations' ? `<label>Partner<select data-special-filter="partner">${options(partners, filters.partner)}</select></label>` : ''}
    <label class="special-search">Search<input type="search" data-special-filter="search" value="${escapeHtml(filters.search)}" placeholder="Title, writer or publisher"></label>
    <button class="secondary-button compact-button" data-action="reset-special-filters">Reset</button>
  </section>
  <section class="section-shell"><div class="section-heading"><div><span class="eyebrow">${escapeHtml(section.label.toUpperCase())}</span><h2>${items.length} shown of ${source.length}</h2></div></div>${items.length ? `<div class="special-grid">${items.map(specialCard).join('')}</div>` : '<div class="empty-state">No books match the current filters.</div>'}</section>`;
}
