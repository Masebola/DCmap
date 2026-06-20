import { ERA_INDEX, loadEra } from '../../data/era-index.js';
import { prepareStructuredEra, allLegacyItems } from './data-model.js';
import { validateStructuredEra } from './validation.js';
import { startRouter } from './router.js';
import { store, migrateNew52Aliases } from './state.js';
import { applyTheme, cycleTheme } from './theme.js';
import { exportProgress, importProgress } from './import-export.js';
import { globalStats } from './progress.js';
import { $, escapeHtml, toast } from './utils.js';
import { renderDashboard } from '../../components/dashboard-view.js';
import { renderMasterFlow, renderRoutes, renderEvents } from '../../components/structured-views.js';
import { renderLegacyEra } from '../../components/legacy-view.js';
import { renderEssentials, setSelectedEssential } from '../../components/essentials-view.js';
import { renderSettings } from '../../components/settings-view.js';
import { entryDetails, eventDetails, legacyDetails } from '../../components/details-drawer.js';

let currentRoute = { view: 'dashboard' };
let currentEra = null;
let currentModel = null;
let detail = null;

function setBusy(busy) {
  document.body.classList.toggle('is-loading', busy);
  $('#loading-bar')?.classList.toggle('active', busy);
}

function updateGlobalHeader() {
  const stats = globalStats();
  $('#global-read').textContent = stats.read.toLocaleString();
  $('#global-total').textContent = stats.total.toLocaleString();
  $('#global-pct').textContent = `${stats.pct}%`;
  $('#global-bar').style.width = `${stats.pct}%`;
}

function updateNavigation() {
  document.querySelectorAll('[data-nav-view]').forEach(link => {
    const target = link.dataset.navView;
    link.classList.toggle('active', target === currentRoute.view || (target === 'flow' && currentRoute.view === 'flow'));
  });
  const select = $('#era-select');
  if (select && currentRoute.eraId) select.value = currentRoute.eraId;
}

