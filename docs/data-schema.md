# Data Schema

## Canonical issue

Each issue has one stable ID and can be referenced by any number of routes and events.

```js
{
  id: "justice-league-2011-022",
  series: "Justice League",
  volumeYear: 2011,
  issue: "22",
  releaseYear: 2013
}
```

## Reading entry

A reading entry is a story block inside one route and phase.

```js
{
  id: "jl-origin",
  routeId: "universe-spine",
  phaseId: "n52-phase-1",
  title: "Justice League: Origin",
  year: "2011–2012",
  issues: [],
  priority: "essential"
}
```

## Event

An event stores an exact ordered chapter list and its prerequisites.

```js
{
  id: "trinity-war",
  type: "hard-gate",
  chapters: [],
  requiredBefore: [],
  next: "Continue directly to Forever Evil."
}
```
