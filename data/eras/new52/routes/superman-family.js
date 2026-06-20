import { annual, combine, entry, issue, range, route, routeBlock } from '../helpers.js';

export const entries = [
  entry({id:'morrison-action-a',routeId:'superman-family',phaseId:'n52-phase-1',title:'Action Comics #1–12',year:'2011–2012',summary:'Grant Morrison begins Superman’s early New 52 career as a rough-edged champion of ordinary people.',issues:range('Action Comics',2011,1,12,2012),priority:'essential',legacyIds:['n52-1-sp1']}),
  entry({id:'morrison-action-zero',routeId:'superman-family',phaseId:'n52-phase-2',title:'Action Comics #0 and Annual #1',year:'2012',summary:'Two important side chapters inside Morrison’s complete run.',issues:[issue('Action Comics',2011,0,2012),annual('Action Comics',2011,1,2012)],priority:'essential',legacyIds:['n52-2-sp1-part-1']}),
  entry({id:'morrison-action-b',routeId:'superman-family',phaseId:'n52-phase-3',title:'Action Comics #13–18',year:'2012–2013',summary:'Morrison’s Superman saga expands into its cosmic conclusion.',issues:range('Action Comics',2011,13,18,2013),priority:'essential',legacyIds:['n52-2-sp1-part-1']}),
  entry({id:'supergirl-opening-a',routeId:'superman-family',phaseId:'n52-phase-1',title:'Supergirl #1–12',year:'2011–2012',summary:'Kara arrives angry, isolated and unsure whether Earth deserves her trust.',issues:range('Supergirl',2011,1,12,2012),priority:'recommended'}),
  entry({id:'supergirl-zero',routeId:'superman-family',phaseId:'n52-phase-2',title:'Supergirl #0',year:'2012',summary:'A Krypton-set origin chapter placed after the opening twelve issues.',issues:[issue('Supergirl',2011,0,2012)],priority:'recommended'}),
  entry({id:'hel-leadins',routeId:'superman-family',phaseId:'n52-phase-2',title:'Supergirl #13 and Superboy #13',year:'2012',summary:'The two lead-ins that position Kara and Kon before H’El on Earth.',issues:[issue('Supergirl',2011,13,2012),issue('Superboy',2011,13,2012)],priority:'important'}),
  entry({id:'supergirl-post-hel',routeId:'superman-family',phaseId:'n52-phase-3',title:'Supergirl #18–24',year:'2013',summary:'Kara faces the emotional and cosmic consequences of H’El’s deception.',issues:range('Supergirl',2011,18,24,2013),priority:'recommended'}),
  entry({id:'superman-unchained',routeId:'superman-family',phaseId:'n52-phase-3',title:'Superman Unchained #1–9',year:'2013–2014',summary:'Scott Snyder and Jim Lee deliver a self-contained blockbuster about power, secrecy and state control.',issues:range('Superman Unchained',2013,1,9,2014),priority:'recommended'}),
  entry({id:'cyborg-superman',routeId:'superman-family',phaseId:'n52-phase-3',title:'Action Comics #23.1: Cyborg Superman',year:'2013',summary:'A Supergirl-linked chapter establishing the New 52 Cyborg Superman.',issues:[issue('Action Comics',2011,'23.1',2013)],priority:'recommended'}),
  entry({id:'pak-action-opening',routeId:'superman-family',phaseId:'n52-phase-4',title:'Action Comics #25–29 and Secret Origins #1',year:'2013–2014',summary:'Greg Pak and Aaron Kuder begin the strongest post-Morrison Action Comics material.',issues:combine(range('Action Comics',2011,25,29,2014),[issue('Secret Origins',2014,1,2014)]),priority:'highly-recommended'}),
  entry({id:'smww-opening',routeId:'superman-family',phaseId:'n52-phase-4',title:'Superman/Wonder Woman #1–6',year:'2013–2014',summary:'Charles Soule explores Clark and Diana’s relationship through major superhero threats.',issues:range('Superman/Wonder Woman',2013,1,6,2014),priority:'recommended'}),
  entry({id:'action-under-skin',routeId:'superman-family',phaseId:'n52-phase-5',title:'Action Comics #36–40',year:'2014–2015',summary:'Pak and Kuder deliver the excellent Smallville horror story Under the Skin.',issues:range('Action Comics',2011,36,40,2015),priority:'highly-recommended'}),
  entry({id:'men-tomorrow',routeId:'superman-family',phaseId:'n52-phase-5',title:'Superman #32–39: The Men of Tomorrow',year:'2014–2015',summary:'Geoff Johns introduces Ulysses in the strongest selected block from the main Superman title.',issues:range('Superman',2011,32,39,2015),priority:'recommended'}),
  entry({id:'smww-casualties',routeId:'superman-family',phaseId:'n52-phase-5',title:'Superman/Wonder Woman #13–17',year:'2014–2015',summary:'A worthwhile later relationship arc after Superman: Doomed.',issues:range('Superman/Wonder Woman',2013,13,17,2015),priority:'recommended'}),
  entry({id:'supergirl-crucible',routeId:'superman-family',phaseId:'n52-phase-5',title:'Supergirl #36–40',year:'2014–2015',summary:'Crucible closes Kara’s New 52 solo series.',issues:range('Supergirl',2011,36,40,2015),priority:'recommended'}),
  entry({id:'action-truth-selected',routeId:'superman-family',phaseId:'n52-phase-6',title:'Action Comics #41–47',year:'2015',summary:'The worthwhile Pak and Kuder portion of the Truth status quo.',issues:range('Action Comics',2011,41,47,2015),priority:'recommended'}),
  entry({id:'lois-clark',routeId:'superman-family',phaseId:'n52-phase-6',title:'Superman: Lois and Clark #1–8',year:'2015–2016',summary:'The married pre-Flashpoint Clark and Lois secretly raise Jon inside the New 52 universe.',issues:range('Superman: Lois and Clark',2015,1,8,2016),priority:'essential'}),
  entry({id:'truth-summary',routeId:'superman-family',phaseId:'n52-phase-6',title:'Truth and Savage Dawn Summary',year:'2015–2016',summary:'Clark’s identity becomes public, his powers weaken and his health deteriorates.',issues:[],priority:'summary',note:'The full Truth and Savage Dawn crossovers are intentionally omitted.'})
];

