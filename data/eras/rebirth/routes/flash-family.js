import { combine, entry, range, route, routeBlock, special } from '../../../shared/helpers.js';

export const entries = [
  entry({id:'rb-flash-lightning-strikes',routeId:'flash-family',phaseId:'rb-phase-1',title:'The Flash: Rebirth #1 and The Flash #1–8: Lightning Strikes Twice',year:'2016',writers:['Joshua Williamson'],artists:['Carmine Di Giandomenico'],summary:'Barry trains new speedsters while a killer called Godspeed targets Central City’s connection to the Speed Force.',issues:combine([special('The Flash: Rebirth',2016)],range('The Flash',2016,1,8,2016)),priority:'core',legacyIds:['rb-1-fl']}),
  entry({id:'rb-flash-speed-darkness',routeId:'flash-family',phaseId:'rb-phase-2',title:'The Flash #9–13: The Speed of Darkness',year:'2016',writers:['Joshua Williamson'],artists:['Davide Gianfelice'],summary:'Barry enters the shadowy world of the Shade and confronts a darker use of speed.',issues:range('The Flash',2016,9,13,2016),priority:'core',legacyIds:['rb-2-ww']}),
  entry({id:'rb-flash-rogues-reloaded',routeId:'flash-family',phaseId:'rb-phase-3',title:'The Flash #14–20: Rogues Reloaded',year:'2017',writers:['Joshua Williamson'],artists:['Carmine Di Giandomenico','Neil Googe'],summary:'The Rogues return with a plan that forces Barry to reconsider how well he understands his oldest enemies.',issues:range('The Flash',2016,14,20,2017),priority:'core',legacyIds:['rb-3-jl','rb-4-ww']}),
  entry({id:'rb-flash-color-fear',routeId:'flash-family',phaseId:'rb-phase-5',title:'The Flash #23–27: The Color of Fear',year:'2017',writers:['Joshua Williamson'],artists:['Howard Porter'],summary:'Barry’s emotional isolation draws him into a conflict with Reverse-Flash and the Negative Speed Force.',issues:range('The Flash',2016,23,27,2017),priority:'core',legacyIds:['rb-5-ww']}),
  entry({id:'rb-flash-negative',routeId:'flash-family',phaseId:'rb-phase-5',title:'The Flash #28–32: Negative',year:'2017',writers:['Joshua Williamson'],artists:['Carmine Di Giandomenico'],summary:'Barry struggles with corrupted speed and the damage his secrecy causes.',issues:range('The Flash',2016,28,32,2017),priority:'important',legacyIds:['rb-5-ww']})
];

export const routeData = route({id:'flash-family',title:'Flash Family',shortTitle:'Flash Family',icon:'⚡',accent:'gold',description:'Barry Allen’s Rebirth run and the mysteries connecting Wally’s return to the larger universe.',blocks:[
  routeBlock({id:'rb-flash-open',title:'Lightning Returns',year:'2016',mode:'sequential',steps:['rb-flash-lightning-strikes','rb-flash-speed-darkness','rb-flash-rogues-reloaded']}),
  routeBlock({id:'rb-flash-button',title:'The Button',year:'2017',mode:'strict',steps:['the-button']}),
  routeBlock({id:'rb-flash-road-metal',title:'Negative Speed',year:'2017',mode:'sequential',steps:['rb-flash-color-fear','rb-flash-negative']}),
  routeBlock({id:'rb-flash-metal',title:'Dark Nights: Metal',year:'2017–2018',mode:'strict',steps:['dark-nights-metal']})
]});
