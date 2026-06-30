import { combine, issue, range, special } from '../../shared/helpers.js';
import { STANDARD_ROUTES, resolveStandardRoute } from '../../shared/modern-route-config.js';

export const config = {
  id:'post-metal',
  label:'Post-Metal → Infinite Frontier',
  title:'Post-Metal to Infinite Frontier',
  subtitle:'New Justice, Year of the Villain, Death Metal and Future State',
  dates:'May 2018 – February 2021',
  description:'The broken Source Wall reshapes the Justice League line, Lex Luthor escalates the Year of the Villain, and Death Metal rebuilds the Multiverse before Future State previews possible futures.',
  asOf:'2021-02-23',
  routes:STANDARD_ROUTES,
  resolveRoute:resolveStandardRoute,
  seriesAliases:{
    'Action':'Action Comics','Detective':'Detective Comics','GL':'Green Lantern',
    'Dark Detective':'Future State: Dark Detective','Superman: Worlds of War':'Future State: Superman: Worlds of War',
    'House of El':'Future State: House of El','Immortal Wonder Woman':'Future State: Immortal Wonder Woman'
  },
  transformSeries(series,{ block }) {
    if (block?.id !== 'pm-b5') return series;
    const already = series.startsWith('Future State:');
    const candidates = ['Green Lantern','The Flash','Aquaman','Suicide Squad','Swamp Thing','Harley Quinn','Catwoman','Robin Eternal'];
    return !already && candidates.includes(series) ? `Future State: ${series}` : series;
  },
  seriesYears:{
    'Justice League: No Justice':2018,'Justice League':2018,'Aquaman/Justice League: Drowned Earth':2018,'Aquaman':2016,
    'Justice League Dark':2018,'Justice League Odyssey':2018,'Titans Special':2018,'Titans':2016,'Batman':2016,'Detective Comics':1937,'Nightwing':2016,
    'The Man of Steel':2018,'Superman':2018,'Action Comics':1938,'Heroes in Crisis':2018,'DC’s Year of the Villain Special':2019,
    'The Batman Who Laughs':2018,'The Grim Knight':2019,'Event Leviathan':2019,'The Flash':2016,'Doomsday Clock':2017,
    'Flash Forward':2019,'Batman/Superman':2019,'Year of the Villain: Hell Arisen':2019,'Leviathan Dawn':2020,
    'Dark Nights: Death Metal':2020,'Death Metal Guidebook':2020,'Legends of the Dark Knights':2020,'Death Metal: Trinity Crisis':2020,
    'Speed Metal':2020,'Multiverse’s End':2020,'Death Metal: The Secret Origin':2020,'The Last Stories of the DC Universe':2020,
    'Death Metal: The Last 52: War of the Multiverses':2020,'Death Metal: Robin King':2020,'Rise of the New God':2020,'Infinite Hour Exxxtreme!':2020,
    'Future State: The Next Batman':2021,'Future State: Dark Detective':2021,'Future State: Superman of Metropolis':2021,
    'Future State: Superman: Worlds of War':2021,'Future State: House of El':2021,'Future State: Wonder Woman':2021,
    'Future State: Immortal Wonder Woman':2021,'Future State: Justice League':2021,'Future State: Green Lantern':2021,
    'Future State: The Flash':2021,'Future State: Aquaman':2021,'Future State: Teen Titans':2021,'Future State: Suicide Squad':2021,
    'Future State: Swamp Thing':2021,'Future State: Harley Quinn':2021,'Future State: Catwoman':2021,'Future State: Robin Eternal':2021
  },
  creatorRules:[
    {test:/Justice League: No Justice|Justice League \(2018\)|Justice League #/,writers:['Scott Snyder','James Tynion IV','Joshua Williamson']},
    {test:/Justice League Dark/,writers:['James Tynion IV']},{test:/Justice League Odyssey/,writers:['Joshua Williamson','Dan Abnett']},
    {test:/Batman #/,writers:['Tom King','James Tynion IV']},{test:/Detective Comics/,writers:['Peter J. Tomasi']},{test:/Nightwing/,writers:['Benjamin Percy','Scott Lobdell','Dan Jurgens']},
    {test:/The Man of Steel|Superman \(2018\)|Action Comics/,writers:['Brian Michael Bendis']},{test:/Heroes in Crisis/,writers:['Tom King']},
    {test:/Batman Who Laughs|Grim Knight/,writers:['Scott Snyder','James Tynion IV']},{test:/The Flash/,writers:['Joshua Williamson']},
    {test:/Doomsday Clock/,writers:['Geoff Johns']},{test:/Flash Forward/,writers:['Scott Lobdell']},{test:/Batman\/Superman/,writers:['Joshua Williamson']},
    {test:/Death Metal/,writers:['Scott Snyder']},{test:/Future State: The Next Batman|Dark Detective/,writers:['John Ridley','Mariko Tamaki']}
  ],
  events:[
    {id:'no-justice',title:'Justice League: No Justice',year:'2018',type:'major-crossover',phaseId:'pm-b1',architect:'Scott Snyder, James Tynion IV and Joshua Williamson',summary:'The heroes reorganise into unlikely cosmic teams after Metal breaks the Source Wall.',sourceItemIds:['pm-1-nj'],routeIds:['universe-spine','titans-young-heroes'],next:'Continue into Justice League, Justice League Dark and Justice League Odyssey.'},
    {id:'drowned-earth',title:'Drowned Earth',year:'2018',type:'lane-gate',phaseId:'pm-b1',architect:'Scott Snyder and James Tynion IV',summary:'Sea gods flood Earth and force the Justice League and Aquaman into one ordered crisis.',chapters:[special('Aquaman/Justice League: Drowned Earth',2018),issue('Justice League',2018,10,2018),issue('Aquaman',2016,41,2018),issue('Justice League',2018,11,2018),issue('Aquaman',2016,42,2018),issue('Justice League',2018,12,2018)],sourceItemIds:['pm-1-drowned-part-1','pm-1-drowned-part-2','pm-1-drowned-part-3'],routeIds:['universe-spine','aquaman-atlantis'],next:'Return to Justice League #13 and Aquaman #43.'},
    {id:'heroes-in-crisis',title:'Heroes in Crisis',year:'2018–2019',type:'major-crossover',phaseId:'pm-b2',architect:'Tom King',summary:'A tragedy at Sanctuary exposes trauma, secrecy and distrust across the hero community.',sourceItemIds:['pm-1-hic','pm-2-hic'],routeIds:['universe-spine','titans-young-heroes','flash-family'],next:'Continue the affected character runs and Flash Forward.'},
    {id:'event-leviathan',title:'Event Leviathan',year:'2019–2020',type:'lane-gate',phaseId:'pm-b2',architect:'Brian Michael Bendis',summary:'The world’s intelligence agencies collapse as a hidden movement challenges Superman and DC’s detectives.',sourceItemIds:['pm-2-lev-part-1','pm-2-lev-part-2','pm-3-lev-part-1','pm-3-lev-part-2'],routeIds:['superman-family','bat-family','universe-spine'],next:'Return to Action Comics after Leviathan Dawn.'},
    {id:'justice-doom-war',title:'Justice/Doom War',year:'2019',type:'hard-gate',phaseId:'pm-b3',architect:'Scott Snyder and James Tynion IV',summary:'The Justice League and Legion of Doom fight across history for control of the forces shaping reality.',sourceItemIds:['pm-3-jl'],routeIds:['universe-spine'],next:'The heroes’ defeat leads toward Hell Arisen and Death Metal.'},
    {id:'doomsday-clock',title:'Doomsday Clock',year:'2017–2019',type:'major-crossover',phaseId:'pm-b3',architect:'Geoff Johns',summary:'The Watchmen mystery reaches the DC Universe and confronts Superman with the force altering its history.',sourceItemIds:['pm-3-ddc'],routeIds:['universe-spine'],next:'Treat its continuity repair as converging with Death Metal.'},
    {id:'hell-arisen',title:'Year of the Villain: Hell Arisen',year:'2019–2020',type:'major-crossover',phaseId:'pm-b3',architect:'James Tynion IV',summary:'Lex Luthor and the Batman Who Laughs battle to decide which nightmare controls the coming crisis.',sourceItemIds:['pm-3-hell'],requiredEntries:['pm-2-bwl-part-1'],routeIds:['universe-spine','bat-family'],next:'Begin Dark Nights: Death Metal.'},
    {id:'death-metal',title:'Dark Nights: Death Metal',year:'2020–2021',type:'hard-gate',phaseId:'pm-b4',architect:'Scott Snyder',summary:'Wonder Woman leads the final resistance through a broken reality and rebuilds the Multiverse.',sourceItemIds:['pm-4-dm1','pm-4-guide-part-1','pm-4-guide-part-2','pm-4-trinity-part-1','pm-4-trinity-part-2','pm-4-trinity-part-3','pm-4-dm2','pm-4-secret-part-1','pm-4-secret-part-2','pm-4-dm3','pm-4-last52','pm-4-dm4'],optionalSourceItemIds:['pm-4-doommetal','pm-4-robin-part-1','pm-4-robin-part-2','pm-4-robin-part-3'],routeIds:['universe-spine','bat-family','flash-family','wonder-woman-amazons','green-lantern-corps'],next:'Read selected Future State stories, then begin Infinite Frontier #0.'}
  ]
};
