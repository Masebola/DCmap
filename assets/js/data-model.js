export function prepareStructuredEra(era) {
  const issues = new Map();
  const entries = new Map(era.entries.map(entry => [entry.id, entry]));
  const events = new Map(era.events.map(event => [event.id, event]));
  const routes = new Map(era.routes.map(route => [route.id, route]));
  const add = issue => { if (issue?.id) issues.set(issue.id, issue); };
  era.entries.forEach(entry => (entry.issues || []).forEach(add));
  era.events.forEach(event => [...(event.chapters || []), ...(event.optionalChapters || [])].forEach(add));
  add(era.finaleIssue);
  return { ...era, issues, entries, events, routes };
}

export function allLegacyItems(era) {
  return era.blocks.flatMap(block => block.secs.flatMap(section => section.items));
}
