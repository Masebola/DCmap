import { REBIRTH_EVENTS } from './events.js';
import { REBIRTH_PHASES } from './phases.js';
import { entries as universeEntries, routeData as universeRoute } from './routes/universe-spine.js';
import { entries as batEntries, routeData as batRoute } from './routes/bat-family.js';
import { entries as supermanEntries, routeData as supermanRoute } from './routes/superman-family.js';
import { entries as flashEntries, routeData as flashRoute } from './routes/flash-family.js';
import { entries as lanternEntries, routeData as lanternRoute } from './routes/green-lantern.js';
import { entries as titansEntries, routeData as titansRoute } from './routes/titans-young-heroes.js';
import { entries as wonderEntries, routeData as wonderRoute } from './routes/wonder-woman.js';
import { entries as aquamanEntries, routeData as aquamanRoute } from './routes/aquaman.js';
import { entries as arrowEntries, routeData as arrowRoute } from './routes/green-arrow.js';
import { entries as extraEntries, routeData as extraRoute } from './routes/extra-heroes.js';
import { DC_UNIVERSE_REBIRTH_1 } from '../../shared/bridge-issues.js';

const entries = [
  ...universeEntries,
  ...batEntries,
  ...supermanEntries,
  ...flashEntries,
  ...lanternEntries,
  ...titansEntries,
  ...wonderEntries,
  ...aquamanEntries,
  ...arrowEntries,
  ...extraEntries
];

const routes = [universeRoute,batRoute,supermanRoute,flashRoute,lanternRoute,titansRoute,wonderRoute,aquamanRoute,arrowRoute,extraRoute];

export default {
  format:'structured',
  id:'rebirth',
  label:'Rebirth → Metal',
  title:'Rebirth to Dark Nights: Metal',
  subtitle:'Legacy returns and the Dark Multiverse opens',
  dates:'May 2016 – March 2018',
  description:'Read the family relaunches in parallel, pause only for their true crossovers, and finish with Dark Nights: Metal before entering No Justice.',
  routes,
  entries,
  events:REBIRTH_EVENTS,
  phases:REBIRTH_PHASES,
  openingIssue:DC_UNIVERSE_REBIRTH_1,
  asOf:'2018-03-28'
};
