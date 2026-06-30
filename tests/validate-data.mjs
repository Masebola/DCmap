import { ESSENTIAL_GROUPS } from '../data/essentials.js';
import { GREAT_STORIES } from '../data/great-stories.js';
import { ERA_INDEX, loadEra } from '../data/era-index.js';
import { prepareStructuredEra } from '../assets/js/data-model.js';
import { validateStructuredEra } from '../assets/js/validation.js';

const errors = [];
const models = new Map();
for (const meta of ERA_INDEX.filter(era => era.format === 'structured')) {
  const era = await loadEra(meta.id);
  const rawGroups = [['entry', era.entries], ['event', era.events], ['route', era.routes]];
  for (const [kind, items] of rawGroups) {
    const ids = items.map(item => item.id);
    for (const id of new Set(ids.filter((value, index) => ids.indexOf(value) !== index))) errors.push(`${meta.id}: duplicate raw ${kind} id ${id}`);
  }
  const model = prepareStructuredEra(era);
  models.set(meta.id, model);
  errors.push(...validateStructuredEra(model).map(error => `${meta.id}: ${error}`));
  if (!model.phases.length) errors.push(`${meta.id}: no phases`);
  if (!model.routes.size) errors.push(`${meta.id}: no routes`);
  if (!model.entries.size) errors.push(`${meta.id}: no entries`);
  console.log(`Validated ${era.label}: ${model.issues.size} unique issues, ${model.mainIssues.size} main, ${model.optionalIssues.size} optional, ${model.entries.size} entries, ${model.events.size} events and ${model.routes.size} routes.`);
}

for (const story of GREAT_STORIES) {
  const model = models.get(story.eraId);
  const item = story.kind === 'event' ? model?.events.get(story.itemId) : model?.entries.get(story.itemId);
  if (!item) errors.push(`Great Story ${story.id} references missing ${story.kind} ${story.eraId}/${story.itemId}`);
}

const bridgeIds = new Map();
for (const model of models.values()) for (const item of model.mainIssues.values()) {
  if (!bridgeIds.has(item.id)) bridgeIds.set(item.id, []);
  bridgeIds.get(item.id).push(model.id);
}
const shared = [...bridgeIds.values()].filter(eras => new Set(eras).size > 1).length;
if (!shared) errors.push('No cross-era shared canonical issues were detected.');

const essentialIds = new Map();
for (const group of ESSENTIAL_GROUPS) {
  for (const character of group.chars) {
    for (const item of Object.values(character.tiers).flat()) {
      const where = `${group.label} / ${character.name}`;
      if (essentialIds.has(item.id)) errors.push(`Duplicate essential id ${item.id}: ${essentialIds.get(item.id)} and ${where}`);
      else essentialIds.set(item.id, where);
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${essentialIds.size} essential items, ${GREAT_STORIES.length} Great Stories and ${shared} shared cross-era issues.`);
