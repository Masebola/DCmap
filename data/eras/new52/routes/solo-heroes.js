import { annual, combine, entry, issue, range, route, routeBlock } from '../helpers.js';

export const entries = [
  entry({id:'ww-blood',routeId:'solo-heroes',phaseId:'n52-phase-1',title:'Wonder Woman #1–6: Blood',year:'2011–2012',summary:'Diana enters a dangerous new conflict within the Olympian family.',issues:range('Wonder Woman',2011,1,6,2012),priority:'essential'}),
  entry({id:'ww-guts',routeId:'solo-heroes',phaseId:'n52-phase-1',title:'Wonder Woman #7–12: Guts',year:'2012',summary:'The Olympian family struggle widens and Diana’s world changes sharply.',issues:range('Wonder Woman',2011,7,12,2012),priority:'essential'}),
  entry({id:'ww-zero',routeId:'solo-heroes',phaseId:'n52-phase-2',title:'Wonder Woman #0',year:'2012',summary:'A younger Diana story placed after the first twelve issues.',issues:[issue('Wonder Woman',2011,0,2012)],priority:'essential'}),
  entry({id:'ww-iron',routeId:'solo-heroes',phaseId:'n52-phase-2',title:'Wonder Woman #13–18: Iron',year:'2012–2013',summary:'Diana’s mission grows into a larger war among the gods.',issues:range('Wonder Woman',2011,13,18,2013),priority:'essential'}),
  entry({id:'ww-war',routeId:'solo-heroes',phaseId:'n52-phase-3',title:'Wonder Woman #19–23: War',year:'2013',summary:'The First Born conflict moves to the centre of the saga.',issues:range('Wonder Woman',2011,19,23,2013),priority:'essential'}),
  entry({id:'ww-first-born',routeId:'solo-heroes',phaseId:'n52-phase-3',title:'Wonder Woman #23.2: First Born',year:'2013',summary:'The villain-focused special expands the First Born’s history.',issues:[issue('Wonder Woman',2011,'23.2',2013)],priority:'essential'}),
  entry({id:'ww-flesh',routeId:'solo-heroes',phaseId:'n52-phase-4',title:'Wonder Woman #24–29: Flesh',year:'2013–2014',summary:'Diana’s found family prepares for the final Olympian war.',issues:range('Wonder Woman',2011,24,29,2014),priority:'essential'}),
  entry({id:'ww-bones',routeId:'solo-heroes',phaseId:'n52-phase-4',title:'Wonder Woman #30–35: Bones',year:'2014',summary:'Azzarello and Chiang bring their complete mythological epic to its conclusion.',issues:range('Wonder Woman',2011,30,35,2014),priority:'essential',stop:'Stop the solo route after #35.'}),
  entry({id:'ww-secret-origin',routeId:'solo-heroes',phaseId:'n52-phase-4',title:'Secret Origins #6: Wonder Woman story',year:'2014',summary:'A short final companion to the complete Azzarello era.',issues:[issue('Secret Origins',2014,6,2014)],priority:'recommended'}),

  entry({id:'flash-move-forward',routeId:'solo-heroes',phaseId:'n52-phase-1',title:'The Flash #1–8: Move Forward',year:'2011–2012',summary:'Barry faces Mob Rule as the New 52 Speed Force mythology begins.',issues:range('The Flash',2011,1,8,2012),priority:'recommended'}),
  entry({id:'flash-rogues-revolution',routeId:'solo-heroes',phaseId:'n52-phase-1',title:'The Flash #9–12',year:'2012',summary:'The New 52 Rogues take centre stage.',issues:range('The Flash',2011,9,12,2012),priority:'recommended'}),
  entry({id:'flash-zero-annual',routeId:'solo-heroes',phaseId:'n52-phase-2',title:'The Flash #0 and Annual #1',year:'2012',summary:'Barry’s origin chapter and the Rogues setup belong here.',issues:[issue('The Flash',2011,0,2012),annual('The Flash',2011,1,2012)],priority:'recommended'}),
  entry({id:'flash-gorilla',routeId:'solo-heroes',phaseId:'n52-phase-2',title:'The Flash #13–19: Gorilla Warfare',year:'2012–2013',summary:'Grodd invades Central City as the Rogues storyline continues.',issues:range('The Flash',2011,13,19,2013),priority:'recommended'}),
  entry({id:'flash-reverse-a',routeId:'solo-heroes',phaseId:'n52-phase-3',title:'The Flash #20–23',year:'2013',summary:'The Reverse-Flash mystery begins.',issues:range('The Flash',2011,20,23,2013),priority:'recommended'}),
  entry({id:'flash-reverse-special',routeId:'solo-heroes',phaseId:'n52-phase-3',title:'The Flash #23.2: Reverse-Flash',year:'2013',summary:'A villain special placed before the arc’s conclusion.',issues:[issue('The Flash',2011,'23.2',2013)],priority:'recommended'}),
  entry({id:'flash-reverse-b',routeId:'solo-heroes',phaseId:'n52-phase-3',title:'The Flash #24–25',year:'2013',summary:'The Reverse arc concludes, followed by the Zero Year flashback.',issues:range('The Flash',2011,24,25,2013),priority:'recommended'}),
  entry({id:'flash-history',routeId:'solo-heroes',phaseId:'n52-phase-4',title:'The Flash #26–29 and Annual #2',year:'2014',summary:'The final recommended Buccellato material closes this curated Flash route.',issues:combine(range('The Flash',2011,26,29,2014),[annual('The Flash',2011,2,2014)]),priority:'recommended',stop:'Stop after #29 and Annual #2.'}),

  entry({id:'green-arrow-kill-machine',routeId:'solo-heroes',phaseId:'n52-phase-4',title:'Green Arrow #17–24: The Kill Machine',year:'2013',summary:'Lemire and Sorrentino rebuild Oliver’s world around Komodo and the island’s secrets.',issues:range('Green Arrow',2011,17,24,2013),priority:'highly-recommended'}),
  entry({id:'green-arrow-outsiders',routeId:'solo-heroes',phaseId:'n52-phase-4',title:'Green Arrow #25–34 and Secret Origins #4',year:'2013–2014',summary:'Zero Year, the Outsiders War and the run’s conclusion.',issues:combine(range('Green Arrow',2011,25,34,2014),[issue('Secret Origins',2014,4,2014)]),priority:'highly-recommended'}),
  entry({id:'martian-manhunter',routeId:'solo-heroes',phaseId:'n52-phase-6',title:'Martian Manhunter #1–12',year:'2015–2016',summary:'A compact science-fiction identity thriller centred on J’onn and Mars.',issues:range('Martian Manhunter',2015,1,12,2016),priority:'recommended'}),
  entry({id:'black-canary',routeId:'solo-heroes',phaseId:'n52-phase-6',title:'Black Canary #1–12 and Gotham Academy #17',year:'2015–2016',summary:'Dinah fronts a touring band while fighting a stylish conspiracy.',issues:combine(range('Black Canary',2015,1,12,2016),[issue('Gotham Academy',2014,17,2016)]),priority:'recommended'}),
  entry({id:'prez',routeId:'solo-heroes',phaseId:'n52-phase-6',title:'Prez #1–6',year:'2015',summary:'A sharp standalone political satire about a teenager elected president.',issues:range('Prez',2015,1,6,2015),priority:'optional'})
];

