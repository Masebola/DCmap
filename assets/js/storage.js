const STATE_KEY = 'dcrt-v6-state';
const OLD_ROAD_KEY = 'dcro4-road-progress';
const OLD_ESS_KEY = 'dcro4-ess';

const defaultState = () => ({
  version: 6,
  issueProgress: {},
  legacyProgress: {},
  essentials: [],
  preferences: { theme: 'system', readingMode: 'curated' },
  migrations: {},
  recent: []
});

export function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STATE_KEY));
    if (parsed && parsed.version === 6) return { ...defaultState(), ...parsed };
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