export const routeData = route({
  id:'superman-family',title:'Superman Family Route',shortTitle:'Superman Family',icon:'◇',accent:'orange',description:'Morrison’s complete Action Comics, selected strong Superman material, Supergirl and Superman/Wonder Woman.',
  blocks:[
    routeBlock({id:'superman-foundations',title:'Superman and Supergirl Foundations',year:'2011–2012',mode:'parallel',steps:['morrison-action-a','supergirl-opening-a']}),
    routeBlock({id:'zero-and-hel-setup',title:'Zero Month and H’El Setup',year:'2012',mode:'sequential',steps:['morrison-action-zero','supergirl-zero','hel-leadins']}),
    routeBlock({id:'hel-block',title:'H’El on Earth',year:'2012–2013',mode:'strict',steps:['hel-on-earth']}),
    routeBlock({id:'after-hel',title:'After H’El',year:'2013–2014',mode:'parallel',steps:['morrison-action-b','supergirl-post-hel','superman-unchained','cyborg-superman']}),
    routeBlock({id:'krypton-block',title:'Krypton Returns',year:'2013',mode:'strict',steps:['krypton-returns']}),
    routeBlock({id:'new-creative-runs',title:'New Creative Runs',year:'2013–2014',mode:'parallel',steps:['pak-action-opening','smww-opening']}),
    routeBlock({id:'red-daughter-superman',title:'Red Daughter of Krypton',year:'2014',mode:'strict',steps:['red-daughter-of-krypton']}),
    routeBlock({id:'doomed-block',title:'Superman: Doomed',year:'2014',mode:'strict',steps:['superman-doomed']}),
    routeBlock({id:'later-superman',title:'Strong Later Superman Blocks',year:'2014–2015',mode:'parallel',steps:['action-under-skin','men-tomorrow','smww-casualties','supergirl-crucible']}),
    routeBlock({id:'dc-you-superman',title:'DC You and the Other Superman',year:'2015–2016',mode:'parallel',steps:['action-truth-selected','convergence-anchor','lois-clark','truth-summary']}),
    routeBlock({id:'final-days-block',title:'The Final Days of Superman',year:'2016',mode:'strict',steps:['final-days-of-superman']})
  ]
});
