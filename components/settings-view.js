import { store } from '../assets/js/state.js';
import { escapeHtml } from '../assets/js/utils.js';

export function renderSettings() {
  const theme=store.value.preferences.theme||'system';
  return `<section class="page-hero"><span class="eyebrow">SETTINGS & BACKUP</span><h1>Keep the tracker yours.</h1><p>Theme, progress files and compatibility tools live here instead of disappearing on mobile.</p></section>
  <div class="settings-grid">
    <section class="panel"><h2>Appearance</h2><p>Choose a permanent theme or follow your device.</p><div class="segmented">${['light','dark','system'].map(value=>`<button class="${theme===value?'active':''}" data-action="set-theme" data-theme="${value}">${escapeHtml(value)}</button>`).join('')}</div></section>
    <section class="panel"><h2>Progress backup</h2><p>Export before large updates or moving to another browser.</p><div class="settings-actions"><button class="primary-button" data-action="export-progress">Export progress</button><label class="secondary-button file-button">Import progress<input id="settings-import" type="file" accept="application/json"></label></div></section>
    <section class="panel"><h2>Data format</h2><p><strong>New 52:</strong> canonical issue-level tracking.<br><strong>Other eras:</strong> preserved compact legacy rows until their later revision.</p></section>
    <section class="panel danger-panel"><h2>Reset</h2><p>Reset controls will be added after the migration has been tested against your existing progress backups.</p></section>
  </div>`;
}
