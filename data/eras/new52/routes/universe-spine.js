import { annual, combine, entry, issue, issues, range, route, routeBlock } from '../helpers.js';

const shazamBackup = number => issue('Justice League: Shazam Backup',2011,number,number <= 11 ? 2012 : 2013,{kind:'backup'});

export const entries = [
  entry({id:'jl-origin',routeId:'universe-spine',phaseId:'n52-phase-1',title:'Justice League #1–6: Origin',year:'2011–2012',summary:'The League forms during Darkseid’s first invasion.',issues:range('Justice League',2011,1,6,2012),priority:'essential',legacyIds:['n52-1-s1','n52-1-jl1']}),
  entry({id:'jl-villains-journey',routeId:'universe-spine',phaseId:'n52-phase-1',title:'Justice League #7–12: The Villain’s Journey',year:'2012',summary:'The modern-day League struggles with public pressure and internal fractures.',issues:range('Justice League',2011,7,12,2012),priority:'essential'}),
  entry({id:'jl-cheetah',routeId:'universe-spine',phaseId:'n52-phase-2',title:'Justice League #13–14',year:'2012',summary:'The Cheetah story positions the League immediately before Throne of Atlantis.',issues:range('Justice League',2011,13,14,2012),priority:'important'}),
  entry({id:'aquaman-trench',routeId:'universe-spine',phaseId:'n52-phase-1',title:'Aquaman #1–6: The Trench',year:'2011–2012',summary:'Arthur and Mera confront a nightmare rising from the ocean floor.',issues:range('Aquaman',2011,1,6,2012),priority:'essential'}),
  entry({id:'aquaman-others-opening',routeId:'universe-spine',phaseId:'n52-phase-1',title:'Aquaman #7–13: The Others',year:'2012',summary:'Black Manta exposes Arthur’s hidden past and his former team.',issues:range('Aquaman',2011,7,13,2012),priority:'essential'}),
  entry({id:'aquaman-zero',routeId:'universe-spine',phaseId:'n52-phase-2',title:'Aquaman #0',year:'2012',summary:'Arthur’s early journey into Atlantis leads directly toward Throne of Atlantis.',issues:[issue('Aquaman',2011,0,2012)],priority:'essential'}),
  entry({id:'shazam-origin',routeId:'universe-spine',phaseId:'n52-phase-2',title:'Shazam! Origins',year:'2012–2013',summary:'Read the Billy Batson backup chapters in their own sequence, ending with full-length Justice League #21.',issues:combine([7,8,9,10,11].map(shazamBackup),[issue('Justice League',2011,0,2012)],[14,15,16,18,19,20].map(shazamBackup),[issue('Justice League',2011,21,2013)]),priority:'recommended',tags:['backup-story']}),
  entry({id:'jl-recruitment',routeId:'universe-spine',phaseId:'n52-phase-3',title:'Justice League #18–20',year:'2013',summary:'The League recruits new members while hidden sabotage grows.',issues:range('Justice League',2011,18,20,2013),priority:'essential'}),
  entry({id:'jla-road-trinity',routeId:'universe-spine',phaseId:'n52-phase-3',title:'Justice League of America #1–5',year:'2013',summary:'Amanda Waller and Steve Trevor build a government-controlled counter-League.',issues:range('Justice League of America',2013,1,5,2013),priority:'essential'}),
  entry({id:'aquaman-death-king',routeId:'universe-spine',phaseId:'n52-phase-3',title:'Aquaman: Death of a King',year:'2013',summary:'Arthur faces the political and historical consequences of the war with Atlantis.',issues:combine(range('Aquaman',2011,18,19,2013),range('Aquaman',2011,21,25,2013)),priority:'essential'}),
  entry({id:'aquaman-others',routeId:'universe-spine',phaseId:'n52-phase-3',title:'Aquaman and the Others',year:'2013–2015',summary:'An optional but worthwhile expansion of Arthur’s former team.',issues:combine([issue('Aquaman',2011,20,2013),annual('Aquaman',2011,1,2013)],range('Aquaman and the Others',2014,1,11,2015)),priority:'optional'}),
  entry({id:'aquaman-parker-a',routeId:'universe-spine',phaseId:'n52-phase-4',title:'Aquaman #26–31 and Annual #2',year:'2014',summary:'Jeff Parker begins a strong continuation and reaches the Swamp Thing crossover.',issues:combine(range('Aquaman',2011,26,31,2014),[annual('Aquaman',2011,2,2014)]),priority:'recommended'}),
  entry({id:'aquaman-swamp-crossover',routeId:'universe-spine',phaseId:'n52-phase-4',title:'Swamp Thing #32',year:'2014',summary:'The second half of the conflict begun in Aquaman #31.',issues:[issue('Swamp Thing',2011,32,2014)],priority:'recommended'}),
  entry({id:'aquaman-parker-b',routeId:'universe-spine',phaseId:'n52-phase-4',title:'Aquaman #32–40 and Secret Origins',year:'2014–2015',summary:'Chimera and Maelstrom deepen Arthur and Mera’s histories.',issues:combine(range('Aquaman',2011,32,40,2015),[issue('Secret Origins',2014,2,2014),issue('Secret Origins',2014,5,2014)]),priority:'recommended'}),
  entry({id:'jl-injustice-league',routeId:'universe-spine',phaseId:'n52-phase-5',title:'Justice League #30–39',year:'2014–2015',summary:'Lex Luthor joins the League and Jessica Cruz enters the story.',issues:range('Justice League',2011,30,39,2015),priority:'essential'}),
  entry({id:'aquaman-abnett-bridge',routeId:'universe-spine',phaseId:'n52-phase-8',title:'Aquaman #49–52: Out of Darkness',year:'2016',summary:'Dan Abnett repositions Arthur and Mera for Rebirth.',issues:range('Aquaman',2011,49,52,2016),priority:'important'})
];

