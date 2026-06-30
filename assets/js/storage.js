const STATE_KEY = 'dcrt-v6-state';
const OLD_ROAD_KEY = 'dcro4-road-progress';
const OLD_ESS_KEY = 'dcro4-ess';

const defaultPreferences = () => ({
  theme: 'system',
  readingMode: 'curated',
  routeView: 'reading',
  includeOptional: true,
  autoHideCompleted: true,
  activeLanes: {}
});

const defaultState = () => ({
  version: 7,
  issueProgress: {},
  legacyProgress: {},
  essentials: [],
  preferences: defaultPreferences(),
  migrations: {},
  recent: []
});

export function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STATE_KEY));
    if (parsed && [6, 7].includes(parsed.version)) {
      return {
        ...defaultState(),
        ...parsed,
        preferences: { ...defaultPreferences(), ...(parsed.preferences || {}), activeLanes: { ...(parsed.preferences?.activeLanes || {}) } },
        issueProgress: { ...(parsed.issueProgress || {}) },
        legacyProgress: { ...(parsed.legacyProgress || {}) },
        migrations: { ...(parsed.migrations || {}) }
      };
    }
  } catch {}
  const state = defaultState();
  try {
    const road = JSON.parse(localStorage.getItem(OLD_ROAD_KEY));
    if (road && typeof road === 'object') state.legacyProgress = road;
  } catch {}
  try {
    const essentials = JSON.parse(localStorage.getItem(OLD_ESS_KEY));
    if (Array.isArray(essentials)) state.essentials = essentials;
  } catch {}
  return state;
}

export function saveState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

export function clearSavedState() {
  localStorage.removeItem(STATE_KEY);
}
