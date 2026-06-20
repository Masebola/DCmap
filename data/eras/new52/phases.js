export const NEW52_PHASES = [
  {
    id:'n52-phase-1', number:1, title:'The New World', dates:'2011–spring 2012',
    summary:'Establish the major families and sample several lanes interchangeably before the first family crossovers.',
    routeIds:['universe-spine','bat-family','superman-family','green-lantern-family','dark-occult','solo-heroes','extra-worlds'],
    eventIds:['rise-of-the-vampires','night-of-the-owls'],
    note:'Read two to five issues from any lane, but stop each participating title at the prerequisites shown on its event gate.'
  },
  {
    id:'n52-phase-2', number:2, title:'Zero Month and the Crossover Storm', dates:'late 2012–spring 2013',
    summary:'Origins, family crises and the first major wave of coordinated New 52 crossovers.',
    routeIds:['universe-spine','bat-family','superman-family','green-lantern-family','dark-occult','solo-heroes'],
    eventIds:['death-of-the-family','hel-on-earth','rise-of-the-third-army','wrath-of-the-first-lantern','rotworld','throne-of-atlantis'],
    note:'These events are mostly lane-specific. Completing Rotworld does not block Batman, and Death of the Family does not block Green Lantern.'
  },
  {
    id:'n52-phase-3', number:3, title:'Aftermath and the Road to Trinity War', dates:'spring–summer 2013',
    summary:'The families rebuild while Justice League, Justice League Dark and the government-sponsored JLA move toward the first hard universe gate.',
    routeIds:['universe-spine','bat-family','superman-family','green-lantern-family','dark-occult'],
    eventIds:['trinity-war'],
    note:'Do not advance Justice League beyond #21, Justice League Dark beyond #21, JLA beyond #5 or Phantom Stranger beyond #10 before Trinity War.'
  },
  {
    id:'n52-phase-4', number:4, title:'Forever Evil and Its Branches', dates:'late 2013–mid 2014',
    summary:'The Crime Syndicate takeover becomes the universe anchor while Gotham, Superman and the Lantern line continue through connected side gates.',
    routeIds:['universe-spine','bat-family','superman-family','green-lantern-family','dark-occult','solo-heroes'],
    eventIds:['forever-evil','forever-evil-blight','rogues-rebellion','krypton-returns','lights-out','red-daughter-of-krypton','uprising'],
    note:'Forever Evil is the hard gate. Blight and Rogues Rebellion are parallel branches; read only the branches belonging to your selected lanes.'
  },
  {
    id:'n52-phase-5', number:5, title:'Rebuilding the Universe', dates:'mid 2014–early 2015',
    summary:'The line regroups after Forever Evil through strong creative runs, Endgame, Superman: Doomed, Godhead and the final occult conclusions.',
    routeIds:['universe-spine','bat-family','superman-family','green-lantern-family','dark-occult','extra-worlds'],
    eventIds:['superman-doomed','godhead','robin-rises','endgame'],
    note:'This phase is highly interchangeable. Only the event prerequisites restrict individual lanes.'
  },
  {
    id:'n52-phase-6', number:6, title:'Convergence and DC You', dates:'spring–late 2015',
    summary:'Convergence acts as a publishing transition rather than required universe homework; selected titles relaunch with new directions.',
    routeIds:['bat-family','superman-family','green-lantern-family','dark-occult','solo-heroes'],
    eventIds:['convergence-anchor'],
    note:'Skip the main Convergence event. Read only Convergence: Superman #1–2 because it feeds the Rebirth Superman route.'
  },
  {
    id:'n52-phase-7', number:7, title:'Robin War and Final Family Stories', dates:'late 2015–early 2016',
    summary:'The Bat-family’s youth and legacy books collide, then finish their New 52 stories.',
    routeIds:['bat-family'], eventIds:['robin-war'],
    note:'Finish the participating series only after the Robin War checklist is complete.'
  },
  {
    id:'n52-phase-8', number:8, title:'The Final Wars', dates:'late 2015–May 2016',
    summary:'Darkseid War and Final Days of Superman close the two largest universe-spine stories while the remaining families finish their runs.',
    routeIds:['universe-spine','bat-family','superman-family','green-lantern-family'],
    eventIds:['darkseid-war','final-days-of-superman'],
    note:'Complete the listed prerequisites before entering either hard gate. Both point directly toward Rebirth.'
  },
  {
    id:'n52-phase-9', number:9, title:'Rebirth Threshold', dates:'May 2016',
    summary:'Finish the remaining selected New 52 series, then read DC Universe: Rebirth #1 as the final page of the roadmap.',
    routeIds:['universe-spine','bat-family','superman-family','green-lantern-family','dark-occult','solo-heroes'],
    eventIds:[],
    finale:{ id:'dc-universe-rebirth-1', title:'DC Universe: Rebirth #1', year:2016 },
    note:'Do not begin individual Rebirth one-shots before DC Universe: Rebirth #1.'
  }
];
