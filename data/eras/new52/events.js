import { annual, combine, event, issue, issues, range, special } from './helpers.js';

const jl = number => issue('Justice League', 2011, number, number <= 12 ? 2011 : number <= 23 ? 2012 : number <= 39 ? 2014 : 2015);
const aquaman = number => issue('Aquaman', 2011, number, number <= 13 ? 2011 : number <= 25 ? 2013 : number <= 40 ? 2014 : 2016);
const batman = number => issue('Batman', 2011, number, number <= 12 ? 2011 : number <= 20 ? 2013 : number <= 40 ? 2014 : 2016);
const gl = number => issue('Green Lantern', 2011, number, number <= 12 ? 2011 : number <= 24 ? 2013 : number <= 40 ? 2014 : 2016);
const glc = number => issue('Green Lantern Corps', 2011, number, number <= 12 ? 2011 : number <= 24 ? 2013 : 2014);
const ng = number => issue('Green Lantern: New Guardians', 2011, number, number <= 12 ? 2011 : number <= 24 ? 2013 : 2014);
const rl = number => issue('Red Lanterns', 2011, number, number <= 12 ? 2011 : number <= 24 ? 2013 : 2014);

export const NEW52_EVENTS = [
  event({
    id: 'rise-of-the-vampires',
    title: 'Rise of the Vampires',
    year: 2012,
    type: 'lane-gate',
    phaseId: 'n52-phase-1',
    summary: 'Justice League Dark and I, Vampire collide as the vampire war spills into the wider magical world.',
    chapters: [
      issue('Justice League Dark', 2011, 7, 2012),
      issue('I, Vampire', 2011, 7, 2012),
      issue('Justice League Dark', 2011, 8, 2012),
      issue('I, Vampire', 2011, 8, 2012)
    ],
    requiredBefore: ['Justice League Dark through #6', 'I, Vampire through #6'],
    next: 'Resume both occult series with issue #9.',
    routeIds: ['dark-occult']
  }),
  event({
    id: 'night-of-the-owls',
    title: 'Night of the Owls',
    year: 2012,
    type: 'lane-gate',
    phaseId: 'n52-phase-1',
    summary: 'The Court of Owls attacks Gotham in one night, drawing Batman and the core family into the same crisis.',
    chapters: [
      batman(8),
      issue('Batman and Robin', 2011, 9, 2012),
      issue('Batgirl', 2011, 9, 2012),
      issue('Nightwing', 2011, 8, 2012),
      issue('Nightwing', 2011, 9, 2012),
      batman(9),
      annual('Batman', 2011, 1, 2012),
      ...range('Batman', 2011, 10, 12, 2012)
    ],
    requiredBefore: ['Batman through #7', 'Nightwing through #7', 'Batman and Robin through #8', 'Batgirl through #8'],
    next: 'Continue the family books with their post-Owls material.',
    routeIds: ['bat-family'],
    legacyIds: ['n52-2-s1', 'n52-2-s2-part-1', 'n52-2-s2-part-2', 'n52-2-s2-part-3', 'n52-2-s2-part-5']
  }),
  event({
    id: 'death-of-the-family',
    title: 'Death of the Family',
    year: 2012,
    type: 'lane-gate',
    phaseId: 'n52-phase-2',
    summary: 'The Joker returns and attacks Batman through the people closest to him.',
    chapters: [
      ...range('Batman', 2011, 13, 14, 2012),
      ...range('Batgirl', 2011, 14, 16, 2012),
      ...range('Nightwing', 2011, 13, 16, 2012),
      ...range('Batman and Robin', 2011, 15, 17, 2012),
      ...range('Batman', 2011, 15, 17, 2013)
    ],
    requiredBefore: ['Finish the opening Batman, Batgirl, Nightwing and Batman and Robin blocks.'],
    next: 'Read the immediate aftermath in Batgirl #17–19, Nightwing #17–18 and Batman and Robin Annual #1.',
    routeIds: ['bat-family'],
    legacyIds: ['n52-3-sa1', 'n52-3-sa2-part-1', 'n52-3-sa2-part-3', 'n52-3-sa2-part-4']
  }),
  event({
    id: 'hel-on-earth',
    title: "H'El on Earth",
    year: 2012,
    type: 'lane-gate',
    phaseId: 'n52-phase-2',
    summary: 'A Kryptonian visitor offers Kara a dangerous path home, drawing Superman and Superboy into a family-wide conflict.',
    chapters: [
      issue('Superman', 2011, 13, 2012),
      issue('Superboy', 2011, 14, 2012),
      issue('Supergirl', 2011, 14, 2012),
      issue('Superman', 2011, 14, 2012),
      issue('Superboy', 2011, 15, 2012),
      issue('Supergirl', 2011, 15, 2012),
      issue('Superman', 2011, 15, 2012),
      issue('Superboy', 2011, 16, 2012),
      issue('Supergirl', 2011, 16, 2012),
      annual('Superboy', 2011, 1, 2013),
      issue('Superman', 2011, 16, 2013),
      issue('Superboy', 2011, 17, 2013),
      issue('Supergirl', 2011, 17, 2013),
      issue('Superman', 2011, 17, 2013)
    ],
    requiredBefore: ['Supergirl through #13', 'Superboy #13 as the event lead-in'],
    next: 'Continue Supergirl with #18–24. The regular Superboy series is not part of the curated route.',
    routeIds: ['superman-family'],
    legacyIds: ['n52-3-oth2-part-1', 'n52-3-oth2-part-2', 'n52-3-oth2-part-3']
  }),
  event({
    id: 'rise-of-the-third-army',
    title: 'Rise of the Third Army',
    year: 2012,
    type: 'lane-gate',
    phaseId: 'n52-phase-2',
    summary: 'The Guardians replace free-willed Lanterns with the Third Army, forcing all four corps books into one escalating plot.',
    chapters: [
      annual('Green Lantern', 2011, 1, 2012),
      glc(0), rl(0), ng(0), gl(0),
      gl(13), glc(13), ng(13), rl(13),
      gl(14), glc(14), ng(14), rl(14),
      gl(15), glc(15), ng(15), rl(15),
      annual('Green Lantern: New Guardians', 2011, 1, 2012),
      gl(16), glc(16), ng(16), rl(16),
      annual('Green Lantern Corps', 2011, 1, 2013)
    ],
    requiredBefore: ['All four Lantern family books through #12.'],
    next: 'Continue directly into Wrath of the First Lantern.',
    routeIds: ['green-lantern-family'],
    legacyIds: ['n52-3-sb1-part-1', 'n52-3-sb1-part-2', 'n52-3-sb2-part-1', 'n52-3-sb2-part-2', 'n52-3-sb2-part-3']
  }),
  event({
    id: 'wrath-of-the-first-lantern',
    title: 'Wrath of the First Lantern',
    year: 2013,
    type: 'lane-gate',
    phaseId: 'n52-phase-2',
    summary: 'The First Lantern attacks the emotional histories of the Corps and closes Geoff Johns’ long Green Lantern saga.',
    chapters: [
      gl(17), glc(17), ng(17), rl(17),
      gl(18), glc(18), ng(18), rl(18),
      gl(19), glc(19), ng(19), rl(19),
      gl(20), glc(20), ng(20), rl(20)
    ],
    requiredBefore: ['Rise of the Third Army'],
    next: 'Green Lantern #20 is the principal conclusion. The line relaunches creatively at #21.',
    routeIds: ['green-lantern-family'],
    legacyIds: ['n52-4-s1-part-1', 'n52-4-s1-part-2', 'n52-4-s1-part-3', 'n52-4-s1-part-4']
  }),
  event({
    id: 'rotworld',
    title: 'Rotworld',
    year: 2012,
    type: 'lane-gate',
    phaseId: 'n52-phase-2',
    summary: 'The Red and Green unite against the Rot in the central horror crossover of the New 52.',
    chapters: [
      issue('Animal Man', 2011, 12, 2012),
      issue('Swamp Thing', 2011, 12, 2012),
      issue('Animal Man', 2011, 13, 2012),
      issue('Swamp Thing', 2011, 13, 2012),
      issue('Frankenstein, Agent of S.H.A.D.E.', 2011, 13, 2012),
      issue('Animal Man', 2011, 14, 2012),
      issue('Swamp Thing', 2011, 14, 2012),
      issue('Frankenstein, Agent of S.H.A.D.E.', 2011, 14, 2012),
      issue('Animal Man', 2011, 15, 2012),
      issue('Swamp Thing', 2011, 15, 2012),
      issue('Frankenstein, Agent of S.H.A.D.E.', 2011, 15, 2012),
      issue('Animal Man', 2011, 16, 2013),
      issue('Swamp Thing', 2011, 16, 2013),
      issue('Animal Man', 2011, 17, 2013),
      issue('Swamp Thing', 2011, 17, 2013),
      issue('Animal Man', 2011, 18, 2013),
      issue('Swamp Thing', 2011, 18, 2013)
    ],
    requiredBefore: ['Animal Man and Swamp Thing through #11', 'Animal Man Annual #1', 'Swamp Thing Annual #1'],
    next: 'Resume Animal Man, Swamp Thing and Frankenstein with their post-Rotworld conclusions.',
    routeIds: ['dark-occult'],
    legacyIds: ['n52-3-rot-part-1', 'n52-3-rot-part-2', 'n52-3-rot-part-3', 'n52-3-rot-part-4']
  }),
  event({
    id: 'throne-of-atlantis',
    title: 'Throne of Atlantis',
    year: 2012,
    type: 'major-crossover',
    phaseId: 'n52-phase-2',
    summary: 'Atlantis declares war on the surface, joining Aquaman’s political story to the Justice League spine.',
    chapters: [
      aquaman(14), jl(15), aquaman(15), jl(16), aquaman(16), jl(17), aquaman(17)
    ],
    requiredBefore: ['Aquaman through #13 and #0', 'Justice League through #14'],
    next: 'Aquaman continues into Death of a King; Justice League moves toward Trinity War.',
    routeIds: ['universe-spine'],
    legacyIds: ['n52-3-sc1-part-1', 'n52-3-sc1-part-2']
  }),
  event({
    id: 'krypton-returns',
    title: 'Krypton Returns',
    year: 2013,
    type: 'lane-gate',
    phaseId: 'n52-phase-4',
    summary: "A compact sequel to H'El on Earth that closes the H'El storyline.",
    chapters: [
      issue('Superman', 2011, '23.3', 2013),
      annual('Action Comics', 2011, 2, 2013),
      issue('Superboy', 2011, 25, 2013),
      issue('Supergirl', 2011, 25, 2013),
      issue('Superman', 2011, 25, 2013)
    ],
    requiredBefore: ["H'El on Earth", 'Supergirl through #24'],
    next: 'Resume Action Comics, Supergirl and the selected Superman material.',
    routeIds: ['superman-family']
  }),
  event({
    id: 'trinity-war',
    title: 'Trinity War',
    year: 2013,
    type: 'hard-gate',
    phaseId: 'n52-phase-3',
    summary: 'Three Justice Leagues clash over Pandora’s Box, ending on a direct cliffhanger into Forever Evil.',
    chapters: [
      special('The New 52 Free Comic Book Day Special', 2012),
      issue('Trinity of Sin: Pandora', 2013, 1, 2013),
      jl(22),
      issue('Justice League of America', 2013, 6, 2013),
      issue('Justice League Dark', 2011, 22, 2013),
      issue('Constantine', 2013, 5, 2013),
      issue('Trinity of Sin: Pandora', 2013, 2, 2013),
      issue('Trinity of Sin: The Phantom Stranger', 2012, 11, 2013),
      issue('Justice League of America', 2013, 7, 2013),
      issue('Trinity of Sin: Pandora', 2013, 3, 2013),
      issue('Justice League Dark', 2011, 23, 2013),
      jl(23)
    ],
    requiredBefore: ['Justice League through #21', 'Justice League of America through #5', 'Justice League Dark through #21', 'Phantom Stranger through #10'],
    next: 'Continue directly to Forever Evil. Do not resume ordinary Justice League reading first.',
    routeIds: ['universe-spine', 'dark-occult'],
    legacyIds: ['n52-5-tw0', 'n52-5-tw1-part-1', 'n52-5-tw1-part-2', 'n52-5-tw1-part-3', 'n52-5-tw1-part-4', 'n52-5-tw2-part-1', 'n52-5-tw2-part-2', 'n52-5-tw2-part-3', 'n52-5-tw2-part-4', 'n52-5-tw2-part-5', 'n52-5-tw3']
  }),
  event({
    id: 'forever-evil',
    title: 'Forever Evil',
    year: 2013,
    type: 'hard-gate',
    phaseId: 'n52-phase-4',
    summary: 'The Crime Syndicate conquers Earth and Lex Luthor assembles an unlikely resistance.',
    chapters: [
      issue('Forever Evil', 2013, 1, 2013),
      issue('Justice League', 2011, '23.4', 2013),
      issue('Forever Evil', 2013, 2, 2013),
      jl(24),
      issue('Forever Evil', 2013, 3, 2013),
      jl(25),
      issue('Forever Evil', 2013, 4, 2013),
      ...range('Justice League', 2011, 26, 28, 2014),
      issue('Forever Evil', 2013, 5, 2014),
      issue('Forever Evil', 2013, 6, 2014),
      jl(29),
      issue('Forever Evil', 2013, 7, 2014)
    ],
    requiredBefore: ['Trinity War'],
    next: 'Nightwing #30 and Justice League #30 begin the aftermath.',
    routeIds: ['universe-spine', 'bat-family'],
    legacyIds: ['n52-6-s1', 'n52-6-s3-part-1']
  }),
  event({
    id: 'forever-evil-blight',
    title: 'Forever Evil: Blight',
    year: 2013,
    type: 'major-crossover',
    phaseId: 'n52-phase-4',
    summary: 'The magical heroes fight Blight during the Crime Syndicate occupation.',
    chapters: [
      issue('Justice League Dark', 2011, 24, 2013),
      issue('Justice League Dark', 2011, 25, 2013),
      issue('Trinity of Sin: The Phantom Stranger', 2012, 14, 2013),
      issue('Constantine', 2013, 9, 2013),
      issue('Trinity of Sin: Pandora', 2013, 6, 2013),
      issue('Justice League Dark', 2011, 26, 2014),
      issue('Trinity of Sin: The Phantom Stranger', 2012, 15, 2014),
      issue('Constantine', 2013, 10, 2014),
      issue('Trinity of Sin: Pandora', 2013, 7, 2014),
      issue('Justice League Dark', 2011, 27, 2014),
      issue('Trinity of Sin: The Phantom Stranger', 2012, 16, 2014),
      issue('Constantine', 2013, 11, 2014),
      issue('Trinity of Sin: Pandora', 2013, 8, 2014),
      issue('Justice League Dark', 2011, 28, 2014),
      issue('Trinity of Sin: The Phantom Stranger', 2012, 17, 2014),
      issue('Constantine', 2013, 12, 2014),
      issue('Trinity of Sin: Pandora', 2013, 9, 2014),
      issue('Justice League Dark', 2011, 29, 2014)
    ],
    requiredBefore: ['Trinity War', 'Phantom Stranger #12–13'],
    next: 'Resume Justice League Dark and Phantom Stranger with their final arcs.',
    routeIds: ['dark-occult']
  }),
  event({
    id: 'rogues-rebellion',
    title: 'Forever Evil: Rogues Rebellion',
    year: 2013,
    type: 'lane-gate',
    phaseId: 'n52-phase-4',
    summary: 'The Rogues resist the Crime Syndicate without Barry Allen.',
    chapters: [
      issue('The Flash', 2011, '23.3', 2013),
      ...range('Forever Evil: Rogues Rebellion', 2013, 1, 6, 2014)
    ],
    requiredBefore: ['The Flash through #25'],
    next: 'Finish the recommended Flash run with #26–29 and Annual #2.',
    routeIds: ['solo-heroes']
  }),
  event({
    id: 'lights-out',
    title: 'Lights Out',
    year: 2013,
    type: 'lane-gate',
    phaseId: 'n52-phase-4',
    summary: 'Relic attacks the emotional spectrum and forces the Lantern line into a compact five-part crossover.',
    chapters: [gl(24), glc(24), ng(24), rl(24), annual('Green Lantern', 2011, 2, 2013)],
    requiredBefore: ['New Guardians #23', 'Green Lantern #23.1: Relic'],
    next: 'The Lantern books separate again before Uprising and Godhead.',
    routeIds: ['green-lantern-family']
  }),
  event({
    id: 'red-daughter-of-krypton',
    title: 'Red Daughter of Krypton',
    year: 2014,
    type: 'major-crossover',
    phaseId: 'n52-phase-4',
    summary: 'Kara joins the Red Lanterns, bringing the Superman and Lantern lanes together.',
    chapters: [
      ...range('Supergirl', 2011, 26, 29, 2014),
      issue('Green Lantern', 2011, 28, 2014),
      issue('Red Lanterns', 2011, 28, 2014),
      issue('Red Lanterns', 2011, 29, 2014),
      issue('Supergirl', 2011, 30, 2014),
      issue('Red Lanterns', 2011, 30, 2014),
      issue('Supergirl', 2011, 31, 2014),
      issue('Red Lanterns', 2011, 31, 2014),
      issue('Red Lanterns', 2011, 32, 2014),
      issue('Supergirl', 2011, 32, 2014),
      issue('Supergirl', 2011, 33, 2014),
      issue('Red Lanterns', 2011, 33, 2014),
      annual('Red Lanterns', 2011, 1, 2014),
      issue('Red Lanterns', 2011, 34, 2014)
    ],
    requiredBefore: ['Supergirl through #25', 'Red Lanterns through #27'],
    next: 'Resume both lanes after Kara’s Red Lantern period.',
    routeIds: ['superman-family', 'green-lantern-family']
  }),
  event({
    id: 'uprising',
    title: 'Green Lantern: Uprising',
    year: 2014,
    type: 'lane-gate',
    phaseId: 'n52-phase-4',
    summary: 'The Green Lantern Corps fights a coordinated uprising as Hal struggles to lead the organisation.',
    chapters: [
      issue('Green Lantern', 2011, 31, 2014),
      issue('Green Lantern Corps', 2011, 31, 2014),
      issue('Green Lantern', 2011, 32, 2014),
      issue('Green Lantern Corps', 2011, 32, 2014),
      issue('Green Lantern', 2011, 33, 2014),
      issue('Green Lantern Corps', 2011, 33, 2014),
      issue('Green Lantern', 2011, 34, 2014),
      issue('Green Lantern Corps', 2011, 34, 2014),
      annual('Green Lantern Corps', 2011, 2, 2014)
    ],
    requiredBefore: ['Green Lantern and Green Lantern Corps through #30'],
    next: 'Proceed to Sinestro and Godhead.',
    routeIds: ['green-lantern-family']
  }),
  event({
    id: 'superman-doomed',
    title: 'Superman: Doomed',
    year: 2014,
    type: 'major-crossover',
    phaseId: 'n52-phase-5',
    summary: 'Superman’s battle with Doomsday mutates into a long family-wide struggle.',
    chapters: [
      issue('Action Comics', 2011, 30, 2014),
      issue('Superman/Wonder Woman', 2013, 7, 2014),
      issue('Superman', 2011, 30, 2014),
      special('Superman: Doomed', 2014, 1),
      issue('Action Comics', 2011, 31, 2014),
      issue('Superman/Wonder Woman', 2013, 8, 2014),
      issue('Batman/Superman', 2013, 11, 2014),
      issue('Superman', 2011, 31, 2014),
      issue('Action Comics', 2011, 32, 2014),
      issue('Superman/Wonder Woman', 2013, 9, 2014),
      issue('Action Comics', 2011, 33, 2014),
      issue('Superman/Wonder Woman', 2013, 10, 2014),
      annual('Superman/Wonder Woman', 2013, 1, 2014),
      annual('Action Comics', 2011, 3, 2014),
      issue('Action Comics', 2011, 34, 2014),
      issue('Superman/Wonder Woman', 2013, 11, 2014),
      issue('Supergirl', 2011, 34, 2014),
      special('Superman: Doomed', 2014, 2),
      issue('Action Comics', 2011, 35, 2014),
      issue('Superman/Wonder Woman', 2013, 12, 2014),
      issue('Supergirl', 2011, 35, 2014)
    ],
    requiredBefore: ['Action Comics through #29', 'Superman/Wonder Woman through #6', 'Supergirl through #33'],
    next: 'Resume the selected later Superman blocks.',
    routeIds: ['superman-family']
  }),
  event({
    id: 'godhead',
    title: 'Green Lantern/New Gods: Godhead',
    year: 2014,
    type: 'major-crossover',
    phaseId: 'n52-phase-5',
    summary: 'The New Gods target the emotional spectrum, pulling all five Lantern books into one war.',
    chapters: [
      special('Green Lantern/New Gods: Godhead', 2014),
      gl(35), glc(35), ng(35), rl(35), issue('Sinestro', 2014, 6, 2014),
      gl(36), glc(36), ng(36), rl(36), issue('Sinestro', 2014, 7, 2014),
      gl(37), glc(37), ng(37), rl(37), issue('Sinestro', 2014, 8, 2014),
      annual('Green Lantern', 2011, 3, 2014)
    ],
    requiredBefore: ['The four original Lantern books through #34', 'Sinestro through #5'],
    next: 'Finish Green Lantern Corps, New Guardians and Red Lanterns through #40.',
    routeIds: ['green-lantern-family']
  }),
  event({
    id: 'robin-rises',
    title: 'Robin Rises',
    year: 2014,
    type: 'lane-gate',
    phaseId: 'n52-phase-5',
    summary: 'Batman’s search for Damian escalates from a global hunt into a cosmic rescue mission.',
    chapters: [
      ...range('Batman and Robin', 2011, 29, 34, 2014),
      special('Robin Rises: Omega', 2014),
      ...range('Batman and Robin', 2011, 35, 40, 2015),
      special('Robin Rises: Alpha', 2014),
      annual('Batman and Robin', 2011, 3, 2015)
    ],
    requiredBefore: ['Batman Incorporated through #13', 'Batman and Robin through #28'],
    next: 'Continue with Robin: Son of Batman.',
    routeIds: ['bat-family']
  }),
  event({
    id: 'endgame',
    title: 'Batman: Endgame',
    year: 2014,
    type: 'lane-gate',
    phaseId: 'n52-phase-5',
    summary: 'Batman and the Joker enter their most apocalyptic New 52 confrontation.',
    chapters: [
      ...range('Batman', 2011, 35, 37, 2014),
      annual('Batman', 2011, 3, 2014),
      special('Detective Comics: Endgame', 2015),
      special('Batgirl: Endgame', 2015),
      special('Gotham Academy: Endgame', 2015),
      ...range('Batman', 2011, 38, 40, 2015)
    ],
    requiredBefore: ['Batman through #34', 'The selected Gotham books at their pre-Endgame stopping points'],
    next: 'Batman #41 begins the Superheavy era.',
    routeIds: ['bat-family']
  }),
  event({
    id: 'convergence-anchor',
    title: 'Convergence Publishing Transition',
    year: 2015,
    type: 'soft-anchor',
    phaseId: 'n52-phase-6',
    summary: 'A line-wide publishing pause and transition. The full event is skipped in this curated route.',
    chapters: [
      issue('Convergence: Superman', 2015, 1, 2015),
      issue('Convergence: Superman', 2015, 2, 2015)
    ],
    requiredBefore: ['No universe-wide prerequisite.'],
    next: 'Use these two Superman chapters before Superman: Lois and Clark.',
    routeIds: ['superman-family']
  }),
  event({
    id: 'robin-war',
    title: 'Robin War',
    year: 2015,
    type: 'lane-gate',
    phaseId: 'n52-phase-7',
    summary: 'Gotham’s Robins collide over who owns the symbol and what it means.',
    chapters: [
      issue('Robin War', 2015, 1, 2015),
      issue('Grayson', 2014, 15, 2015),
      issue('Detective Comics', 2011, 47, 2015),
      issue('We Are Robin', 2015, 7, 2015),
      issue('Robin: Son of Batman', 2015, 7, 2015),
      issue('Gotham Academy', 2014, 13, 2015),
      issue('Robin War', 2015, 2, 2016)
    ],
    requiredBefore: ['Grayson through #14', 'We Are Robin through #6', 'Robin: Son of Batman through #6', 'Gotham Academy through #12'],
    next: 'Finish each participating Bat-family series.',
    routeIds: ['bat-family']
  }),
  event({
    id: 'darkseid-war',
    title: 'Darkseid War',
    year: 2015,
    type: 'hard-gate',
    phaseId: 'n52-phase-8',
    summary: 'Darkseid and the Anti-Monitor go to war in the culmination of Geoff Johns’ Justice League run.',
    chapters: [
      ...range('Justice League', 2011, 40, 45, 2015),
      special('Justice League: Darkseid War – Batman', 2015),
      special('Justice League: Darkseid War – The Flash', 2015),
      special('Justice League: Darkseid War – Superman', 2015),
      special('Justice League: Darkseid War – Green Lantern', 2015),
      special('Justice League: Darkseid War – Shazam!', 2015),
      special('Justice League: Darkseid War – Lex Luthor', 2015),
      ...range('Justice League', 2011, 46, 48, 2016),
      special('Justice League: Darkseid War Special', 2016),
      ...range('Justice League', 2011, 49, 50, 2016)
    ],
    requiredBefore: ['Justice League through #39', 'Forever Evil', 'The Shazam backup origin'],
    next: 'Justice League #50 is the true ending of the New 52 Justice League saga.',
    routeIds: ['universe-spine']
  }),
  event({
    id: 'final-days-of-superman',
    title: 'The Final Days of Superman',
    year: 2016,
    type: 'hard-gate',
    phaseId: 'n52-phase-8',
    summary: 'The New 52 Superman’s story closes while the pre-Flashpoint Superman prepares to step forward.',
    chapters: [
      issue('Superman', 2011, 51, 2016),
      issue('Batman/Superman', 2013, 31, 2016),
      issue('Action Comics', 2011, 51, 2016),
      issue('Superman/Wonder Woman', 2013, 28, 2016),
      issue('Batman/Superman', 2013, 32, 2016),
      issue('Action Comics', 2011, 52, 2016),
      issue('Superman/Wonder Woman', 2013, 29, 2016),
      issue('Superman', 2011, 52, 2016)
    ],
    requiredBefore: ['Convergence: Superman #1–2', 'Superman: Lois and Clark #1–8', 'A summary of Truth and Savage Dawn'],
    next: 'Proceed to DC Universe: Rebirth #1.',
    routeIds: ['superman-family']
  })
];
