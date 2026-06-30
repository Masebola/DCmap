# DC Reading Tracker v7.1

A static HTML, CSS and vanilla JavaScript reading tracker for the DC Universe. It uses one HTML application shell, modular era data, hash routing, canonical issue records and browser localStorage.

## Roadmap coverage

### Structured modern eras

- New 52, 2011–2016
- Rebirth to Dark Nights: Metal, 2016–2018
- Post-Metal to Infinite Frontier, 2018–2021
- Infinite Frontier to Dark Crisis, 2021–2023
- Dawn of DC to DC All In Special, 2023–2024
- DC All In, 2024–June 2026
- Absolute Universe, 2024–June 2026

### Legacy-compatible eras

- Crisis to Zero Hour
- Zero Hour to Infinite Crisis
- 52 to Final Crisis
- Post-Final Crisis to Blackest Night
- Post-Blackest Night to Flashpoint

## Elseworlds & Collaborations

v7.1 adds a separate top-level library that does not change the main-continuity percentage.

### Elseworlds / Black Label

- Classic Elseworlds
- Major alternate universes
- The modern revived Elseworlds line
- Superhero-focused DC Black Label projects
- 65 tracked works and 322 unique issues or graphic novels

### Collaborations

- Historical and current DC × Marvel crossovers
- Digital DC/Marvel one-shots
- Crossovers with Dark Horse, IDW, BOOM! Studios, Archie, Dynamite, SEGA, Legendary and other partners
- 70 tracked works and 277 unique issues or graphic novels

Both shelves support:

- Reading List, All and Completed views
- Group and publishing-partner filters
- Live search
- Inline issue checklists
- Mark Read and Mark Unread
- Auto-hide completed works
- Completed Library integration
- Separate Stats totals

The current special-shelf catalog was checked through June 30, 2026.

## v7.1 fixes and safeguards

- Fixed the Outside the Roadmap filters, which previously rendered but did not respond
- Added search-field focus and cursor restoration during live filtering
- Corrected completion messaging for special shelves
- Added strict runtime rejection of invalid structured-era data instead of only logging warnings
- Added automated coverage checking so every rendered button action must have an application handler
- Added a dedicated smoke test for the Collaborations route
- Confirmed that special-shelf issue IDs do not collide with main-continuity issue IDs
- Preserved existing scroll anchors, progress migration and localStorage compatibility

## Existing reading tools retained

- Parallel, sequential and strict crossover reading modes
- Inline issue checklists
- Exact event reading orders
- Writer and optional artist information
- Optional-reading filters
- Active lane Select All and Clear All controls
- Reading List, All and Completed route views
- Auto-hide completed arcs with Undo
- Completed Library
- Outside the Roadmap shelf
- Great Stories and Stats
- Light, dark and system themes
- Import and export
- Scroll and keyboard-focus preservation after marking progress
- Responsive desktop and mobile layouts

## Run locally

ES modules require a local web server. From this folder run:

```bash
npm run serve
```

Then open:

```text
http://localhost:8000
```

VS Code Live Server, GitHub Pages or another static web server also work.

## Tests

```bash
npm test
```

The suite validates every structured era, Great Stories references, cross-era bridge issues, global progress accounting, the Elseworlds and Collaborations catalogs, generated views, route controls, action coverage, visibility filters, migration and scroll-preservation behaviour.

## Progress compatibility

Progress remains stored under the existing `dcrt-v6-state` localStorage key, so replacing v6.2, v6.3 or v7.0 does not erase browser progress. v7 accepts both version 6 and version 7 export files, then saves them in the v7 format.

Use **Settings → Export progress** before replacing a deployed copy or moving to another browser.

## Important folders

```text
assets/js/                    application engine, state, routing and progress
components/                   dashboard, roadmap, special shelves and statistics views
data/eras/                    modular continuity-era data
data/shared/                  issue helpers, route definitions and bridge issues
data/great-stories.js         curated story references
data/outside-roadmap.js       excluded and summary-only material
data/special-collections.js   Elseworlds, Black Label and collaborations catalog
tests/                        validation and regression suite
legacy/                       preserved original tracker
```
