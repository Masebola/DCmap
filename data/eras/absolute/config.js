import { issue, range } from '../../shared/helpers.js';
import { ABSOLUTE_ROUTES, resolveAbsoluteRoute } from '../../shared/modern-route-config.js';
import { DC_ALL_IN_SPECIAL_1 } from '../../shared/bridge-issues.js';

const isAbsolute = (item, section) => /absolute universe/i.test(section?.label || '') || /^Absolute /i.test(item.t || '') || /Free Comic Book Day 2025: DC All In/i.test(item.t || '');

export const config = {
  id:'absolute',
  label:'Absolute Universe',
  title:'The Absolute Universe',
  subtitle:'A harsher world forged by Darkseid',
  dates:'October 2024 – June 2026',
  description:'Track the Absolute line separately from the main DCU. Each title can be read independently until line-wide specials begin connecting the new world.',
  asOf:'2026-06-30',
  openingIssue:DC_ALL_IN_SPECIAL_1,
  routes:ABSOLUTE_ROUTES,
  includeItem(item, section){ return isAbsolute(item, section); },
  resolveRoute:resolveAbsoluteRoute,
  seriesYears:{
    'Absolute Batman':2024,'Absolute Wonder Woman':2024,'Absolute Superman':2024,'Absolute Flash':2025,
    'Absolute Martian Manhunter':2025,'Absolute Green Lantern':2025,'Free Comic Book Day 2025: DC All In Special Edition':2025,
    'Absolute Evil':2025,'Absolute Batman 2025 Annual':2025,'Absolute Batman: Ark M':2026,'Absolute Wonder Woman 2026 Annual':2026,
    'Absolute Green Arrow':2026
  },
  itemOverrides:{
    'ai-5-ab':{title:'Absolute Batman #19–21',issues:range('Absolute Batman',2024,19,21,2026),writers:['Scott Snyder'],summary:'The Absolute Dark Knight continues through the June 2026 issue.'},
    'ai-5-aww-part-1':{title:'Absolute Wonder Woman #19–20',issues:range('Absolute Wonder Woman',2024,19,20,2026),writers:['Kelly Thompson'],summary:'Season of the Witch reaches its twentieth issue.'},
    'ai-5-as':{title:'Absolute Superman #18–20',issues:range('Absolute Superman',2024,18,20,2026),writers:['Jason Aaron'],summary:'The Absolute Man of Steel continues through June 2026.'},
    'ai-4-wave-part-2':{title:'Absolute Martian Manhunter #8–11',issues:range('Absolute Martian Manhunter',2025,8,11,2026),writers:['Deniz Camp'],summary:'John Jones and the Martian reach the latest published issue as of June 2026.'},
    'ai-5-wave-part-1':{title:'Absolute Flash #14–16',issues:range('Absolute Flash',2025,14,16,2026),writers:['Jeff Lemire'],summary:'Wally’s second year continues through issue #16.'},
    'ai-5-wave-part-2':{exclude:true},
    'ai-5-wave-part-3':{title:'Absolute Green Lantern #14–15',issues:range('Absolute Green Lantern',2025,14,15,2026),writers:['Al Ewing'],summary:'Jo Mullein’s cosmic journey continues through June 2026.'}
  },
  creatorRules:[
    {test:/Absolute Batman/,writers:['Scott Snyder']},{test:/Absolute Wonder Woman/,writers:['Kelly Thompson']},
    {test:/Absolute Superman/,writers:['Jason Aaron']},{test:/Absolute Flash/,writers:['Jeff Lemire']},
    {test:/Absolute Martian Manhunter/,writers:['Deniz Camp']},{test:/Absolute Green Lantern/,writers:['Al Ewing']},
    {test:/Absolute Evil/,writers:['Al Ewing']},{test:/Absolute Green Arrow/,writers:['Pornsak Pichetshote']}
  ],
  extraEntries:[
    {id:'absolute-opening-special',routeId:'absolute-expansion',phaseId:'ai-b1',title:'DC All In Special #1',year:'2024',writers:['Scott Snyder','Joshua Williamson'],summary:'Darkseid’s actions create the Absolute Universe and establish its relationship to the main DCU.',issues:[DC_ALL_IN_SPECIAL_1],priority:'core'}
  ],
  events:[
    {id:'absolute-evil',title:'Absolute Evil',year:'2025',type:'major-crossover',phaseId:'ai-b4',architect:'Al Ewing',summary:'The forces shaping the Absolute Universe move into the open and connect its expanding cast.',sourceItemIds:['ai-4-evil'],routeIds:['absolute-batman','absolute-wonder-woman','absolute-superman','absolute-flash','absolute-martian-manhunter','absolute-green-lantern','absolute-expansion'],next:'Continue each Absolute title in its own route.'}
  ]
};