export const routeData = route({
  id:'solo-heroes',title:'Solo Heroes Route',shortTitle:'Solo Heroes',icon:'★',accent:'gold',description:'Wonder Woman, Flash and selected excellent solo runs that do not need a larger family lane.',
  blocks:[
    routeBlock({id:'ww-route',title:'Wonder Woman by Azzarello and Chiang',year:'2011–2014',mode:'sequential',steps:['ww-blood','ww-guts','ww-zero','ww-iron','ww-war','ww-first-born','ww-flesh','ww-bones','ww-secret-origin']}),
    routeBlock({id:'flash-route-a',title:'The Flash by Manapul and Buccellato',year:'2011–2013',mode:'sequential',steps:['flash-move-forward','flash-rogues-revolution','flash-zero-annual','flash-gorilla','flash-reverse-a','flash-reverse-special','flash-reverse-b']}),
    routeBlock({id:'rogues-block',title:'Forever Evil: Rogues Rebellion',year:'2013–2014',mode:'strict',steps:['rogues-rebellion']}),
    routeBlock({id:'flash-route-b',title:'Finish the Recommended Flash Run',year:'2014',mode:'sequential',steps:['flash-history']}),
    routeBlock({id:'green-arrow-route',title:'Green Arrow by Lemire and Sorrentino',year:'2013–2014',mode:'sequential',steps:['green-arrow-kill-machine','green-arrow-outsiders']}),
    routeBlock({id:'dc-you-solos',title:'DC You Solo Gems',year:'2015–2016',mode:'parallel',steps:['martian-manhunter','black-canary','prez']})
  ]
});
