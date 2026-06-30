import { GREAT_STORIES } from '../data/great-stories.js';
import { issueStats } from '../assets/js/progress.js';
import { escapeHtml } from '../assets/js/utils.js';
import { progressBar, badge } from './shared.js';

export function renderGreatStories(models = []) {
  const modelMap = new Map(models.map(model => [model.id, model]));
  const cards = GREAT_STORIES.map(story => {
    const model = modelMap.get(story.eraId);
    const item = story.kind === 'event' ? model?.events.get(story.itemId) : model?.entries.get(story.itemId);
    if (!model || !item) return '';
    const issues = story.kind === 'event' ? item.chapters : item.issues;
    const stats = issueStats(issues || []);
    const routeId = story.kind === 'entry' ? item.routeId : item.routeIds?.[0];
    const href = story.kind === 'event' ? `#/event/${model.id}/${item.id}` : `#/route/${model.id}/${routeId}`;
    return `<article class="great-story-card${stats.complete ? ' is-complete' : ''}">
      <div class="great-story-top"><span>${escapeHtml(model.label)}</span>${badge(story.kind === 'event' ? 'Event' : 'Great story', story.kind === 'event' ? 'event' : 'great-story')}</div>
      <h2>${escapeHtml(story.label)}</h2><p>${escapeHtml(story.blurb)}</p>
      <div class="story-tags">${story.genres.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}<span>Standalone: ${escapeHtml(story.standalone)}</span></div>
      ${progressBar(stats,true)}<div class="card-meta"><span>${stats.read}/${stats.total} issues</span><a href="${href}">Open ${story.kind === 'event' ? 'event' : 'route'} →</a></div>
    </article>`;
  }).filter(Boolean);
  return `<section class="page-hero"><span class="eyebrow">CURATED HIGHLIGHTS</span><h1>Great Stories</h1><p>Excellent arcs and events drawn from the same canonical issue records as the roadmaps. Progress marked here is already reflected everywhere else.</p></section>
  <section class="section-shell"><div class="section-heading"><div><span class="eyebrow">MODERN DC</span><h2>${cards.length} recommendations</h2></div></div><div class="great-stories-grid">${cards.join('')}</div></section>`;
}
