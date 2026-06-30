export function isOptionalEntry(entry) {
  return entry?.priority === 'optional';
}

export function prepareStructuredEra(era) {
  const issues = new Map();
  const mainIssues = new Map();
  const optionalIssues = new Map();
  const entries = new Map(era.entries.map(entry => [entry.id, entry]));
  const events = new Map(era.events.map(event => [event.id, event]));
  const routes = new Map(era.routes.map(route => [route.id, route]));
  const add = (target, issue) => { if (issue?.id) target.set(issue.id, issue); };

  era.entries.forEach(entry => {
    for (const item of entry.issues || []) {
      add(issues, item);
      if (isOptionalEntry(entry)) add(optionalIssues, item);
      else add(mainIssues, item);
    }
  });
  era.events.forEach(event => {
    for (const item of [...(event.chapters || []), ...(event.optionalChapters || [])]) add(issues, item);
    for (const item of event.chapters || []) add(mainIssues, item);
    for (const item of event.optionalChapters || []) add(optionalIssues, item);
  });
  add(issues, era.finaleIssue);
  add(mainIssues, era.finaleIssue);
  for (const id of mainIssues.keys()) optionalIssues.delete(id);

  return { ...era, issues, mainIssues, optionalIssues, entries, events, routes };
}

export function allLegacyItems(era) {
  return era.blocks.flatMap(block => block.secs.flatMap(section => section.items));
}
