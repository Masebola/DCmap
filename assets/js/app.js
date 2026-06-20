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
import { renderMasterFlow, renderRoutes, renderEvents, toggleInlineEntry, toggleInlineEvent } from '../../components/structured-views.js';
import { renderLegacyEra } from '../../components/legacy-view.js';
import { renderEssentials, setSelectedEssential } from '../../components/essentials-view.js';
import { renderSettings } from '../../components/settings-view.js';
import { entryDetails, eventDetails, legacyDetails } from '../../components/details-drawer.js';

let currentRoute = { view: 'dashboard' };
let currentEra = null;
let currentModel = null;
let detail = null;
let isNavigationRender = false;
let navigationRequest = 0;
let pendingViewportSnapshot = null;

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

function cssEscape(value) {
  const text = String(value ?? '');
  if (globalThis.CSS?.escape) return CSS.escape(text);
  return text.replace(/["\\]/g, '\\$&');
}

function descriptorForElement(element) {
  if (!(element instanceof Element)) return null;
  const action = element.closest('[data-action]');
  if (!action) return null;
  const keys = ['action', 'issueId', 'contextId', 'entryId', 'eventId', 'itemId', 'essentialId', 'characterId'];
  const data = {};
  keys.forEach(key => {
    if (action.dataset[key]) data[key] = action.dataset[key];
  });
  return Object.keys(data).length ? data : null;
}

function selectorForDescriptor(descriptor) {
  if (!descriptor) return null;
  return Object.entries(descriptor)
    .map(([key, value]) => `[data-${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}="${cssEscape(value)}"]`)
    .join('');
}

function anchorForElement(element) {
  if (!(element instanceof Element)) return null;
  const entry = element.closest('[data-entry-id]');
  if (entry?.dataset.entryId) return { type: 'entry', id: entry.dataset.entryId };
  const event = element.closest('[data-event-id]');
  if (event?.dataset.eventId) return { type: 'event', id: event.dataset.eventId };
  const legacy = element.closest('.legacy-row')?.querySelector('[data-item-id]');
  if (legacy?.dataset.itemId) return { type: 'legacy', id: legacy.dataset.itemId };
  return null;
}

function findAnchor(anchor) {
  if (!anchor) return null;
  if (anchor.type === 'entry') return document.querySelector(`[data-entry-id="${cssEscape(anchor.id)}"]`);
  if (anchor.type === 'event') return document.querySelector(`[data-event-id="${cssEscape(anchor.id)}"]`);
  if (anchor.type === 'legacy') return document.querySelector(`[data-item-id="${cssEscape(anchor.id)}"]`)?.closest('.legacy-row') || null;
  return null;
}

function captureViewportState(preferredElement = null) {
  const element = preferredElement instanceof Element ? preferredElement : document.activeElement;
  let anchor = anchorForElement(element);
  let anchorElement = findAnchor(anchor);

  if (!anchorElement) {
    const headerBottom = document.querySelector('.app-header')?.getBoundingClientRect().bottom || 0;
    const probeY = Math.min(window.innerHeight - 1, Math.max(headerBottom + 24, window.innerHeight * 0.32));
    const probe = document.elementFromPoint(Math.min(window.innerWidth - 1, Math.max(1, window.innerWidth * 0.5)), probeY);
    anchor = anchorForElement(probe);
    anchorElement = findAnchor(anchor);
  }

  return {
    scrollY: window.scrollY,
    anchor,
    anchorTop: anchorElement ? anchorElement.getBoundingClientRect().top : null,
    focus: descriptorForElement(element),
    restoreFocus: element === document.activeElement
  };
}

function restoreViewportState(snapshot) {
  if (!snapshot) return;
  requestAnimationFrame(() => {
    const anchorElement = findAnchor(snapshot.anchor);
    if (anchorElement && Number.isFinite(snapshot.anchorTop)) {
      const delta = anchorElement.getBoundingClientRect().top - snapshot.anchorTop;
      window.scrollTo(0, Math.max(0, window.scrollY + delta));
    } else {
      window.scrollTo(0, Math.max(0, snapshot.scrollY || 0));
    }

    if (snapshot.restoreFocus && snapshot.focus) {
      requestAnimationFrame(() => {
        const selector = selectorForDescriptor(snapshot.focus);
        const focusTarget = selector ? document.querySelector(selector) : null;
        focusTarget?.focus({ preventScroll: true });
      });
    }
  });
}

function renderCurrentMarkup() {
  if (currentRoute.view === 'dashboard') {
    $('#main').innerHTML = renderDashboard();
    return;
  }
  if (currentRoute.view === 'essentials') {
    $('#main').innerHTML = renderEssentials();
    return;
  }
  if (currentRoute.view === 'settings') {
    $('#main').innerHTML = renderSettings();
    bindImportInput();
    return;
  }
  if (currentEra?.format === 'structured' && currentModel) {
    if (currentRoute.view === 'route') $('#main').innerHTML = renderRoutes(currentModel, currentRoute.routeId);
    else if (currentRoute.view === 'event') $('#main').innerHTML = renderEvents(currentModel, currentRoute.eventId);
    else $('#main').innerHTML = renderMasterFlow(currentModel);
    return;
  }
  if (currentEra) $('#main').innerHTML = renderLegacyEra(currentEra);
}

function refreshCurrentView({ preserveViewport = true, preferredElement = null } = {}) {
  const snapshot = preserveViewport ? captureViewportState(preferredElement) : null;
  renderCurrentMarkup();
  updateGlobalHeader();
  updateNavigation();
  restoreViewportState(snapshot);
}

async function renderRoute(route) {
  const requestId = ++navigationRequest;
  currentRoute = route;
  isNavigationRender = true;
  setBusy(true);
  try {
    if (route.view === 'dashboard' || route.view === 'essentials' || route.view === 'settings') {
      currentEra = null;
      currentModel = null;
    } else {
      const eraId = route.eraId || 'new52';
      const nextEra = await loadEra(eraId);
      if (requestId !== navigationRequest) return;
      currentEra = nextEra;
      if (currentEra.format === 'structured') {
        currentModel = prepareStructuredEra(currentEra);
        validateStructuredEra(currentModel);
        migrateNew52Aliases(currentModel);
      } else {
        currentModel = null;
      }
    }
    if (requestId !== navigationRequest) return;
    renderCurrentMarkup();
  } catch (error) {
    console.error(error);
    if (requestId === navigationRequest) {
      $('#main').innerHTML = `<div class="fatal-card"><h1>That section could not be loaded.</h1><p>${escapeHtml(error.message)}</p><a href="#/dashboard">Return to dashboard</a></div>`;
    }
  } finally {
    if (requestId === navigationRequest) {
      isNavigationRender = false;
      setBusy(false);
      updateGlobalHeader();
      updateNavigation();
      window.scrollTo(0, 0);
    }
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

const progressMutationActions = new Set([
  'toggle-issue',
  'toggle-entry-complete',
  'mark-entry',
  'mark-event',
  'toggle-legacy',
  'save-legacy',
  'set-legacy',
  'toggle-essential',
  'toggle-finale'
]);

document.addEventListener('click', event => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  if (progressMutationActions.has(action)) {
    pendingViewportSnapshot = captureViewportState(target);
  }

  if (action === 'open-entry' && currentModel) {
    const entry = currentModel.entries.get(target.dataset.entryId);
    if (entry) openDetails(entryDetails(entry), { type: 'entry', id: entry.id });
  }
  if (action === 'open-event' && currentModel) {
    const item = currentModel.events.get(target.dataset.eventId);
    if (item) openDetails(eventDetails(item), { type: 'event', id: item.id });
  }
  if (action === 'toggle-inline-entry' && currentModel) {
    const snapshot = captureViewportState(target);
    toggleInlineEntry(target.dataset.entryId);
    renderCurrentMarkup();
    restoreViewportState(snapshot);
  }
  if (action === 'toggle-inline-event' && currentModel) {
    const snapshot = captureViewportState(target);
    toggleInlineEvent(target.dataset.eventId);
    renderCurrentMarkup();
    restoreViewportState(snapshot);
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
  if (action === 'toggle-entry-complete' && currentModel) {
    const entry = currentModel.entries.get(target.dataset.entryId);
    if (entry) {
      const ids = (entry.issues || []).map(issue => issue.id);
      const complete = ids.length > 0 && ids.every(id => store.value.issueProgress[id]);
      store.setIssues(ids, !complete, entry.title);
    }
  }
  if (action === 'mark-entry' && currentModel) {
    const entry = currentModel.entries.get(target.dataset.entryId);
    if (entry) store.setIssues((entry.issues || []).map(issue => issue.id), target.dataset.mode === 'read', entry.title);
  }
  if (action === 'mark-event' && currentModel) {
    const item = currentModel.events.get(target.dataset.eventId);
    if (item) store.setIssues(item.chapters.map(issue => issue.id), target.dataset.mode === 'read', item.title);
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
  if (action === 'select-essential') {
    const snapshot = captureViewportState(target);
    setSelectedEssential(target.dataset.characterId);
    renderCurrentMarkup();
    restoreViewportState(snapshot);
  }
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
  if (isNavigationRender) {
    refreshDetails();
    return;
  }
  const snapshot = pendingViewportSnapshot || captureViewportState();
  pendingViewportSnapshot = null;
  renderCurrentMarkup();
  updateNavigation();
  restoreViewportState(snapshot);
  refreshDetails();
});

if (globalThis.history && 'scrollRestoration' in globalThis.history) globalThis.history.scrollRestoration = 'manual';
applyTheme();
updateGlobalHeader();
startRouter(renderRoute);
