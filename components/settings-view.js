import { store } from '../assets/js/state.js';
import { escapeHtml } from '../assets/js/utils.js';

export function renderSettings() {
  const prefs=store.value.preferences||{};
  const theme=prefs.theme||'system';
  return `<section class="page-hero"><span class="eyebrow">SETTINGS & BACKUP</span><h1>Keep the tracker yours.</h1><p>Theme, reading-list visibility and progress backups live here.</p></section>
  <div class="settings-grid">
    <section class="panel"><h2>Appearance</h2><p>Choose a permanent theme or follow your device.</p><div class="segmented">${['light','dark','system'].map(value=>`<button class="${theme===value?'active':''}" data-action="set-theme" data-theme="${value}">${escapeHtml(value)}</button>`).join('')}</div></section>
    <section class="panel"><h2>Completed entries</h2><p>Completed ordinary arcs can disappear from the working list while remaining available under All and Completed Library.</p><button class="filter-toggle${prefs.autoHideCompleted?' active':''}" data-action="toggle-auto-hide">Auto-hide completed: ${prefs.autoHideCompleted?'On':'Off'}</button><a class="primary-link" href="#/completed">Open Completed Library</a></section>
    <section class="panel"><h2>Optional reading</h2><p>Optional stories remain in their correct continuity position but can be hidden from route and flow views.</p><button class="filter-toggle${prefs.includeOptional?' active':''}" data-action="toggle-optional">Show optional material: ${prefs.includeOptional?'On':'Off'}</button></section>
    <section class="panel"><h2>Outside the Roadmap</h2><p>Review skimmed, excluded and detached material without adding it to required completion totals.</p><a class="primary-link" href="#/outside">Open Outside the Roadmap</a></section>
    <section class="panel"><h2>Progress backup</h2><p>Export before large updates or moving to another browser.</p><div class="settings-actions"><button class="primary-button" data-action="export-progress">Export progress</button><label class="secondary-button file-button">Import progress<input id="settings-import" type="file" accept="application/json"></label></div></section>
    <section class="panel"><h2>Data format</h2><p><strong>New 52 and Rebirth:</strong> canonical issue-level tracking.<br><strong>Older and later eras:</strong> preserved compact legacy rows until their migration.</p></section>
  </div>`;
}