export const routeData = route({
  id:'universe-spine',title:'Universe Spine',shortTitle:'Justice League & Aquaman',icon:'◆',accent:'crimson',description:'The central Justice League and Aquaman lane, anchored by the line-wide events.',
  blocks:[
    routeBlock({id:'universe-open',title:'Justice League and Aquaman Foundations',year:'2011–2012',mode:'parallel',description:'Read the Justice League and Aquaman books independently before their first crossover.',steps:['jl-origin','jl-villains-journey','aquaman-trench','aquaman-others-opening']}),
    routeBlock({id:'atlantis-setup',title:'Before Throne of Atlantis',year:'2012',mode:'parallel',steps:['jl-cheetah','aquaman-zero','shazam-origin']}),
    routeBlock({id:'throne-block',title:'Throne of Atlantis',year:'2012–2013',mode:'strict',steps:['throne-of-atlantis']}),
    routeBlock({id:'trinity-road',title:'Road to Trinity War',year:'2013',mode:'parallel',steps:['jl-recruitment','jla-road-trinity','aquaman-death-king','aquaman-others']}),
    routeBlock({id:'trinity-block',title:'Trinity War',year:'2013',mode:'strict',steps:['trinity-war']}),
    routeBlock({id:'forever-block',title:'Forever Evil',year:'2013–2014',mode:'strict',steps:['forever-evil']}),
    routeBlock({id:'post-forever-universe',title:'After Forever Evil',year:'2014–2015',mode:'parallel',steps:['aquaman-parker-a','aquaman-swamp-crossover','aquaman-parker-b','jl-injustice-league']}),
    routeBlock({id:'darkseid-block',title:'Darkseid War',year:'2015–2016',mode:'strict',steps:['darkseid-war']}),
    routeBlock({id:'aquaman-final',title:'Aquaman’s Rebirth Bridge',year:'2016',mode:'sequential',steps:['aquaman-abnett-bridge']})
  ]
});
