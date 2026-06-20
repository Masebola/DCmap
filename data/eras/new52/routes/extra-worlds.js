import { annual, combine, entry, issue, range, route, routeBlock, special } from '../helpers.js';

export const entries = [
  entry({id:'earth2-a',routeId:'extra-worlds',phaseId:'n52-phase-1',title:'Earth 2 #1–6',year:'2012',summary:'Jay Garrick, Alan Scott and Hawkgirl begin a bold new world of Wonders.',issues:range('Earth 2',2012,1,6,2012),priority:'recommended'}),
  entry({id:'earth2-zero',routeId:'extra-worlds',phaseId:'n52-phase-2',title:'Earth 2 #0',year:'2012',summary:'A background chapter placed after the opening arc.',issues:[issue('Earth 2',2012,0,2012)],priority:'recommended'}),
  entry({id:'earth2-b',routeId:'extra-worlds',phaseId:'n52-phase-2',title:'Earth 2 #7–16 and Annual #1',year:'2012–2013',summary:'The Wonders assemble as the world’s mythology expands.',issues:combine(range('Earth 2',2012,7,16,2013),[annual('Earth 2',2012,1,2013)]),priority:'recommended'}),
  entry({id:'earth2-c',routeId:'extra-worlds',phaseId:'n52-phase-4',title:'Earth 2 #17–20 and Annual #2',year:'2013–2014',summary:'Tom Taylor begins the darker war-driven phase.',issues:combine(range('Earth 2',2012,17,20,2014),[annual('Earth 2',2012,2,2014)]),priority:'recommended'}),
  entry({id:'earth2-d',routeId:'extra-worlds',phaseId:'n52-phase-4',title:'Earth 2 #21–26',year:'2014',summary:'Val-Zod enters before the route reaches its clean stopping point.',issues:range('Earth 2',2012,21,26,2014),priority:'recommended',stop:'Stop after #26; skip World’s End and Earth 2: Society.'}),

  entry({id:'western-a',routeId:'extra-worlds',phaseId:'n52-phase-1',title:'All-Star Western #1–12',year:'2011–2012',summary:'Jonah Hex and Amadeus Arkham investigate nineteenth-century Gotham.',issues:range('All-Star Western',2011,1,12,2012),priority:'recommended'}),
  entry({id:'western-zero',routeId:'extra-worlds',phaseId:'n52-phase-2',title:'All-Star Western #0',year:'2012',summary:'A Jonah Hex origin chapter placed after the opening year.',issues:[issue('All-Star Western',2011,0,2012)],priority:'recommended'}),
  entry({id:'western-b',routeId:'extra-worlds',phaseId:'n52-phase-2',title:'All-Star Western #13–21',year:'2012–2013',summary:'Hex’s historical adventures continue beyond Gotham.',issues:range('All-Star Western',2011,13,21,2013),priority:'recommended'}),
  entry({id:'western-c',routeId:'extra-worlds',phaseId:'n52-phase-4',title:'All-Star Western #22–28',year:'2013–2014',summary:'Hex is thrown into the modern DC Universe.',issues:range('All-Star Western',2011,22,28,2014),priority:'recommended'}),
  entry({id:'western-d',routeId:'extra-worlds',phaseId:'n52-phase-5',title:'All-Star Western #29–34',year:'2014',summary:'The series returns Hex to the Old West for its conclusion.',issues:range('All-Star Western',2011,29,34,2014),priority:'recommended'}),

  entry({id:'beyond-hush',routeId:'extra-worlds',phaseId:'n52-phase-1',title:'Batman Beyond: Hush Beyond #1–6',year:'2010–2011',summary:'Terry McGinnis begins the recommended animated-continuity route.',issues:range('Batman Beyond: Hush Beyond',2010,1,6,2011),priority:'recommended'}),
  entry({id:'beyond-2011',routeId:'extra-worlds',phaseId:'n52-phase-1',title:'Batman Beyond (2011) #1–8',year:'2011',summary:'Terry’s next compact ongoing series.',issues:range('Batman Beyond',2011,1,8,2011),priority:'recommended'}),
  entry({id:'beyond-unlimited',routeId:'extra-worlds',phaseId:'n52-phase-2',title:'Batman Beyond Unlimited #1–18',year:'2012–2013',summary:'Batman, Superman and Justice League Beyond share one expanded future line.',issues:range('Batman Beyond Unlimited',2012,1,18,2013),priority:'recommended'}),
  entry({id:'beyond-universe',routeId:'extra-worlds',phaseId:'n52-phase-4',title:'Batman Beyond Universe #1–16',year:'2013–2014',summary:'Kyle Higgins’ Batman Beyond 2.0 and Justice League Beyond 2.0 material.',issues:range('Batman Beyond Universe',2013,1,16,2014),priority:'recommended'}),

  entry({id:'multiversity',routeId:'extra-worlds',phaseId:'n52-phase-5',title:'The Multiversity',year:'2014–2015',summary:'Grant Morrison maps the DC Multiverse through interconnected worlds, genres and metafiction.',issues:[issue('The Multiversity',2014,1,2014),special('The Multiversity: The Society of Super-Heroes',2014),special('The Multiversity: The Just',2014),special('The Multiversity: Pax Americana',2014),special('The Multiversity: Thunderworld Adventures',2014),special('The Multiversity Guidebook',2015),special('The Multiversity: Mastermen',2015),special('The Multiversity: Ultra Comics',2015),issue('The Multiversity',2014,2,2015)],priority:'highly-recommended'}),
  entry({id:'omega-men-extra-note',routeId:'extra-worlds',phaseId:'n52-phase-5',title:'Omega Men cross-route note',year:'2015–2016',summary:'The Omega Men is tracked in the Green Lantern lane because Kyle Rayner is the central connection.',issues:[],priority:'note'})
];

export const routeData = route({
  id:'extra-worlds',title:'Extra Worlds and Standalones',shortTitle:'Extra Worlds',icon:'∞',accent:'teal',description:'Alternate worlds, westerns, Multiversity and standalone gems that do not obey the main continuity gates.',
  blocks:[
    routeBlock({id:'earth2-route',title:'Earth 2',year:'2012–2014',mode:'sequential',steps:['earth2-a','earth2-zero','earth2-b','earth2-c','earth2-d']}),
    routeBlock({id:'western-route',title:'All-Star Western',year:'2011–2014',mode:'sequential',steps:['western-a','western-zero','western-b','western-c','western-d']}),
    routeBlock({id:'beyond-route',title:'Batman Beyond Animated Continuity',year:'2010–2014',mode:'sequential',steps:['beyond-hush','beyond-2011','beyond-unlimited','beyond-universe']}),
    routeBlock({id:'multiverse-route',title:'Multiverse and Cosmic Standalones',year:'2014–2016',mode:'parallel',steps:['multiversity','omega-men-extra-note']})
  ]
});
