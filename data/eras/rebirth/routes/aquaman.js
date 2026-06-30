import { combine, entry, range, route, routeBlock, special } from '../../../shared/helpers.js';

export const entries = [
  entry({id:'rb-aquaman-drowning',routeId:'aquaman-atlantis',phaseId:'rb-phase-1',title:'Aquaman: Rebirth #1 and Aquaman #1–6: The Drowning',year:'2016',writers:['Dan Abnett'],artists:['Brad Walker','Philippe Briones'],summary:'Arthur tries to build peace between Atlantis and the surface while Black Manta and a hidden organisation sabotage him.',issues:combine([special('Aquaman: Rebirth',2016)],range('Aquaman',2016,1,6,2016)),priority:'core',legacyIds:['rb-1-jl2']}),
  entry({id:'rb-aquaman-black-manta',routeId:'aquaman-atlantis',phaseId:'rb-phase-2',title:'Aquaman #7–15: Black Manta Rising and The Deluge',year:'2016–2017',writers:['Dan Abnett'],artists:['Scot Eaton','Philippe Briones'],summary:'Manta’s campaign expands as Atlantis faces political isolation and war.',issues:range('Aquaman',2016,7,15,2017),priority:'core',legacyIds:['rb-2-jl1']}),
  entry({id:'rb-aquaman-warhead',routeId:'aquaman-atlantis',phaseId:'rb-phase-3',title:'Aquaman #16–24: Warhead and Crown of Atlantis',year:'2017',writers:['Dan Abnett'],artists:['Scot Eaton','Philippe Briones'],summary:'Arthur’s rule is challenged by prophecy, political distrust and a growing revolt beneath the sea.',issues:range('Aquaman',2016,16,24,2017),priority:'core'}),
  entry({id:'rb-aquaman-underworld',routeId:'aquaman-atlantis',phaseId:'rb-phase-5',title:'Aquaman #25–30: Underworld',year:'2017',writers:['Dan Abnett'],artists:['Stjepan Šejić'],summary:'Deposed and presumed dead, Arthur moves through Atlantis as an underground symbol of resistance.',issues:range('Aquaman',2016,25,30,2017),priority:'great-story'})
];

export const routeData = route({id:'aquaman-atlantis',title:'Aquaman & Atlantis',shortTitle:'Aquaman & Atlantis',icon:'♆',accent:'blue',description:'Dan Abnett’s political Aquaman saga from diplomacy to revolution beneath Atlantis.',blocks:[
  routeBlock({id:'rb-aqua-start',title:'Diplomacy and War',year:'2016–2017',mode:'sequential',steps:['rb-aquaman-drowning','rb-aquaman-black-manta','rb-aquaman-warhead']}),
  routeBlock({id:'rb-aqua-underworld',title:'Underworld',year:'2017',mode:'sequential',steps:['rb-aquaman-underworld']})
]});
