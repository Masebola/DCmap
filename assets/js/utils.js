export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
export const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const percent = (read, total) => total ? Math.round((read / total) * 100) : 0;
export const unique = values => [...new Set(values)];
export function formatIssue(issue) {
  return `${issue.series} #${issue.issue}`;
}
export function toast(message, action = null) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.innerHTML = `<span>${escapeHtml(message)}</span>${action?.label ? `<button type="button">${escapeHtml(action.label)}</button>` : ''}`;
  const button = el.querySelector('button');
  if (button && typeof action.onClick === 'function') button.addEventListener('click', () => {
    action.onClick();
    el.classList.remove('show');
  }, { once:true });
  el.classList.toggle('has-action', Boolean(button));
  el.classList.add('show');
  clearTimeout(window.__dcrtToast);
  window.__dcrtToast = setTimeout(() => el.classList.remove('show'), action?.duration || 3200);
}
