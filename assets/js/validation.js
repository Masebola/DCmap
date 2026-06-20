export function validateStructuredEra(model) {
  const errors = [];
  const seenEntries = new Set();
  for (const entry of model.entries.values()) {
    if (seenEntries.has(entry.id)) errors.push(`Duplicate entry id: ${entry.id}`);
    seenEntries.add(entry.id);
    if (!model.routes.has(entry.routeId)) errors.push(`Missing route ${entry.routeId} for ${entry.id}`);
    if (!(entry.issues instanceof Array)) errors.push(`Entry ${entry.id} has no issue array`);
  }
  for (const route of model.routes.values()) {
    const blockIds = new Set();
    for (const block of route.blocks || []) {
      if (blockIds.has(block.id)) errors.push(`Duplicate route block id ${block.id} in ${route.id}`);
      blockIds.add(block.id);
      if (!['parallel', 'sequential', 'strict'].includes(block.mode)) errors.push(`Invalid route mode ${block.mode} in ${route.id}/${block.id}`);
      if (!block.steps?.length) errors.push(`Empty route block ${block.id} in ${route.id}`);
    }
    for (const step of route.steps) {
      if (!model.entries.has(step) && !model.events.has(step)) errors.push(`Unknown route step ${step} in ${route.id}`);
    }
  }
  const eventIds = new Set();
  for (const event of model.events.values()) {
    if (eventIds.has(event.id)) errors.push(`Duplicate event id: ${event.id}`);
    eventIds.add(event.id);
    if (!event.chapters?.length) errors.push(`Event ${event.id} has no chapters`);
  }
  if (errors.length) console.warn('[DC Tracker validation]', errors);
  return errors;
}
