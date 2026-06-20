import { annual, combine, entry, issue, range, route, special } from '../helpers.js';

export const entries = [
  entry({id:'earth-2',routeId:'extra-worlds',phaseId:'n52-phase-1',title:'Earth 2 through #26',year:'2012–2014',summary:'A bold reinvention of the Justice Society legacy with Jay Garrick, Alan Scott, Hawkgirl and Val-Zod.',issues:combine(range('Earth 2',2012,1,26,2014),[issue('Earth 2',2012,0,2012),annual('Earth 2',2012,1,2013),annual('Earth 2',2012,2,2014)]),priority:'recommended',stop:'Stop after #26; skip World’s End and Earth 2: Society.'}),
  entry({id:'all-star-western',routeId:'extra-worlds',phaseId:'n52-phase-1',title:'All-Star Western',year:'2011–2014',summary:'Jonah Hex and Amadeus Arkham move through nineteenth-century Gotham and a later modern-day detour.',issues:combine(range('All-Star Western',2011,1,34,2014),[issue('All-Star Western',2011,0,2012)]),priority:'recommended'}),
  entry({id:'multiversity',routeId:'extra-worlds',phaseId:'n52-phase-5',title:'The Multiversity',year:'2014–2015',summary:'Grant Morrison maps the DC Multiverse through interconnected worlds, genres and metafiction.',issues:[
    issue('The Multiversity',2014,1,2014),
    special('The Multiversity: The Society of Super-Heroes',2014),
    special('The Multiversity: The Just',2014),
    special('The Multiversity: Pax Americana',2014),
    special('The Multiversity: Thunderworld Adventures',2014),
    special('The Multiversity Guidebook',2015),
    special('The Multiversity: Mastermen',2015),
    special('The Multiversity: Ultra Comics',2015),
    issue('The Multiversity',2014,2,2015)
  ],priority:'highly-recommended'}),
  entry({id:'batman-beyond-extra',routeId:'extra-worlds',phaseId:'n52-phase-1',title:'Batman Beyond Animated-Continuity Route',year:'2010–2014',summary:'Terry McGinnis’ strongest pre-Rebirth comics continuation of the animated future.',issues:combine(range('Batman Beyond: Hush Beyond',2010,1,6,2011),range('Batman Beyond',2011,1,8,2011),range('Batman Beyond Unlimited',2012,1,18,2013),range('Batman Beyond Universe',2013,1,16,2014)),priority:'recommended'}),
  entry({id:'omega-men-extra-note',routeId:'extra-worlds',phaseId:'n52-phase-5',title:'Omega Men cross-route note',year:'2015–2016',summary:'The Omega Men is tracked in the Green Lantern lane because Kyle Rayner is the central DC connection.',issues:[],priority:'note'})
];

export const routeData = route({
  id:'extra-worlds',title:'Extra Worlds and Standalones',shortTitle:'Extra Worlds',icon:'∞',accent:'teal',description:'Alternate worlds, westerns, Multiversity and standalone gems that do not obey the main continuity gates.',
  steps:['earth-2','all-star-western','batman-beyond-extra','multiversity','omega-men-extra-note']
});
