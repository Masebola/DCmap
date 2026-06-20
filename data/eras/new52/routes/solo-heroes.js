import { annual, combine, entry, issue, range, route } from '../helpers.js';

export const entries = [
  entry({id:'wonder-woman-azzarello',routeId:'solo-heroes',phaseId:'n52-phase-1',title:'Wonder Woman by Azzarello and Chiang',year:'2011–2014',summary:'A complete mythological epic about Diana, the Olympian family and the First Born.',issues:combine(range('Wonder Woman',2011,1,35,2014),[issue('Wonder Woman',2011,0,2012),issue('Wonder Woman',2011,'23.2',2013),issue('Secret Origins',2014,6,2014)]),priority:'essential',stop:'Stop the solo route after #35.'}),
  entry({id:'flash-manapul',routeId:'solo-heroes',phaseId:'n52-phase-1',title:'The Flash by Manapul and Buccellato',year:'2011–2014',summary:'Barry faces Mob Rule, the Rogues, Grodd and the Reverse-Flash in the strongest New 52 Flash stretch.',issues:combine(range('The Flash',2011,1,29,2014),[issue('The Flash',2011,0,2012),annual('The Flash',2011,1,2012),annual('The Flash',2011,2,2014),issue('The Flash',2011,'23.2',2013)]),priority:'recommended',stop:'Stop after #29 and Annual #2.'}),
  entry({id:'green-arrow-lemire',routeId:'solo-heroes',phaseId:'n52-phase-4',title:'Green Arrow by Lemire and Sorrentino',year:'2013–2014',summary:'Oliver’s mythology is rebuilt through the Outsiders, Komodo and the island’s hidden history.',issues:combine(range('Green Arrow',2011,17,34,2014),[issue('Secret Origins',2014,4,2014)]),priority:'highly-recommended'}),
  entry({id:'martian-manhunter',routeId:'solo-heroes',phaseId:'n52-phase-6',title:'Martian Manhunter',year:'2015–2016',summary:'A compact science-fiction identity thriller centred on J’onn and Mars.',issues:range('Martian Manhunter',2015,1,12,2016),priority:'recommended'}),
  entry({id:'black-canary',routeId:'solo-heroes',phaseId:'n52-phase-6',title:'Black Canary',year:'2015–2016',summary:'Dinah fronts a touring band while fighting a stylish conspiracy.',issues:combine(range('Black Canary',2015,1,12,2016),[issue('Gotham Academy',2014,17,2016)]),priority:'recommended'}),
  entry({id:'prez',routeId:'solo-heroes',phaseId:'n52-phase-6',title:'Prez',year:'2015',summary:'A sharp standalone political satire about a teenager elected president.',issues:range('Prez',2015,1,6,2015),priority:'optional'})
];

export const routeData = route({
  id:'solo-heroes',title:'Solo Heroes Route',shortTitle:'Solo Heroes',icon:'★',accent:'gold',description:'Wonder Woman, Flash and selected excellent solo runs that do not need a larger family lane.',
  steps:['wonder-woman-azzarello','flash-manapul','rogues-rebellion','green-arrow-lemire','martian-manhunter','black-canary','prez']
});
