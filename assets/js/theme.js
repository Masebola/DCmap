import { store } from './state.js';

function systemTheme() {
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme = store.value.preferences.theme) {
  const resolved = theme === 'system' ? systemTheme() : theme;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = theme;
}

export function cycleTheme() {
  const current = store.value.preferences.theme || 'system';
  const next = current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system';
  store.setTheme(next);
  applyTheme(next);
  return next;
}

matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => {
  if (store.value.preferences.theme === 'system') applyTheme('system');
});
