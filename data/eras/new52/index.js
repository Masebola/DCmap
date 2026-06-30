import { NEW52_EVENTS } from './events.js';
import { NEW52_PHASES } from './phases.js';
import { entries as universeEntries, routeData as universeRoute } from './routes/universe-spine.js';
import { entries as batEntries, routeData as batRoute } from './routes/bat-family.js';
import { entries as supermanEntries, routeData as supermanRoute } from './routes/superman-family.js';
import { entries as lanternEntries, routeData as lanternRoute } from './routes/green-lantern.js';
import { entries as darkEntries, routeData as darkRoute } from './routes/dark-occult.js';
import { entries as soloEntries, routeData as soloRoute } from './routes/solo-heroes.js';
import { entries as extraEntries, routeData as extraRoute } from './routes/extra-worlds.js';
import { DC_UNIVERSE_REBIRTH_1 } from '../../shared/bridge-issues.js';

const entries = [
  ...universeEntries,
  ...batEntries,
  ...supermanEntries,
  ...lanternEntries,
  ...darkEntries,
  ...soloEntries,
  ...extraEntries
];

const routes = [universeRoute, batRoute, supermanRoute, lanternRoute, darkRoute, soloRoute, extraRoute];
const finaleIssue = DC_UNIVERSE_REBIRTH_1;

export default {
  format:'structured',
  id:'new52',
  label:'New 52',
  title:'The New 52 Master Flow',
  subtitle:'Curated event-anchored reading roadmap',
  dates:'September 2011 – May 2016',
  description:'Read multiple families interchangeably while major events and lane gates control where each route pauses and rejoins.',
  routes,
  entries,
  events:NEW52_EVENTS,
  phases:NEW52_PHASES,
  finaleIssue,
  skipSummary:[
    'Batman Eternal and most weak or redundant Gotham series',
    'Superboy outside H’El and Krypton Returns chapters',
    'The Flash after #29 and Wonder Woman after #35',
    'Futures End, Earth 2: World’s End and the full Convergence event',
    'Weak New 52 Deathstroke, Constantine and later Batwoman material'
  ]
};
