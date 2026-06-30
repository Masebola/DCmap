import { combine, entry, issue, range, route, routeBlock, special } from '../../../shared/helpers.js';
import { DC_UNIVERSE_REBIRTH_1 } from '../../../shared/bridge-issues.js';

export const entries = [
  entry({id:'rb-rebirth-special',routeId:'universe-spine',phaseId:'rb-phase-1',title:'DC Universe: Rebirth #1',year:'2016',writers:['Geoff Johns'],artists:['Gary Frank','Ethan Van Sciver','Ivan Reis','Phil Jimenez'],summary:'Wally West returns and reconnects the DC Universe with legacy, hope and a mystery beyond time.',issues:[DC_UNIVERSE_REBIRTH_1],priority:'core',legacyIds:['rb-1-s1']}),
  entry({id:'rb-justice-league-opening',routeId:'universe-spine',phaseId:'rb-phase-1',title:'Justice League: Rebirth #1 and Justice League #1–5',year:'2016',writers:['Bryan Hitch'],summary:'The League confronts a global extinction threat in the opening team arc.',issues:combine([special('Justice League: Rebirth',2016)],range('Justice League',2016,1,5,2016)),priority:'optional',legacyIds:['rb-1-jl1']}),
  entry({id:'rb-justice-league-state-fearless',routeId:'universe-spine',phaseId:'rb-phase-2',title:'Justice League #6–11',year:'2016',writers:['Bryan Hitch'],summary:'The team faces internal fears and the consequences of its new public role.',issues:range('Justice League',2016,6,11,2016),priority:'optional',legacyIds:['rb-2-jl1']}),
  entry({id:'rb-justice-league-timeless',routeId:'universe-spine',phaseId:'rb-phase-3',title:'Justice League #12–20',year:'2017',writers:['Bryan Hitch'],summary:'The League moves through Max Lord, time fractures and larger cosmic threats.',issues:range('Justice League',2016,12,20,2017),priority:'optional',legacyIds:['rb-3-jl']}),
  entry({id:'rb-justice-league-pre-metal',routeId:'universe-spine',phaseId:'rb-phase-5',title:'Justice League #22–31',year:'2017',writers:['Bryan Hitch'],summary:'A final optional stretch before Metal pulls the League into the Dark Multiverse crisis.',issues:range('Justice League',2016,22,31,2017),priority:'optional',legacyIds:['rb-5-jl1']})
];

export const routeData = route({
  id:'universe-spine',title:'Universe Spine',shortTitle:'Universe Spine',icon:'◆',accent:'crimson',description:'The Rebirth special, optional Justice League material and the hard road into Dark Nights: Metal.',
  blocks:[
    routeBlock({id:'rb-spine-launch',title:'The Rebirth Threshold',year:'2016',mode:'sequential',steps:['rb-rebirth-special','rb-justice-league-opening']}),
    routeBlock({id:'rb-spine-middle',title:'Justice League Through Early Rebirth',year:'2016–2017',mode:'sequential',steps:['rb-justice-league-state-fearless','rb-justice-league-timeless']}),
    routeBlock({id:'rb-spine-button',title:'The Button',year:'2017',mode:'strict',steps:['the-button']}),
    routeBlock({id:'rb-spine-road-metal',title:'Before Metal',year:'2017',mode:'sequential',steps:['rb-justice-league-pre-metal']}),
    routeBlock({id:'rb-spine-metal',title:'Dark Nights: Metal',year:'2017–2018',mode:'strict',steps:['dark-nights-metal']})
  ]
});
