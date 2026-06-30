const listeners = new Set();

export function parseRoute(hash = location.hash) {
  const clean = hash.replace(/^#\/?/, '');
  const parts = clean.split('/').filter(Boolean);
  if (!parts.length) return { view: 'dashboard' };
  if (parts[0] === 'era') return { view: 'flow', eraId: parts[1] || 'new52' };
  if (parts[0] === 'route') return { view: 'route', eraId: parts[1] || 'new52', routeId: parts[2] || null };
  if (parts[0] === 'event') return { view: 'event', eraId: parts[1] || 'new52', eventId: parts[2] || null };
  if (parts[0] === 'essentials') return { view: 'essentials' };
  if (parts[0] === 'outside') return { view: 'outside' };
  if (parts[0] === 'completed') return { view: 'completed' };
  if (parts[0] === 'great-stories') return { view: 'great-stories' };
  if (parts[0] === 'stats') return { view: 'stats' };
  if (parts[0] === 'specials') return { view: 'specials', sectionId: parts[1] || 'elseworlds' };
  if (parts[0] === 'settings') return { view: 'settings' };
  return { view: parts[0] || 'dashboard' };
}

export function navigate(path) {
  location.hash = path.startsWith('#') ? path : `#/${path.replace(/^\//, '')}`;
}

export function startRouter(listener) {
  listeners.add(listener);
  const emit = () => listeners.forEach(fn => fn(parseRoute()));
  addEventListener('hashchange', emit);
  if (!location.hash) location.hash = '#/dashboard';
  else emit();
  return () => listeners.delete(listener);
}
