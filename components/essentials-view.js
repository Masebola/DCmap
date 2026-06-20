import { ESSENTIAL_GROUPS } from '../data/essentials.js';
import { escapeHtml } from '../assets/js/utils.js';
import { store } from '../assets/js/state.js';

let selected = ESSENTIAL_GROUPS[0]?.chars[0]?.id;
export function setSelectedEssential(id){ selected=id; }

export function renderEssentials() {
  const all=ESSENTIAL_GROUPS.flatMap(group=>group.chars); const character=all.find(item=>item.id===selected)||all[0];
  const set=new Set(store.value.essentials||[]);
  const sidebar=ESSENTIAL_GROUPS.map(group=>`<div class="essential-group"><h3>${escapeHtml(group.label)}</h3>${group.chars.map(char=>{const ids=Object.values(char.tiers).flat().map(i=>i.id);const done=ids.filter(id=>set.has(id)).length;return `<button class="essential-nav${char.id===character.id?' active':''}" data-action="select-essential" data-character-id="${char.id}"><span>${char.icon}</span><strong>${escapeHtml(char.name)}</strong><small>${done}/${ids.length}</small></button>`}).join('')}</div>`).join('');
  const labels={before:'Context / Read Before',start:'Start Here',core:'Core Essentials',modern:'Modern & Continue'};
  const content=Object.entries(character.tiers).map(([key,items])=>items.length?`<section class="essential-tier"><h3>${labels[key]||key}</h3>${items.map(item=>`<button class="essential-item${set.has(item.id)?' is-read':''}" data-action="toggle-essential" data-essential-id="${item.id}"><span class="issue-toggle">${set.has(item.id)?'✓':''}</span><div><strong>${escapeHtml(item.t)}</strong><small>${escapeHtml(item.y||'')} · ${escapeHtml(item.m||'')}</small></div></button>`).join('')}</section>`:'').join('');
  return `<section class="essentials-layout"><aside class="essentials-sidebar"><div class="sidebar-title"><span class="eyebrow">BEGINNER PATHS</span><h2>Essentials</h2></div>${sidebar}</aside><main class="essentials-content"><span class="eyebrow">${character.icon} CHARACTER GUIDE</span><h1>${escapeHtml(character.name)}</h1><p>${escapeHtml(character.desc)}</p>${content}</main></section>`;
}
