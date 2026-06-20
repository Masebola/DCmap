import { escapeHtml, formatIssue } from '../assets/js/utils.js';
import { issueStats, legacyItemStats } from '../assets/js/progress.js';
import { store } from '../assets/js/state.js';

export function progressBar(stats, compact = false) {
  return `<div class="progress-line${compact ? ' compact' : ''}" aria-label="${stats.pct}% complete"><span style="width:${stats.pct}%"></span></div>`;
}

export function badge(label, kind = 'neutral') {
  return `<span class="badge badge-${escapeHtml(kind)}">${escapeHtml(label)}</span>`;
}

export function issueChecklist(issueList, contextId) {
  return `<ol class="chapter-list">${issueList.map((item, index) => {
    const read = Boolean(store.value.issueProgress[item.id]);
    return `<li class="chapter-item${read ? ' is-read' : ''}">
      <button class="issue-toggle" data-action="toggle-issue" data-issue-id="${escapeHtml(item.id)}" data-context-id="${escapeHtml(contextId)}" aria-pressed="${read}">${read ? '✓' : ''}</button>
      <div><strong>${index + 1}. ${escapeHtml(formatIssue(item))}</strong>${item.releaseYear ? `<small>${escapeHtml(item.releaseYear)}</small>` : ''}</div>
    </li>`;
  }).join('')}</ol>`;
}

export function entryCard(entry) {
  const stats = issueStats(entry.issues || []);
  const priority = entry.priority || 'recommended';
  return `<article class="reading-card${stats.complete ? ' is-complete' : ''}" data-entry-id="${escapeHtml(entry.id)}">
    <button class="card-open" data-action="open-entry" data-entry-id="${escapeHtml(entry.id)}">
      <div class="card-topline"><span>${escapeHtml(entry.year || '')}</span>${badge(priority.replaceAll('-', ' '), priority)}</div>
      <h4>${escapeHtml(entry.title)}</h4>
      <p>${escapeHtml(entry.summary || '')}</p>
      ${progressBar(stats, true)}
      <div class="card-meta"><span>${stats.read} / ${stats.total || 0} issues</span>${entry.stop ? `<span class="stop-label">Stop noted</span>` : ''}</div>
    </button>
  </article>`;
}

export function eventCard(event) {
  const stats = issueStats(event.chapters || []);
  return `<article class="event-card event-${escapeHtml(event.type)}${stats.complete ? ' is-complete' : ''}">
    <button class="card-open" data-action="open-event" data-event-id="${escapeHtml(event.id)}">
      <div class="card-topline"><span>${escapeHtml(event.year)}</span>${badge(event.type.replaceAll('-', ' '), event.type)}</div>
      <h4>${escapeHtml(event.title)}</h4>
      <p>${escapeHtml(event.summary)}</p>
      ${progressBar(stats, true)}
      <div class="card-meta"><span>${stats.read} / ${stats.total} chapters</span><span>Open order</span></div>
    </button>
  </article>`;
}

export function legacyRow(item) {
  const stats = legacyItemStats(item.id);
  return `<li class="legacy-row${stats.complete ? ' is-complete' : ''}">
    <button class="legacy-check" data-action="toggle-legacy" data-item-id="${escapeHtml(item.id)}" aria-pressed="${stats.complete}">${stats.complete ? '✓' : ''}</button>
    <button class="legacy-open" data-action="open-legacy" data-item-id="${escapeHtml(item.id)}">
      <strong>${escapeHtml(item.t)}</strong>${item.n ? `<small>${escapeHtml(item.n)}</small>` : ''}
    </button>
    <button class="legacy-count" data-action="open-legacy" data-item-id="${escapeHtml(item.id)}">${stats.read} / ${stats.total}</button>
  </li>`;
}
