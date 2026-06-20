# DC Reading Tracker

A modular, event-anchored DC Comics reading tracker. The current redesign preserves the existing era roadmaps while rebuilding the New 52 as exact issue-level data with routes, phases and ordered crossover gates.

## Current features

- One shared HTML application shell
- Lazy-loaded era modules
- Structured New 52 master flow
- Separate family routes and event library
- Exact ordered event checklists
- Canonical issue progress, so shared issues are counted once
- Legacy compatibility for older era roadmaps
- Progress import and export
- Light, dark and system themes
- Responsive laptop and phone layouts
- Data validation for duplicate IDs and missing references

## Run locally

ES modules need a local web server. From the project folder, run:

```bash
npm run serve
```

Then open `http://localhost:8000`.

VS Code Live Server also works.

## Validate the data

```bash
npm run validate
node tests/render-views.mjs
node tests/smoke-app.mjs
```

## Deploy to GitHub Pages

1. Push the project to a GitHub repository.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select the main branch and the repository root.

The application uses hash routes, so no special server redirects are required.

## Project status

- **New 52:** rebuilt in the structured format
- **Other eras:** preserved through the compatibility renderer
- **Next stages:** refine New 52 content and interactions, then convert later eras one at a time

The previous working tracker is preserved inside `/legacy`.

## Route checklist redesign (v6.1)

New 52 route pages now use a guided checklist layout instead of combining several titles into one large issue drawer.

- **Parallel blocks** keep independent series separate until a crossover begins.
- **Sequential blocks** are read from top to bottom while each issue range stays together.
- **Strict blocks** display major events as full-width gates with exact chapter order.
- Every ordinary row includes a visible checkbox, progress meter, **Issues**, and **Mark read** controls.
- Issue lists expand directly inside the route on desktop and mobile.
- Shared issues still use canonical IDs, so reading an issue in an event updates its family route automatically.

The Green Lantern family demonstrates the intended pattern clearly: four independent opening books, followed by the ordered *Rise of the Third Army* and *Wrath of the First Lantern* gates. The same grouping model is now applied throughout the New 52 routes.
