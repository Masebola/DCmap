# Structured era schema

A structured era exports:

- `id`, `label`, `title`, `subtitle`, `dates`, `description`
- `phases`
- `routes`
- `entries`
- `events`
- optional `finaleIssue` or `openingIssue`

## Entry

```js
entry({
  id,
  routeId,
  phaseId,
  title,
  year,
  summary,
  issues,
  priority: 'core' | 'important' | 'recommended' | 'great-story' | 'optional',
  writers: [],
  artists: [],
  legacyIds: [],
  tags: [],
  note,
  stop
})
```

Optional entries remain inside their correct route but do not count toward main-route completion.

## Event

```js
event({
  id,
  title,
  year,
  type,
  phaseId,
  summary,
  chapters,
  requiredEntries: [],
  requiredBefore: [],
  routeIds: [],
  architect,
  next
})
```

`requiredEntries` creates live prerequisite checks. `requiredBefore` remains available for explanatory text.

## Canonical issues

Every issue has one deterministic ID. The same issue can appear in a route, event and adjacent era without creating duplicate progress.
