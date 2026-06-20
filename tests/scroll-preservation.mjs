import fs from 'node:fs';

const app = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
const routeView = fs.readFileSync(new URL('../components/structured-views.js', import.meta.url), 'utf8');

const forcedTopCalls = [...app.matchAll(/window\.scrollTo\(0,\s*0\)/g)].length;
if (forcedTopCalls !== 1) {
  throw new Error(`Expected exactly one navigation-only scroll-to-top call, found ${forcedTopCalls}.`);
}
if (!app.includes('const snapshot = pendingViewportSnapshot || captureViewportState();')) {
  throw new Error('Progress updates are not capturing the current viewport.');
}
if (!app.includes('restoreViewportState(snapshot);')) {
  throw new Error('Progress updates are not restoring the viewport.');
}
if (!app.includes("if (isNavigationRender)")) {
  throw new Error('Navigation and progress renders are not separated.');
}
if (!routeView.includes('data-event-id="${escapeHtml(event.id)}"')) {
  throw new Error('Event gates do not expose stable viewport anchors.');
}
console.log('Scroll-preservation guards passed.');
