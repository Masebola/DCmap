import { escapeHtml } from '../assets/js/utils.js';
import { issueStats, legacyItemStats } from '../assets/js/progress.js';
import { issueChecklist, badge, creatorLine, progressBar } from './shared.js';

export function entryDetails(entry) {
  const stats = issueStats(entry.issues || []);
  return `<div class="drawer-head"><div><span class="drawer-kicker">${escapeHtml(entry.year || '')}</span><h2>${escapeHtml(entry.title)}</h2>${creatorLine(entry,{includeArtists:true})}</div><button class="icon-button" data-action="close-details" aria-label="Close details">×</button></div>
  <div class="drawer-badges">${badge(entry.priority || 'recommended', entry.priority || 'recommended')}${(entry.tags || []).map(tag => badge(tag, 'neutral')).join('')}</div>
  <p class="drawer-summary">${escapeHtml(entry.summary || '')}</p>
  ${entry.note ? `<div class="notice">${escapeHtml(entry.note)}</div>` : ''}
  ${entry.stop ? `<div class="notice warning"><strong>Stopping point:</strong> ${escapeHtml(entry.stop)}</div>` : ''}
  <div class="drawer-progress">${progressBar(stats)}<strong>${stats.read} / ${stats.total} issues · ${stats.pct}%</strong></div>
  <div class="drawer-actions"><button class="primary-button" data-action="mark-entry" data-entry-id="${escapeHtml(entry.id)}" data-mode="read">Mark all read</button><button class="secondary-button" data-action="mark-entry" data-entry-id="${escapeHtml(entry.id)}" data-mode="clear">Clear</button></div>
  ${entry.issues?.length ? issueChecklist(entry.issues, entry.id) : '<div class="empty-state">This is a summary or navigation step and has no separate issues to mark.</div>'}`;
}

function requirementRows(event, model) {
  if (event.requiredEntries?.length && model) {
    return event.requiredEntries.map(id => {
      const entry = model.entries.get(id);
      if (!entry) return '';
      const stats = issueStats(entry.issues || []);
      return `<li class="${stats.complete ? 'requirement-complete' : ''}"><span>${stats.complete ? '✓' : '○'}</span>${escapeHtml(entry.title)}</li>`;
    }).join('');
  }
  return (event.requiredBefore || []).map(item => `<li>${escapeHtml(item)}</li>`).join('');
}

export function eventDetails(event, model = null) {
  const stats = issueStats(event.chapters || []);
  return `<div class="drawer-head"><div><span class="drawer-kicker">${escapeHtml(event.year)} · ${escapeHtml(event.type.replaceAll('-', ' '))}</span><h2>${escapeHtml(event.title)}</h2>${event.architect ? `<span class="creator-line"><b>${escapeHtml(event.architect)}</b></span>` : ''}</div><button class="icon-button" data-action="close-details" aria-label="Close details">×</button></div>
  <p class="drawer-summary">${escapeHtml(event.summary)}</p>
  ${(event.requiredEntries?.length || event.requiredBefore?.length) ? `<section class="requirement-box"><h3>Read before starting</h3><ul>${requirementRows(event, model)}</ul></section>` : ''}
  <div class="drawer-progress">${progressBar(stats)}<strong>${stats.read} / ${stats.total} chapters · ${stats.pct}%</strong></div>
  <div class="drawer-actions"><button class="primary-button" data-action="mark-event" data-event-id="${escapeHtml(event.id)}" data-mode="read">Mark event read</button><button class="secondary-button" data-action="mark-event" data-event-id="${escapeHtml(event.id)}" data-mode="clear">Clear</button></div>
  <h3 class="section-title">Reading order</h3>${issueChecklist(event.chapters, event.id)}
  ${event.next ? `<div class="notice next"><strong>Next:</strong> ${escapeHtml(event.next)}</div>` : ''}`;
}

export function legacyDetails(item) {
  const stats = legacyItemStats(item.id);
  return `<div class="drawer-head"><div><span class="drawer-kicker">Legacy roadmap entry</span><h2>${escapeHtml(item.t)}</h2></div><button class="icon-button" data-action="close-details" aria-label="Close details">×</button></div>
  ${item.n ? `<p class="drawer-summary">${escapeHtml(item.n)}</p>` : ''}
  <div class="drawer-progress">${progressBar(stats)}<strong>${stats.read} / ${stats.total} issues · ${stats.pct}%</strong></div>
  <label class="number-field">Issues read<input id="legacy-progress-input" type="number" min="0" max="${stats.total}" value="${stats.read}"></label>
  <input id="legacy-progress-range" class="range-field" type="range" min="0" max="${stats.total}" value="${stats.read}">
  <div class="drawer-actions"><button class="primary-button" data-action="save-legacy" data-item-id="${escapeHtml(item.id)}">Save progress</button><button class="secondary-button" data-action="set-legacy" data-item-id="${escapeHtml(item.id)}" data-value="${stats.total}">Mark all read</button></div>`;
}