async function renderRoute(route) {
  currentRoute = route;
  setBusy(true);
  try {
    if (route.view === 'dashboard') {
      currentEra = null; currentModel = null;
      $('#main').innerHTML = renderDashboard();
    } else if (route.view === 'essentials') {
      currentEra = null; currentModel = null;
      $('#main').innerHTML = renderEssentials();
    } else if (route.view === 'settings') {
      currentEra = null; currentModel = null;
      $('#main').innerHTML = renderSettings();
      bindImportInput();
    } else {
      const eraId = route.eraId || 'new52';
      currentEra = await loadEra(eraId);
      if (currentEra.format === 'structured') {
        currentModel = prepareStructuredEra(currentEra);
        validateStructuredEra(currentModel);
        migrateNew52Aliases(currentModel);
        if (route.view === 'route') $('#main').innerHTML = renderRoutes(currentModel, route.routeId);
        else if (route.view === 'event') $('#main').innerHTML = renderEvents(currentModel, route.eventId);
        else $('#main').innerHTML = renderMasterFlow(currentModel);
      } else {
        currentModel = null;
        $('#main').innerHTML = renderLegacyEra(currentEra);
      }
    }
  } catch (error) {
    console.error(error);
    $('#main').innerHTML = `<div class="fatal-card"><h1>That section could not be loaded.</h1><p>${escapeHtml(error.message)}</p><a href="#/dashboard">Return to dashboard</a></div>`;
  } finally {
    setBusy(false);
    updateGlobalHeader();
    updateNavigation();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function openDetails(html, context) {
  detail = context;
  const dialog = $('#details-dialog');
  $('#details-content').innerHTML = html;
  if (!dialog.open) dialog.showModal();
}

function refreshDetails() {
  if (!detail) return;
  if (detail.type === 'entry' && currentModel) openDetails(entryDetails(currentModel.entries.get(detail.id)), detail);
  if (detail.type === 'event' && currentModel) openDetails(eventDetails(currentModel.events.get(detail.id)), detail);
  if (detail.type === 'legacy' && currentEra) {
    const item = allLegacyItems(currentEra).find(item => item.id === detail.id);
    if (item) openDetails(legacyDetails(item), detail);
  }
}

function closeDetails() {
  detail = null;
  $('#details-dialog')?.close();
}

function bindImportInput() {
  const input = $('#settings-import');
  if (input) input.addEventListener('change', event => {
    const file = event.target.files?.[0];
    if (file) importProgress(file);
    event.target.value = '';
  }, { once: true });
}

document.addEventListener('click', event => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  if (action === 'open-entry' && currentModel) {
    const entry = currentModel.entries.get(target.dataset.entryId);
    if (entry) openDetails(entryDetails(entry), { type: 'entry', id: entry.id });
  }
  if (action === 'open-event' && currentModel) {
    const item = currentModel.events.get(target.dataset.eventId);
    if (item) openDetails(eventDetails(item), { type: 'event', id: item.id });
  }
  if (action === 'open-legacy' && currentEra) {
    const item = allLegacyItems(currentEra).find(row => row.id === target.dataset.itemId);
    if (item) openDetails(legacyDetails(item), { type: 'legacy', id: item.id });
  }
  if (action === 'close-details') closeDetails();
  if (action === 'toggle-issue' && currentModel) {
    const id = target.dataset.issueId;
    const issue = currentModel.issues.get(id);
    store.setIssue(id, !store.value.issueProgress[id], issue ? `${issue.series} #${issue.issue}` : id);
  }
  if (action === 'mark-entry' && currentModel) {
    const entry = currentModel.entries.get(target.dataset.entryId);
    store.setIssues((entry.issues || []).map(issue => issue.id), target.dataset.mode === 'read', entry.title);
  }
  if (action === 'mark-event' && currentModel) {
    const item = currentModel.events.get(target.dataset.eventId);
    store.setIssues(item.chapters.map(issue => issue.id), target.dataset.mode === 'read', item.title);
  }
  if (action === 'toggle-legacy') {
    const id = target.dataset.itemId;
    const row = currentEra ? allLegacyItems(currentEra).find(item => item.id === id) : null;
    if (row) {
      const total = Number(target.getAttribute('data-total')) || null;
      const current = Number(store.value.legacyProgress[id] || 0);
      const max = total || parseInt(target.closest('.legacy-row')?.querySelector('.legacy-count')?.textContent.split('/')[1], 10) || 1;
      store.setLegacy(id, current >= max ? 0 : max);
    }
  }
  if (action === 'save-legacy') store.setLegacy(target.dataset.itemId, $('#legacy-progress-input')?.value || 0);
  if (action === 'set-legacy') store.setLegacy(target.dataset.itemId, target.dataset.value || 0);
  if (action === 'select-essential') { setSelectedEssential(target.dataset.characterId); $('#main').innerHTML = renderEssentials(); }
  if (action === 'toggle-essential') store.toggleEssential(target.dataset.essentialId);
  if (action === 'set-theme') { store.setTheme(target.dataset.theme); applyTheme(target.dataset.theme); }
  if (action === 'export-progress') exportProgress();
  if (action === 'cycle-theme') { const next = cycleTheme(); toast(`Theme: ${next}`); }
  if (action === 'toggle-finale' && currentModel?.finaleIssue) {
    const id = currentModel.finaleIssue.id;
    store.setIssue(id, !store.value.issueProgress[id], 'DC Universe: Rebirth #1');
  }
});

document.addEventListener('input', event => {
  if (event.target.id === 'legacy-progress-input') {
    const range = $('#legacy-progress-range'); if (range) range.value = event.target.value;
  }
  if (event.target.id === 'legacy-progress-range') {
    const input = $('#legacy-progress-input'); if (input) input.value = event.target.value;
  }
});

$('#era-select').innerHTML = ERA_INDEX.map(era => `<option value="${era.id}">${escapeHtml(era.label)}</option>`).join('');
$('#era-select').addEventListener('change', event => { location.hash = `#/era/${event.target.value}`; });
$('#details-dialog').addEventListener('click', event => { if (event.target === $('#details-dialog')) closeDetails(); });

store.subscribe(() => {
  updateGlobalHeader();
  if (currentRoute.view === 'essentials') $('#main').innerHTML = renderEssentials();
  else if (currentRoute.view === 'settings') { $('#main').innerHTML = renderSettings(); bindImportInput(); }
  else if (currentEra) renderRoute(currentRoute);
  refreshDetails();
});

applyTheme();
updateGlobalHeader();
startRouter(renderRoute);
