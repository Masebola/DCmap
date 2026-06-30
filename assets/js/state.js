import { loadState, saveState } from './storage.js';

const data = loadState();
const listeners = new Set();

function notify() {
  saveState(data);
  listeners.forEach(listener => listener(data));
}

function remember(id, title) {
  data.recent = [{ id, title, at: new Date().toISOString() }, ...(data.recent || []).filter(item => item.id !== id)].slice(0, 12);
}

export const store = {
  get value() { return data; },
  subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
  setIssue(id, read, title = id) {
    data.issueProgress[id] = Boolean(read);
    if (read) remember(id, title);
    notify();
  },
  setIssues(ids, read, title = '') {
    ids.forEach(id => { data.issueProgress[id] = Boolean(read); });
    if (read && ids[0]) remember(ids[0], title || ids[0]);
    notify();
  },
  setLegacy(id, value) {
    data.legacyProgress[id] = Math.max(0, Number(value) || 0);
    notify();
  },
  toggleEssential(id) {
    const set = new Set(data.essentials || []);
    set.has(id) ? set.delete(id) : set.add(id);
    data.essentials = [...set];
    notify();
  },
  setTheme(theme) {
    data.preferences.theme = theme;
    notify();
  },
  setRouteView(value) {
    data.preferences.routeView = ['reading', 'all', 'completed'].includes(value) ? value : 'reading';
    notify();
  },
  setIncludeOptional(value) {
    data.preferences.includeOptional = Boolean(value);
    notify();
  },
  setAutoHideCompleted(value) {
    data.preferences.autoHideCompleted = Boolean(value);
    notify();
  },
  setActiveLanes(eraId, routeIds) {
    data.preferences.activeLanes[eraId] = [...new Set(routeIds)];
    notify();
  },
  replace(next) {
    const currentPreferences = {
      theme: 'system',
      readingMode: 'curated',
      routeView: 'reading',
      includeOptional: true,
      autoHideCompleted: true,
      activeLanes: {}
    };
    Object.keys(data).forEach(key => delete data[key]);
    Object.assign(data, {
      version: 7,
      issueProgress: { ...(next.issueProgress || {}) },
      legacyProgress: { ...(next.legacyProgress || next.roadProgress || {}) },
      essentials: [...(next.essentials || [])],
      preferences: { ...currentPreferences, ...(next.preferences || {}), activeLanes: { ...(next.preferences?.activeLanes || {}) } },
      migrations: { ...(next.migrations || {}) },
      recent: [...(next.recent || [])]
    });
    notify();
  },
  markMigration(key) { data.migrations[key] = true; notify(); }
};

function applyLegacyGroups(model) {
  const groups = new Map();
  const add = (legacyIds, issueList) => {
    for (const legacyId of legacyIds || []) {
      if (!groups.has(legacyId)) groups.set(legacyId, []);
      const list = groups.get(legacyId);
      for (const issue of issueList || []) if (!list.some(item => item.id === issue.id)) list.push(issue);
    }
  };
  model.entries.forEach(entry => add(entry.legacyIds, entry.issues));
  model.events.forEach(event => add(event.legacyIds, event.chapters));
  for (const [legacyId, issueList] of groups) {
    const count = Number(data.legacyProgress?.[legacyId] || 0);
    if (!count) continue;
    issueList.slice(0, Math.min(count, issueList.length)).forEach(issue => { data.issueProgress[issue.id] = true; });
  }
}

export function migrateStructuredAliases(model) {
  let changed = false;
  const migrationKey = `${model.id}CanonicalV1`;
  if (!data.migrations?.[migrationKey]) {
    applyLegacyGroups(model);
    data.migrations[migrationKey] = true;
    changed = true;
  }
  if (model.id === 'new52' && !data.migrations?.new52RouteRowsV2) {
    [7,8,9,10,11,14,15,16,18,19,20].forEach(number => {
      const source = `justice-league-2011-${number}`;
      const backup = `justice-league-shazam-backup-2011-${number}`;
      if (data.issueProgress[source] && model.issues.has(backup)) data.issueProgress[backup] = true;
    });
    data.migrations.new52RouteRowsV2 = true;
    changed = true;
  }
  if (changed) notify();
}
