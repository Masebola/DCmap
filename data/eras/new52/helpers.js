const slug = value => String(value)
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const normaliseIssue = value => String(value)
  .toLowerCase()
  .replace(/#/g, '')
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9.-]+/g, '-');

export function issue(series, volumeYear, issueNumber, releaseYear = volumeYear, options = {}) {
  const issueLabel = String(issueNumber);
  return {
    id: `${slug(series)}-${volumeYear}-${normaliseIssue(issueLabel)}`,
    series,
    volumeYear,
    issue: issueLabel,
    releaseYear,
    title: options.title || null,
    kind: options.kind || 'issue'
  };
}

export function range(series, volumeYear, start, end, releaseYear = volumeYear) {
  return Array.from({ length: end - start + 1 }, (_, index) =>
    issue(series, volumeYear, start + index, releaseYear)
  );
}

export function issues(series, volumeYear, issueNumbers, releaseYear = volumeYear) {
  return issueNumbers.map(number => issue(series, volumeYear, number, releaseYear));
}

export function annual(series, volumeYear, number, releaseYear = volumeYear) {
  return issue(`${series} Annual`, volumeYear, number, releaseYear, { kind: 'annual' });
}

export function special(title, releaseYear, issueNumber = 1) {
  return issue(title, releaseYear, issueNumber, releaseYear, { kind: 'special' });
}

export function combine(...groups) {
  return groups.flat();
}

export function entry({
  id,
  routeId,
  phaseId,
  title,
  year,
  summary,
  issues: issueList,
  priority = 'recommended',
  tags = [],
  legacyIds = [],
  note = '',
  stop = ''
}) {
  return { id, routeId, phaseId, title, year, summary, issues: issueList, priority, tags, legacyIds, note, stop };
}

export function route({ id, title, shortTitle, description, accent, icon, steps = [], blocks = [] }) {
  const flattened = blocks.length ? blocks.flatMap(block => block.steps || []) : steps;
  return { id, title, shortTitle: shortTitle || title, description, accent, icon, steps: flattened, blocks };
}

export function routeBlock({ id, title, mode = 'sequential', description = '', help = '', year = '', steps = [] }) {
  return { id, title, mode, description, help, year, steps };
}

export function event({
  id,
  title,
  year,
  type,
  phaseId,
  summary,
  chapters,
  requiredBefore = [],
  next = '',
  optionalChapters = [],
  routeIds = [],
  legacyIds = []
}) {
  return { id, title, year, type, phaseId, summary, chapters, requiredBefore, next, optionalChapters, routeIds, legacyIds };
}
