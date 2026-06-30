import { combine, entry, range, route, routeBlock, special } from '../../../shared/helpers.js';

export const entries = [
  entry({id:'rb-wonder-woman-rucka',routeId:'wonder-woman-amazons',phaseId:'rb-phase-1',title:'Wonder Woman: Rebirth #1 and Wonder Woman #1–25: The Lies, Year One, The Truth and Godwatch',year:'2016–2017',writers:['Greg Rucka'],artists:['Liam Sharp','Nicola Scott','Bilquis Evely'],summary:'Diana investigates her false memories while her origin, friendship with Barbara Minerva and relationship with Themyscira are rebuilt.',issues:combine([special('Wonder Woman: Rebirth',2016)],range('Wonder Woman',2016,1,25,2017)),priority:'core',legacyIds:['rb-1-ww','rb-2-ww','rb-3-jl','rb-4-ww','rb-5-ww']}),
  entry({id:'rb-wonder-woman-annual',routeId:'wonder-woman-amazons',phaseId:'rb-phase-5',title:'Wonder Woman Annual #1',year:'2017',writers:['Greg Rucka and others'],artists:['Nicola Scott and others'],summary:'A collection of stories, including Diana’s first Rebirth-era meeting with Batman and Superman.',issues:[special('Wonder Woman Annual',2017)],priority:'great-story'})
];

export const routeData = route({id:'wonder-woman-amazons',title:'Wonder Woman & Amazons',shortTitle:'Wonder Woman',icon:'W',accent:'gold',description:'Greg Rucka’s complete Rebirth restoration of Diana, Cheetah and Themyscira.',blocks:[
  routeBlock({id:'rb-ww-complete',title:'Greg Rucka’s Wonder Woman',year:'2016–2017',mode:'sequential',description:'The odd and even issues alternate between the present-day mystery and Year One. Read them in publication order.',steps:['rb-wonder-woman-rucka','rb-wonder-woman-annual']})
]});
