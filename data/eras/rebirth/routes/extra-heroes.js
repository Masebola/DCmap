import { combine, entry, range, route, routeBlock, special } from '../../../shared/helpers.js';

export const entries = [
  entry({id:'rb-deathstroke-professional',routeId:'extra-heroes',phaseId:'rb-phase-1',title:'Deathstroke: Rebirth #1 and Deathstroke #1–18',year:'2016–2017',writers:['Christopher Priest'],artists:['Carlo Pagulayan','Joe Bennett'],summary:'A fractured, deliberately uncomfortable family drama examines Slade Wilson without excusing him.',issues:combine([special('Deathstroke: Rebirth',2016)],range('Deathstroke',2016,1,18,2017)),priority:'great-story',legacyIds:['rb-1-oth']}),
  entry({id:'rb-deathstroke-defiance-start',routeId:'extra-heroes',phaseId:'rb-phase-5',title:'Deathstroke #21–24: Defiance Begins',year:'2017',writers:['Christopher Priest'],artists:['Diogenes Neves','Larry Hama'],summary:'After Lazarus Contract, Slade attempts the least convincing heroic reinvention imaginable.',issues:range('Deathstroke',2016,21,24,2017),priority:'optional'})
];

export const routeData = route({id:'extra-heroes',title:'Extra Heroes',shortTitle:'Extra Heroes',icon:'✦',accent:'purple',description:'Strong character runs that do not need their own universe-spine lane.',blocks:[
  routeBlock({id:'rb-extra-deathstroke',title:'Christopher Priest’s Deathstroke',year:'2016–2017',mode:'sequential',steps:['rb-deathstroke-professional','the-lazarus-contract','rb-deathstroke-defiance-start']})
]});
