import { combine, event, issue, range, special } from '../../shared/helpers.js';

export const REBIRTH_EVENTS = [
  event({
    id:'night-of-the-monster-men', title:'Night of the Monster Men', year:'2016', type:'lane-gate', phaseId:'rb-phase-2', architect:'Steve Orlando',
    summary:'A storm transforms Hugo Strange’s experiments into giant threats across Gotham.',
    chapters:[
      issue('Batman',2016,7,2016), issue('Nightwing',2016,5,2016), issue('Detective Comics',2016,941,2016),
      issue('Batman',2016,8,2016), issue('Nightwing',2016,6,2016), issue('Detective Comics',2016,942,2016)
    ],
    requiredEntries:['rb-batman-i-am-gotham','rb-detective-rise-batmen','rb-nightwing-better-batman'],
    requiredBefore:['Batman through #6','Detective Comics through #940','Nightwing through #4'],
    next:'Return to the separate Batman, Detective Comics and Nightwing runs.',
    routeIds:['bat-family'], legacyIds:['rb-2-s1']
  }),
  event({
    id:'superman-reborn', title:'Superman Reborn', year:'2017', type:'major-crossover', phaseId:'rb-phase-3', architect:'Peter J. Tomasi and Dan Jurgens',
    summary:'The mystery surrounding Clark, Lois and their divided history forces the Superman timelines back together.',
    chapters:[issue('Superman',2016,18,2017),issue('Action Comics',1938,975,2017),issue('Superman',2016,19,2017),issue('Action Comics',1938,976,2017)],
    requiredEntries:['rb-superman-multiplicity','rb-action-reborn-prelude'],
    requiredBefore:['Superman through #17','Action Comics through #974'],
    next:'Continue Superman #20 and Action Comics #977.',
    routeIds:['superman-family'], legacyIds:['rb-3-s2']
  }),
  event({
    id:'the-button', title:'The Button', year:'2017', type:'major-crossover', phaseId:'rb-phase-4', architect:'Tom King and Joshua Williamson',
    summary:'Batman and the Flash investigate the bloodstained button left in the Batcave and follow its trail through time.',
    chapters:[issue('Batman',2016,21,2017),issue('The Flash',2016,21,2017),issue('Batman',2016,22,2017),issue('The Flash',2016,22,2017)],
    requiredEntries:['rb-batman-i-am-bane','rb-flash-rogues-reloaded'],
    requiredBefore:['Batman through #20','The Flash through #20'],
    next:'Return to Batman #23 and The Flash #23.',
    routeIds:['bat-family','flash-family','universe-spine'], legacyIds:['rb-4-s1']
  }),
  event({
    id:'the-lazarus-contract', title:'The Lazarus Contract', year:'2017', type:'lane-gate', phaseId:'rb-phase-4', architect:'Dan Abnett, Benjamin Percy and Christopher Priest',
    summary:'A hidden agreement involving Deathstroke, Nightwing and the Titans returns with consequences for both generations.',
    chapters:[issue('Titans',2016,11,2017),issue('Teen Titans',2016,8,2017),issue('Deathstroke',2016,19,2017),special('Teen Titans Annual: The Lazarus Contract',2017),issue('Deathstroke',2016,20,2017)],
    requiredEntries:['rb-titans-made-manhattan','rb-teen-titans-damian-team','rb-deathstroke-professional'],
    requiredBefore:['Titans through #10','Teen Titans through #7','Deathstroke through #18'],
    next:'Continue Titans #12, Teen Titans #9 and Deathstroke #21.',
    routeIds:['titans-young-heroes','extra-heroes'], legacyIds:['rb-4-laz']
  }),
  event({
    id:'dark-nights-metal', title:'Dark Nights: Metal', year:'2017–2018', type:'hard-gate', phaseId:'rb-phase-6', architect:'Scott Snyder',
    summary:'Barbatos and seven nightmare Batmen drag Earth toward the Dark Multiverse in the explosive end of the Rebirth opening era.',
    chapters:[
      special('Dark Days: The Forge',2017), special('Dark Days: The Casting',2017),
      issue('Dark Nights: Metal',2017,1,2017), issue('Dark Nights: Metal',2017,2,2017),
      issue('Teen Titans',2016,12,2017), issue('Nightwing',2016,29,2017), issue('Suicide Squad',2016,26,2017), issue('Green Arrow',2016,32,2017),
      special('Batman: The Red Death',2017), special('Batman: The Murder Machine',2017), special('Batman: The Dawnbreaker',2017),
      special('Batman: The Drowned',2017), special('Batman: The Merciless',2017), special('Batman: The Devastator',2017), special('The Batman Who Laughs',2017),
      issue('Dark Nights: Metal',2017,3,2017), issue('The Flash',2016,33,2017), issue('Justice League',2016,32,2017),
      issue('Hal Jordan and the Green Lantern Corps',2016,32,2017), issue('Justice League',2016,33,2017),
      special('Batman: Lost',2017), special('Hawkman: Found',2017),
      issue('Dark Nights: Metal',2017,4,2017), issue('Dark Nights: Metal',2017,5,2018), special('Dark Knights Rising: The Wild Hunt',2018), issue('Dark Nights: Metal',2017,6,2018)
    ],
    requiredEntries:['rb-batman-war-jokes-riddles','rb-nightwing-blockbuster','rb-flash-negative','rb-green-arrow-hard-traveling'],
    requiredBefore:['Finish your selected Road to Metal route blocks','Read Dark Days only when ready to begin the event'],
    next:'The next era begins with Justice League: No Justice #1.',
    routeIds:['universe-spine','bat-family','flash-family','green-lantern-corps','titans-young-heroes','green-arrow-family'],
    legacyIds:['rb-5-s1','rb-5-s2','rb-5-s3','rb-5-s4','rb-5-s5','rb-5-s6','rb-5-s7','rb-5-s8','rb-5-s9']
  })
];
