import { STANDARD_ROUTES, resolveStandardRoute } from '../../shared/modern-route-config.js';
import { DC_ALL_IN_SPECIAL_1 } from '../../shared/bridge-issues.js';

export const config = {
  id:'dod',
  label:'Dawn of DC → All In',
  title:'Dawn of DC to DC All In',
  subtitle:'Lazarus rain, Titans leadership and Absolute Power',
  dates:'January 2023 – October 2024',
  description:'Lazarus Planet launches a broad line refresh, the Titans inherit the centre of the DC Universe, and Amanda Waller’s campaign culminates in Absolute Power and DC All In Special #1.',
  asOf:'2024-10-02',
  finaleIssue:DC_ALL_IN_SPECIAL_1,
  routes:STANDARD_ROUTES,
  resolveRoute:resolveStandardRoute,
  seriesAliases:{'Action':'Action Comics','Detective':'Detective Comics','GL':'Green Lantern'},
  seriesYears:{
    'Lazarus Planet: Alpha':2023,'Lazarus Planet: Assault on Krypton':2023,'Lazarus Planet: We Once Were Gods':2023,'Lazarus Planet: Legends Reborn':2023,
    'Lazarus Planet: Next Evolution':2023,'Lazarus Planet: Dark Fate':2023,'Lazarus Planet: Omega':2023,'Batman':2016,'Nightwing':2016,
    'Batman/Superman: World’s Finest':2022,'Superman':2023,'Action Comics':1938,'Adventures of Superman: Jon Kent':2023,'Unstoppable Doom Patrol':2023,
    'Green Lantern':2023,'Titans':2023,'Green Arrow':2023,'Shazam!':2023,'Cyborg':2023,'The Flash':2023,'Wonder Woman':2023,
    'Knight Terrors: First Blood':2023,'Knight Terrors':2023,'Knight Terrors: Batman':2023,'Knight Terrors: Detective Comics':2023,
    'Knight Terrors: Nightwing':2023,'Knight Terrors: Superman':2023,'Knight Terrors: Action Comics':2023,'Knight Terrors: Wonder Woman':2023,
    'Knight Terrors: The Flash':2023,'Knight Terrors: Green Lantern':2023,'Knight Terrors: Titans':2023,'Knight Terrors: Robin':2023,
    'Knight Terrors: Shazam!':2023,'Knight Terrors: Harley Quinn':2023,'Knight Terrors: Zatanna':2023,'Knight Terrors: Night’s End':2023,
    'Batman/Catwoman: The Gotham War: Battle Lines':2023,'Catwoman':2018,'Batman/Catwoman: The Gotham War: Red Hood':2023,
    'Batman/Catwoman: The Gotham War: Scorched Earth':2023,'Titans: Beast World':2023,'Titans: Beast World Tour – Central City':2023,
    'Titans: Beast World Tour – Gotham':2023,'Titans: Beast World Tour – Metropolis':2023,'Titans: Beast World Tour – Atlantis':2023,
    'Titans: Beast World Tour – Star City':2023,'Titans: Beast World – Waller Rising':2023,'Superman: House of Brainiac Special':2024,
    'Power Girl':2023,'Absolute Power: Ground Zero':2024,'Absolute Power: Task Force VII':2024,'Absolute Power: Origins':2024,
    'Absolute Power':2024,'Suicide Squad: Dream Team':2024,'Absolute Power: Super Son':2024,'DC All In Special':2024
  },
  itemOverrides:{
    'dod-3-note':{exclude:true,allowEmpty:true},
    'dod-8-s1':{issues:[DC_ALL_IN_SPECIAL_1],title:'DC All In Special #1',priority:'core',writers:['Scott Snyder','Joshua Williamson'],summary:'Darkseid’s final move creates a new status quo and branches the main DCU from the Absolute Universe.'}
  },
  creatorRules:[
    {test:/Lazarus Planet/,writers:['Mark Waid','Gene Luen Yang','Ricardo López Ortiz']},{test:/Batman #/,writers:['Chip Zdarsky']},
    {test:/Nightwing/,writers:['Tom Taylor']},{test:/World’s Finest/,writers:['Mark Waid']},{test:/Superman #/,writers:['Joshua Williamson']},
    {test:/Action Comics/,writers:['Phillip Kennedy Johnson','Jason Aaron','Mark Waid']},{test:/Green Lantern/,writers:['Jeremy Adams']},
    {test:/Titans/,writers:['Tom Taylor']},{test:/Green Arrow/,writers:['Joshua Williamson']},{test:/Shazam!/,writers:['Mark Waid']},
    {test:/Wonder Woman/,writers:['Tom King']},{test:/The Flash/,writers:['Si Spurrier']},{test:/Absolute Power/,writers:['Mark Waid']},
    {test:/House of Brainiac/,writers:['Joshua Williamson']}
  ],
  events:[
    {id:'lazarus-planet',title:'Lazarus Planet',year:'2023',type:'major-crossover',phaseId:'dod-b1',architect:'Mark Waid',summary:'Lazarus storms transform powers, awaken magic and seed the Dawn of DC status quo.',sourceItemIds:['dod-1-lp1','dod-1-lp2-part-1','dod-1-lp2-part-2','dod-1-lp2-part-3','dod-1-lp3-part-1','dod-1-lp3-part-2','dod-1-lp4'],routeIds:['universe-spine','superman-family','dark-supernatural'],next:'Begin the Dawn of DC launch wave.'},
    {id:'knight-terrors',title:'Knight Terrors',year:'2023',type:'major-crossover',phaseId:'dod-b3',architect:'Joshua Williamson',summary:'Insomnia traps the heroes and villains inside nightmares while the waking world collapses.',sourceItemIds:['dod-3-kt0','dod-3-kt1','dod-3-ktt-part-1','dod-3-ktt-part-2','dod-3-ktt-part-3','dod-3-ktt-part-4','dod-3-ktt-part-5','dod-3-ktt-part-6','dod-3-ktt-part-7','dod-3-ktt-part-8','dod-3-ktt-part-9','dod-3-ktt-part-10','dod-3-ktt-part-11','dod-3-ktt-part-12','dod-3-ktt-part-13','dod-3-ktend'],routeIds:['universe-spine','bat-family','superman-family','flash-family','green-lantern-corps','titans-young-heroes','wonder-woman-amazons','dark-supernatural'],next:'Return to the Dawn titles after Night’s End.'},
    {id:'gotham-war',title:'The Gotham War',year:'2023',type:'lane-gate',phaseId:'dod-b4',architect:'Chip Zdarsky and Tini Howard',summary:'Batman and Catwoman split Gotham’s vigilantes over a radical plan to control crime.',sourceItemIds:['dod-4-s1','dod-4-s2-part-1','dod-4-s2-part-2','dod-4-s3','dod-4-s4'],routeIds:['bat-family'],next:'Continue Batman and Catwoman after Scorched Earth.'},
    {id:'beast-world',title:'Titans: Beast World',year:'2023–2024',type:'hard-gate',phaseId:'dod-b5',architect:'Tom Taylor',summary:'The Titans lead the entire DC Universe against a transformation plague and Amanda Waller’s opportunism.',sourceItemIds:['dod-5-s1','dod-5-s2-part-1','dod-5-s2-part-2','dod-5-s2-part-3','dod-5-s2-part-4','dod-5-s2-part-5','dod-5-s3','dod-5-s4-part-1','dod-5-s4-part-2','dod-5-s4-part-3'],routeIds:['universe-spine','titans-young-heroes','bat-family','superman-family','flash-family','aquaman-atlantis','green-arrow-family'],next:'The Waller thread continues toward Absolute Power.'},
    {id:'house-of-brainiac',title:'House of Brainiac',year:'2024',type:'major-crossover',phaseId:'dod-b6',architect:'Joshua Williamson',summary:'Brainiac targets Superman’s family and allies, forcing a cosmic rescue mission.',sourceItemIds:['dod-6-hob1-part-1','dod-6-hob1-part-2','dod-6-hob1-part-3','dod-6-hob2-part-1','dod-6-hob2-part-2','dod-6-hob2-part-3','dod-6-hob2-part-4'],optionalSourceItemIds:['dod-6-hob3-part-1','dod-6-hob3-part-2'],routeIds:['superman-family','green-lantern-corps'],next:'Return to Superman and Action Comics after Superman #15.'},
    {id:'absolute-power',title:'Absolute Power',year:'2024',type:'hard-gate',phaseId:'dod-b7',architect:'Mark Waid',summary:'Amanda Waller removes metahuman powers and attempts to replace the heroic age with total control.',sourceItemIds:['dod-7-s1','dod-7-s2-part-1','dod-7-s2-part-2','dod-7-s2-part-3','dod-7-s2-part-4','dod-7-s2-part-5','dod-7-s2-part-6','dod-7-s3','dod-7-s4','dod-7-s5','dod-7-s6','dod-7-s7'],routeIds:['universe-spine','bat-family','superman-family','flash-family','green-lantern-corps','wonder-woman-amazons','green-arrow-family'],next:'Read DC All In Special #1.'},
    {id:'dc-all-in-bridge',title:'DC All In Special #1',year:'2024',type:'hard-gate',phaseId:'dod-b8',architect:'Scott Snyder and Joshua Williamson',summary:'The post-Absolute Power DCU reorganises as Darkseid creates the Absolute Universe.',sourceItemIds:['dod-8-s1'],chapters:[DC_ALL_IN_SPECIAL_1],routeIds:['universe-spine'],next:'Continue into the main All In era or branch into the Absolute Universe.'}
  ]
};
