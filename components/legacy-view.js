import { escapeHtml } from '../assets/js/utils.js';
import { legacyEraStats } from '../assets/js/progress.js';
import { legacyRow, progressBar } from './shared.js';

export function renderLegacyEra(era) {
  const stats=legacyEraStats(era);
  return `<section class="page-hero"><span class="eyebrow">LEGACY-COMPATIBLE ERA</span><h1>${escapeHtml(era.title)}</h1><p>${era.subtitle?escapeHtml(era.subtitle):''} · ${escapeHtml(era.dates||'')}</p><div class="legacy-description">${era.desc||''}</div><div class="hero-progress">${progressBar(stats)}<strong>${stats.read}/${stats.total} issues · ${stats.pct}%</strong></div><div class="notice">This era keeps the original compact row format for now. New 52 is the first era using exact issue-level progress.</div></section>
  <div class="legacy-blocks">${era.blocks.map(block=>`<details class="legacy-block" open><summary><span>${escapeHtml(block.num)}</span><div><strong>${escapeHtml(block.title)}</strong><small>${escapeHtml(block.dates||'')}</small></div></summary>${block.secs.map(section=>`<section><h3 class="legacy-section-title">${escapeHtml(section.label)}</h3><ul>${section.items.map(legacyRow).join('')}</ul></section>`).join('')}${block.pause?`<div class="phase-note">${escapeHtml(block.pause)}</div>`:''}</details>`).join('')}</div>`;
}
