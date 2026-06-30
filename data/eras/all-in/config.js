import { annual, combine, issue, range, special } from '../../shared/helpers.js';
import { STANDARD_ROUTES, resolveStandardRoute } from '../../shared/modern-route-config.js';
import { DC_ALL_IN_SPECIAL_1 } from '../../shared/bridge-issues.js';

const mainRoutes = STANDARD_ROUTES;
const isAbsolute = (item, section) => /absolute universe/i.test(section?.label || '') || /^Absolute /i.test(item.t || '') || /Free Comic Book Day 2025: DC All In/i.test(item.t || '');

export const config = {
  id:'allin',
  label:'DC All In',
  title:'DC All In: Main DC Universe',
  subtitle:'Justice League Unlimited and the road through DC K.O.',
  dates:'October 2024 – June 2026',
  description:'The main DC Universe rebuilds around Justice League Unlimited, new flagship runs and the Omega conflict that culminates in DC K.O. Absolute titles are tracked on their own era page.',
  asOf:'2026-06-30',
  openingIssue:DC_ALL_IN_SPECIAL_1,
  routes:mainRoutes,
  includeItem(item, section){ return !isAbsolute(item, section); },
  resolveRoute:resolveStandardRoute,
  seriesAliases:{'Action':'Action Comics','Detective':'Detective Comics','GL':'Green Lantern','Batman/Superman: WF':'Batman/Superman: World’s Finest'},
  seriesYears:{
    'Justice League Unlimited':2024,'Batman':2016,'Superman':2023,'Wonder Woman':2023,'Batman/Superman: World’s Finest':2022,
    'Action Comics':1938,'Summer of Superman Special':2025,'Supergirl':2025,'The Flash':2023,'Titans':2023,'Detective Comics':1937,
    'Aquaman':2025,'Emperor Aquaman':2025,'Justice League: The Omega Act Special':2025,'DC K.O.':2025,'DC K.O.: Knightfight':2025,
    'DC K.O.: Superman vs. Captain Atom':2025,'DC K.O.: Wonder Woman vs. Lobo':2025,'DC K.O.: Harley Quinn vs. Zatanna':2025,
    'DC K.O.: Red Hood vs. Joker':2025,'DC K.O.: Green Lantern Galactic Slam':2025,'DC K.O.: The Kids Are All Fight':2025,'DC K.O.: Boss Battle':2026
  },
  itemOverrides:{
    'ai-2-jlu-part-1':{title:'Justice League Unlimited #5: We Are Yesterday Prelude',issues:[issue('Justice League Unlimited',2024,5,2025)],writers:['Mark Waid'],summary:'The Inferno mystery reaches the edge of the first All In crossover.'},
    'ai-5-jlu':{title:'Justice League Unlimited #17–20',issues:range('Justice League Unlimited',2024,17,20,2026),writers:['Mark Waid'],summary:'The League enters the post-K.O. status quo through the June 2026 issue.'},
    'ai-5-sup-part-1':{title:'Superman #37–39',issues:range('Superman',2023,37,39,2026),writers:['Joshua Williamson'],summary:'The flagship Superman run continues through its June 2026 issue.'},
    'ai-5-sup-part-2':{title:'Batman/Superman: World’s Finest #50–52',issues:range('Batman/Superman: World’s Finest',2022,50,52,2026),writers:['Mark Waid'],summary:'World’s Finest enters Skartaris and continues through June 2026.'},
    'ai-5-bat-part-1':{title:'Batman (2025) #5–10',issues:range('Batman',2025,5,10,2026),writers:['Matt Fraction'],summary:'The new Batman run continues through Operation Peregrine and its June 2026 issue.'},
    'ai-5-bat-part-2':{title:'Detective Comics #1107–1110',issues:range('Detective Comics',1937,1107,1110,2026),writers:['Tom Taylor'],summary:'The Detective Comics run continues through June 2026.'},
    'ai-5-ww-part-1':{title:'Wonder Woman #31–34',issues:range('Wonder Woman',2023,31,34,2026),writers:['Tom King'],summary:'The Wonder War begins and reaches the end of its first act.'},
    'ai-5-ww-part-2':{title:'Supergirl (2025) #12–14',issues:range('Supergirl',2025,12,14,2026),writers:['Sophie Campbell'],summary:'Kara’s Kandor conflict continues through June 2026.'},
    'ai-5-aqua':{title:'Emperor Aquaman #15–18',issues:range('Emperor Aquaman',2025,15,18,2026),writers:['Jeremy Adams'],summary:'Arthur’s post-K.O. cosmic mission continues through June 2026.'}
  },
  creatorRules:[
    {test:/Justice League Unlimited/,writers:['Mark Waid']},{test:/Batman #153|Batman #158|Batman #162/,writers:['Chip Zdarsky','Jeph Loeb']},
    {test:/Batman \(2025\)/,writers:['Matt Fraction']},{test:/Superman #/,writers:['Joshua Williamson']},{test:/Wonder Woman/,writers:['Tom King']},
    {test:/World’s Finest/,writers:['Mark Waid']},{test:/Action Comics/,writers:['Mark Waid']},{test:/Supergirl/,writers:['Sophie Campbell']},
    {test:/The Flash/,writers:['Si Spurrier','Mark Waid']},{test:/Titans/,writers:['John Layman']},{test:/DC K\.O\./,writers:['Scott Snyder','Joshua Williamson']},
    {test:/Aquaman|Emperor Aquaman/,writers:['Jeremy Adams']}
  ],
  extraEntries:[
    {id:'allin-opening-special',routeId:'universe-spine',phaseId:'ai-b1',title:'DC All In Special #1',year:'2024',writers:['Scott Snyder','Joshua Williamson'],summary:'The main DCU reorganises after Absolute Power while Darkseid’s plan creates the Absolute Universe.',issues:[DC_ALL_IN_SPECIAL_1],priority:'core'},
    {id:'allin-wf-37',routeId:'universe-spine',phaseId:'ai-b2',title:'Batman/Superman: World’s Finest #37',year:'2025',writers:['Mark Waid'],summary:'A bridge into We Are Yesterday.',issues:[issue('Batman/Superman: World’s Finest',2022,37,2025)],priority:'important'},
    {id:'allin-batman-2025-2-4',routeId:'bat-family',phaseId:'ai-b4',title:'Batman (2025) #2–4',year:'2025–2026',writers:['Matt Fraction'],summary:'The new Batman run continues through the DC K.O. period.',issues:range('Batman',2025,2,4,2026),priority:'core'},
    {id:'allin-detective-1090-1096',routeId:'bat-family',phaseId:'ai-b1',title:'Detective Comics #1090–1096',year:'2024–2025',writers:['Tom Taylor'],summary:'Tom Taylor begins a new mystery-driven Detective Comics run.',issues:range('Detective Comics',1937,1090,1096,2025),priority:'important'},
    {id:'allin-detective-1097-1106',routeId:'bat-family',phaseId:'ai-b3',title:'Detective Comics #1097–1106',year:'2025–2026',writers:['Tom Taylor'],summary:'The Detective Comics run continues toward the current arc.',issues:range('Detective Comics',1937,1097,1106,2026),priority:'important'},
    {id:'allin-wonder-woman-19-25',routeId:'wonder-woman-amazons',phaseId:'ai-b2',title:'Wonder Woman #19–25',year:'2025',writers:['Tom King'],summary:'Diana’s war with the Sovereign moves into its next movement.',issues:range('Wonder Woman',2023,19,25,2025),priority:'core'},
    {id:'allin-wonder-woman-26-30',routeId:'wonder-woman-amazons',phaseId:'ai-b4',title:'Wonder Woman #26–30',year:'2025–2026',writers:['Tom King'],summary:'The Wonder Woman saga continues through the K.O. period.',issues:range('Wonder Woman',2023,26,30,2026),priority:'core'},
    {id:'allin-worlds-finest-44-49',routeId:'universe-spine',phaseId:'ai-b4',title:'Batman/Superman: World’s Finest #44–49',year:'2025–2026',writers:['Mark Waid'],summary:'World’s Finest continues between We Are Yesterday and its fiftieth issue.',issues:range('Batman/Superman: World’s Finest',2022,44,49,2026),priority:'great-story'},
    {id:'allin-action-1093-1099',routeId:'superman-family',phaseId:'ai-b5',title:'Action Comics #1093–1099',year:'2025–2026',writers:['Mark Waid'],summary:'The Superman: Superstars period continues through June 2026.',issues:range('Action Comics',1938,1093,1099,2026),priority:'core'},
    {id:'allin-supergirl-3-11',routeId:'superman-family',phaseId:'ai-b3',title:'Supergirl (2025) #3–11',year:'2025–2026',writers:['Sophie Campbell'],summary:'Kara’s new solo series develops between its launch and current issues.',issues:range('Supergirl',2025,3,11,2026),priority:'important'},
    {id:'allin-aquaman-1-10',routeId:'aquaman-atlantis',phaseId:'ai-b2',title:'Aquaman (2025) #1–10',year:'2025',writers:['Jeremy Adams'],summary:'Arthur returns to a new oceanic mystery that leads into DC K.O.',issues:range('Aquaman',2025,1,10,2025),priority:'core'},
    {id:'allin-flash-34',routeId:'flash-family',phaseId:'ai-b5',title:'The Flash #34',year:'2026',writers:['Ryan North'],summary:'The Flash enters its new creative direction in the June 2026 issue.',issues:[issue('The Flash',2023,34,2026)],priority:'important'}
  ],
  events:[
    {id:'we-are-yesterday',title:'We Are Yesterday',year:'2025',type:'major-crossover',phaseId:'ai-b2',architect:'Mark Waid',summary:'The Legion of Doom attacks the Justice League across past and present.',chapters:[issue('Batman/Superman: World’s Finest',2022,38,2025),issue('Justice League Unlimited',2024,6,2025),annual('Batman/Superman: World’s Finest',2025,1,2025),issue('Batman/Superman: World’s Finest',2022,39,2025),issue('Justice League Unlimited',2024,7,2025),issue('Justice League Unlimited',2024,8,2025)],sourceItemIds:['ai-2-jlu-part-2'],legacyIds:['ai-2-jlu'],routeIds:['universe-spine'],next:'Continue Justice League Unlimited #9 and World’s Finest #40.'},
    {id:'dc-ko',title:'DC K.O.',year:'2025–2026',type:'hard-gate',phaseId:'ai-b4',architect:'Scott Snyder and Joshua Williamson',summary:'The heroes enter a tournament for Omega Energy as Darkseid’s endgame closes around the DC Universe.',sourceItemIds:['ai-4-omega','ai-4-ko','ai-4-knight','ai-4-one-part-1','ai-4-one-part-2','ai-4-one-part-3','ai-4-one-part-4','ai-4-one-part-5','ai-4-one-part-6','ai-4-one-part-7','ai-4-ties-part-1','ai-4-ties-part-2','ai-4-ties-part-3','ai-4-ties-part-4','ai-4-ties-part-5'],routeIds:['universe-spine','superman-family','flash-family','titans-young-heroes','aquaman-atlantis','green-lantern-corps','bat-family','wonder-woman-amazons'],next:'Continue into DC All In Act II and the post-K.O. runs.'}
  ]
};
