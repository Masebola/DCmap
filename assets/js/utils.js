export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
export const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const percent = (read, total) => total ? Math.round((read / total) * 100) : 0;
export const unique = values => [...new Set(values)];
export function formatIssue(issue) {
  const suffix = issue.kind === 'annual' ? ` #${issue.issue}` : ` #${issue.issue}`;
  return `${issue.series}${suffix}`;
}
export function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.__dcrtToast);
  window.__dcrtToast = setTimeout(() => el.classList.remove('show'), 2200);
}
