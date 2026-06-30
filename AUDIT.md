# DC Reading Tracker v7.1 Audit

Audit date: 2026-06-30

## Fixed defects

1. **Outside the Roadmap filters were inert**
   - Era, status, family and search controls now update the shelf.

2. **Live search could lose focus after one character**
   - Search inputs now restore keyboard focus, cursor position and viewport after rerendering.

3. **Special-shelf completion message used the route-page view setting**
   - Elseworlds and collaboration completion messages now use their own shelf view.

4. **Invalid structured data only logged warnings**
   - Navigation now rejects invalid structured-era data and displays the existing error card instead of continuing with a partially broken view.

## Added

- Elseworlds / Black Label shelf
- Collaborations shelf
- DC × Marvel, digital Marvel/DC and other-publisher groupings
- Inline issue tracking, search, filters and completion views
- Completed Library integration
- Separate Stats totals
- Dashboard and responsive navigation links
- Current-catalog date display

## Catalog totals

- Elseworlds / Black Label: 65 works, 322 unique tracked issues or graphic novels
- Collaborations: 70 works, 277 unique tracked issues or graphic novels
- Total: 135 works, 599 unique special-shelf records

Special-shelf records are separate from main-continuity completion and do not collide with structured-era issue IDs.

## Automated verification

- All structured era data validated
- 145 generated views rendered
- Main application smoke render passed
- Special collections smoke render passed
- All 32 rendered actions have handlers
- Outside Roadmap filters tested
- Special shelf search and filters tested
- Scroll-preservation regression checks passed
- Migration and global accounting checks passed
- JavaScript syntax accepted across application, data and tests
- CSS parser accepted all stylesheets
- Every static file referenced by index.html exists
- Local HTTP deployment returned 200 for the application shell and sampled modules/styles

## Environment limitation

Headless Chromium screenshot capture could not run in the container because its system bus, network namespace and file-watch services are restricted. This did not affect static serving, module loading or automated rendering tests.
