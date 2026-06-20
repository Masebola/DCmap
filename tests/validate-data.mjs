import new52 from '../data/eras/new52/index.js';
import { ESSENTIAL_GROUPS } from '../data/essentials.js';
import { prepareStructuredEra } from '../assets/js/data-model.js';
import { validateStructuredEra } from '../assets/js/validation.js';

const model = prepareStructuredEra(new52);
const errors = validateStructuredEra(model);
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
for (const phase of new52.phases) {
  for (const id of phase.eventIds) if (!model.events.has(id)) errors.push(`Phase ${phase.id} references missing event ${id}`);
  for (const id of phase.routeIds) if (!model.routes.has(id)) errors.push(`Phase ${phase.id} references missing route ${id}`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${model.issues.size} unique New 52 issues, ${model.entries.size} entries, ${model.events.size} events, ${model.routes.size} routes and ${essentialIds.size} essential items.`);
