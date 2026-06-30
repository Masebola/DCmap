import { combine, entry, range, route, routeBlock, special } from '../../../shared/helpers.js';

export const entries = [
  entry({id:'rb-titans-return-wally',routeId:'titans-young-heroes',phaseId:'rb-phase-1',title:'Titans: Rebirth #1 and Titans #1–6: The Return of Wally West',year:'2016',writers:['Dan Abnett'],artists:['Brett Booth'],summary:'Wally reunites with the Titans and restores the memories of a friendship stolen from history.',issues:combine([special('Titans: Rebirth',2016)],range('Titans',2016,1,6,2016)),priority:'core',legacyIds:['rb-1-jl3']}),
  entry({id:'rb-teen-titans-damian-team',routeId:'titans-young-heroes',phaseId:'rb-phase-1',title:'Teen Titans: Rebirth #1 and Teen Titans #1–7',year:'2016–2017',writers:['Benjamin Percy'],artists:['Jonboy Meyers','Khoi Pham'],summary:'Damian Wayne abducts a new team and slowly learns that leadership cannot be forced.',issues:combine([special('Teen Titans: Rebirth',2016)],range('Teen Titans',2016,1,7,2017)),priority:'optional',legacyIds:['rb-1-jl4']}),
  entry({id:'rb-titans-made-manhattan',routeId:'titans-young-heroes',phaseId:'rb-phase-2',title:'Titans #7–10: Made in Manhattan',year:'2017',writers:['Dan Abnett'],artists:['Brett Booth'],summary:'The Titans establish themselves in New York while old enemies exploit Wally’s return.',issues:range('Titans',2016,7,10,2017),priority:'core',legacyIds:['rb-2-jl1']}),
  entry({id:'rb-titans-aftermath',routeId:'titans-young-heroes',phaseId:'rb-phase-4',title:'Titans #12–18',year:'2017',writers:['Dan Abnett'],artists:['Kenneth Rocafort','Brett Booth'],summary:'The team deals with the Lazarus Contract and a threat tied to Donna Troy’s possible future.',issues:range('Titans',2016,12,18,2017),priority:'important',legacyIds:['rb-4-ww','rb-5-jl1']}),
  entry({id:'rb-teen-titans-blood-mettle',routeId:'titans-young-heroes',phaseId:'rb-phase-4',title:'Teen Titans #9–11',year:'2017',writers:['Benjamin Percy'],artists:['Khoi Pham'],summary:'The young team continues after Lazarus Contract and approaches the Gotham Resistance crossover.',issues:range('Teen Titans',2016,9,11,2017),priority:'optional',legacyIds:['rb-5-jl1']})
];

export const routeData = route({id:'titans-young-heroes',title:'Titans & Young Heroes',shortTitle:'Titans & Young Heroes',icon:'★',accent:'purple',description:'Wally’s Titans return, Damian’s Teen Titans and the contracts that bind them to Deathstroke.',blocks:[
  routeBlock({id:'rb-titans-launch',title:'Two Generations of Titans',year:'2016–2017',mode:'parallel',steps:['rb-titans-return-wally','rb-teen-titans-damian-team','rb-titans-made-manhattan']}),
  routeBlock({id:'rb-titans-lazarus',title:'The Lazarus Contract',year:'2017',mode:'strict',steps:['the-lazarus-contract']}),
  routeBlock({id:'rb-titans-after',title:'After the Contract',year:'2017',mode:'parallel',steps:['rb-titans-aftermath','rb-teen-titans-blood-mettle']}),
  routeBlock({id:'rb-titans-metal',title:'Dark Nights: Metal',year:'2017–2018',mode:'strict',steps:['dark-nights-metal']})
]});
