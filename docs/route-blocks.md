# Route blocks

Each structured route is divided into blocks with one of three modes.

## Parallel

Independent books may be read in any order. The reader should finish the listed stopping points before entering the following event gate.

## Sequential

Rows should be read from top to bottom, but every issue range remains an uninterrupted mini-block.

## Strict

Used for events and crossover gates. The event object supplies one exact chapter list.

A route block uses this shape:

```js
routeBlock({
  id: 'lantern-openings',
  title: 'Opening Lantern Stories',
  mode: 'parallel',
  year: '2011–2012',
  steps: ['gl-opening', 'glc-opening']
})
```

Rows continue to reference canonical issue objects. Splitting a visual route row does not duplicate progress records.
