import { STANDARD_ROUTES, resolveStandardRoute } from '../../shared/modern-route-config.js';

export const config = {
  id:'if-dc',
  label:'Infinite Frontier → Dark Crisis',
  title:'Infinite Frontier to Dark Crisis',
  subtitle:'The Omniverse opens and the Justice League falls',
  dates:'March 2021 – January 2023',
  description:'The restored Omniverse expands through Infinite Frontier and Justice League Incarnate while Gotham, Warworld and the Amazons build toward Dark Crisis.',
  asOf:'2023-01-10',
  routes:STANDARD_ROUTES,
  resolveRoute:resolveStandardRoute,
  seriesAliases:{
    'Detective':'Detective Comics','Action':'Action Comics','GL':'Green Lantern',
    'Batman: Fear State: Alpha':'Batman: Fear State Alpha','Batman: Fear State: Omega':'Batman: Fear State Omega'
  },
  seriesYears:{
    'Infinite Frontier':2021,'Infinite Frontier: Secret Files':2021,'Batman':2016,'Detective Comics':1937,'Nightwing':2016,'Robin':2021,
    'Joker':2021,'Harley Quinn':2021,'Catwoman':2018,'Action Comics':1938,'Superman: Son of Kal-El':2021,'Supergirl: Woman of Tomorrow':2021,
    'Green Lantern':2021,'Justice League':2018,'Wonder Woman':2016,'The Flash':2016,'Batman: Fear State Alpha':2021,
    'Batman: Fear State Omega':2021,'Justice League Incarnate':2021,'I Am Batman':2021,'Trial of the Amazons':2022,
    'Nubia & the Amazons':2021,'Wonder Girl':2021,'Deathstroke Inc.':2021,'Shadow War: Alpha':2022,'Shadow War: Omega':2022,
    'Aquamen':2022,'War for Earth-3':2022,'Flashpoint Beyond':2022,'Justice League: Road to Dark Crisis':2022,
    'Dark Crisis on Infinite Earths':2022,'Dark Crisis: Young Justice':2022,'Dark Crisis: Worlds Without a Justice League':2022,
    'Dark Crisis: The Deadly Green':2022,'Dark Crisis: The Dark Army':2022,'Dark Crisis: War Zone':2022,'Dark Crisis: Big Bang':2022
  },
  creatorRules:[
    {test:/Infinite Frontier|Justice League Incarnate/,writers:['Joshua Williamson']},{test:/Batman #106|Batman #112|Batman #118|Batman #122/,writers:['James Tynion IV','Joshua Williamson']},
    {test:/Detective/,writers:['Mariko Tamaki']},{test:/Nightwing/,writers:['Tom Taylor']},{test:/Robin/,writers:['Joshua Williamson']},
    {test:/Action Comics/,writers:['Phillip Kennedy Johnson']},{test:/Superman: Son of Kal-El/,writers:['Tom Taylor']},{test:/Supergirl: Woman of Tomorrow/,writers:['Tom King']},
    {test:/Wonder Woman|Trial of the Amazons|Nubia/,writers:['Becky Cloonan','Michael W. Conrad']},{test:/The Flash/,writers:['Jeremy Adams']},
    {test:/Dark Crisis/,writers:['Joshua Williamson']},{test:/Flashpoint Beyond/,writers:['Geoff Johns','Jeremy Adams','Tim Sheridan']}
  ],
  events:[
    {id:'infinite-frontier-launch',title:'Infinite Frontier',year:'2021',type:'major-crossover',phaseId:'if-b1',architect:'Joshua Williamson',summary:'The heroes investigate the newly opened Omniverse and Darkseid’s return.',sourceItemIds:['if-1-s1','if-1-s2'],optionalSourceItemIds:['if-1-secret'],routeIds:['universe-spine'],next:'Continue Infinite Frontier #3–6 in the next phase.'},
    {id:'fear-state',title:'Fear State',year:'2021',type:'major-crossover',phaseId:'if-b2',architect:'James Tynion IV',summary:'Scarecrow and the Magistrate turn Gotham into a city ruled by fear and surveillance.',sourceItemIds:['if-2-s1','if-2-s2','if-2-s3-part-1','if-2-s3-part-2','if-2-s3-part-3','if-2-s4'],routeIds:['bat-family'],next:'Continue the Gotham books after Fear State Omega.'},
    {id:'infinite-frontier-finale',title:'Infinite Frontier Finale',year:'2021',type:'hard-gate',phaseId:'if-b2',architect:'Joshua Williamson',summary:'The Infinite Frontier mystery concludes and launches the multiversal Justice League Incarnate.',sourceItemIds:['if-2-s5','if-2-s6'],routeIds:['universe-spine'],next:'Continue Justice League Incarnate #2–5.'},
    {id:'justice-league-incarnate',title:'Justice League Incarnate',year:'2021–2022',type:'major-crossover',phaseId:'if-b3',architect:'Joshua Williamson and Dennis Culver',summary:'A multiversal League races against Darkseid and the Great Darkness.',sourceItemIds:['if-3-s1'],routeIds:['universe-spine'],next:'The Great Darkness thread continues toward Dark Crisis.'},
    {id:'trial-of-the-amazons',title:'Trial of the Amazons',year:'2022',type:'lane-gate',phaseId:'if-b3',architect:'Becky Cloonan, Michael W. Conrad, Vita Ayala and Joëlle Jones',summary:'The Amazon tribes gather for a contest that becomes a murder mystery and a fight for their future.',sourceItemIds:['if-3-trial-part-1','if-3-trial-part-2','if-3-trial-part-3','if-3-trial-part-4','if-3-trial-part-5','if-3-trial-part-6'],routeIds:['wonder-woman-amazons','titans-young-heroes'],next:'Continue Wonder Woman and Nubia after Trial of the Amazons #2.'},
    {id:'shadow-war',title:'Shadow War',year:'2022',type:'major-crossover',phaseId:'if-b4',architect:'Joshua Williamson',summary:'Ra’s al Ghul’s apparent assassination throws Batman, Robin and Deathstroke into a global conflict.',sourceItemIds:['if-4-s1','if-4-s2-part-1','if-4-s2-part-2','if-4-s2-part-3','if-4-s3'],routeIds:['bat-family','titans-young-heroes','extra-heroes'],next:'Continue Robin and Deathstroke Inc. after Shadow War Omega.'},
    {id:'death-of-the-justice-league',title:'The Death of the Justice League',year:'2022',type:'soft-anchor',phaseId:'if-b4',architect:'Joshua Williamson',summary:'The League confronts the Great Darkness and the DC Universe loses its central team.',sourceItemIds:['if-4-s5'],routeIds:['universe-spine'],next:'Read Road to Dark Crisis, then begin Dark Crisis on Infinite Earths.'},
    {id:'dark-crisis',title:'Dark Crisis on Infinite Earths',year:'2022',type:'hard-gate',phaseId:'if-b5',architect:'Joshua Williamson',summary:'The next generation protects Earth while Pariah attempts to restore the original infinite Multiverse.',sourceItemIds:['if-5-s1','if-5-s2'],optionalSourceItemIds:['if-5-s3','if-5-s4','if-5-green'],routeIds:['universe-spine','titans-young-heroes','green-lantern-corps','dark-supernatural'],next:'Continue into Lazarus Planet and Dawn of DC.'}
  ]
};
