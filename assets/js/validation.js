export function validateStructuredEra(model) {
  const errors = [];
  const seenEntries = new Set();
  for (const entry of model.entries.values()) {
    if (seenEntries.has(entry.id)) errors.push(`Duplicate entry id: ${entry.id}`);
    seenEntries.add(entry.id);
    if (!model.routes.has(entry.routeId)) errors.push(`Missing route ${entry.routeId} for ${entry.id}`);
    if (!(entry.issues instanceof Array)) errors.push(`Entry ${entry.id} has no issue array`);
    if (entry.writers && !Array.isArray(entry.writers)) errors.push(`Entry ${entry.id} writers must be an array`);
  }
  for (const route of model.routes.values()) {
    const blockIds = new Set();
    for (const block of route.blocks || []) {
      if (blockIds.has(block.id)) errors.push(`Duplicate route block id ${block.id} in ${route.id}`);
      blockIds.add(block.id);
      if (!['parallel', 'sequential', 'strict'].includes(block.mode)) errors.push(`Invalid route mode ${block.mode} in ${route.id}/${block.id}`);
      if (!block.steps?.length) errors.push(`Empty route block ${block.id} in ${route.id}`);
    }
    for (const step of route.steps) if (!model.entries.has(step) && !model.events.has(step)) errors.push(`Unknown route step ${step} in ${route.id}`);
  }
  const eventIds = new Set();
  for (const event of model.events.values()) {
    if (eventIds.has(event.id)) errors.push(`Duplicate event id: ${event.id}`);
    eventIds.add(event.id);
    if (!event.chapters?.length) errors.push(`Event ${event.id} has no chapters`);
    for (const id of event.requiredEntries || []) if (!model.entries.has(id)) errors.push(`Event ${event.id} requires missing entry ${id}`);
    for (const routeId of event.routeIds || []) if (!model.routes.has(routeId)) errors.push(`Event ${event.id} references missing route ${routeId}`);
  }
  for (const phase of model.phases || []) {
    for (const id of phase.eventIds || []) if (!model.events.has(id)) errors.push(`Phase ${phase.id} references missing event ${id}`);
    for (const id of phase.routeIds || []) if (!model.routes.has(id)) errors.push(`Phase ${phase.id} references missing route ${id}`);
  }
  if (errors.length) console.warn('[DC Tracker validation]', errors);
  return errors;
}
