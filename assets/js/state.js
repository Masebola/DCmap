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
  replace(next) {
    Object.keys(data).forEach(key => delete data[key]);
    Object.assign(data, next);
    notify();
  },
  markMigration(key) { data.migrations[key] = true; notify(); }
};

export function migrateNew52Aliases(model) {
  let changed = false;
  if (!data.migrations?.new52CanonicalV1) {
    const apply = (legacyIds, issueList) => {
      if (!legacyIds?.length || !issueList?.length) return;
      for (const legacyId of legacyIds) {
        const count = Number(data.legacyProgress?.[legacyId] || 0);
        if (!count) continue;
        issueList.slice(0, Math.min(count, issueList.length)).forEach(issue => { data.issueProgress[issue.id] = true; });
      }
    };
    model.entries.forEach(entry => apply(entry.legacyIds, entry.issues));
    model.events.forEach(event => apply(event.legacyIds, event.chapters));
    data.migrations.new52CanonicalV1 = true;
    changed = true;
  }
  if (!data.migrations?.new52RouteRowsV2) {
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
