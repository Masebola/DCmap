export const STANDARD_ROUTES = [
  { id:'universe-spine', title:'Universe Spine', shortTitle:'Universe Spine', icon:'🌐', accent:'gold', description:'The central continuity, Justice League line and universe-wide events.' },
  { id:'bat-family', title:'Bat-Family', shortTitle:'Bat-Family', icon:'🦇', accent:'blue', description:'Batman, Nightwing, Robin, Detective Comics and Gotham-connected stories.' },
  { id:'superman-family', title:'Superman Family', shortTitle:'Superman', icon:'◆', accent:'red', description:'Superman, Action Comics, Supergirl and the wider House of El.' },
  { id:'flash-family', title:'Flash Family', shortTitle:'Flash', icon:'⚡', accent:'yellow', description:'Barry, Wally and speed-force stories.' },
  { id:'green-lantern-corps', title:'Green Lantern Corps', shortTitle:'Green Lantern', icon:'◉', accent:'green', description:'Earth’s Lanterns, the Corps and cosmic ring mythology.' },
  { id:'titans-young-heroes', title:'Titans & Young Heroes', shortTitle:'Titans', icon:'★', accent:'purple', description:'Titans, Teen Titans, Robin-led teams and younger generations.' },
  { id:'wonder-woman-amazons', title:'Wonder Woman & Amazons', shortTitle:'Wonder Woman', icon:'✦', accent:'pink', description:'Diana, the Amazons and connected mythological stories.' },
  { id:'aquaman-atlantis', title:'Aquaman & Atlantis', shortTitle:'Aquaman', icon:'♆', accent:'cyan', description:'Arthur, Mera, Jackson and the kingdoms beneath the sea.' },
  { id:'green-arrow-family', title:'Green Arrow Family', shortTitle:'Green Arrow', icon:'➶', accent:'lime', description:'Oliver Queen, Black Canary and Star City.' },
  { id:'dark-supernatural', title:'Dark & Supernatural', shortTitle:'Dark', icon:'☾', accent:'violet', description:'Magic, horror, Justice League Dark and supernatural corners.' },
  { id:'extra-heroes', title:'Extra Heroes', shortTitle:'Extra Heroes', icon:'✧', accent:'orange', description:'Strong supporting runs and characters outside the main families.' }
];

export const ABSOLUTE_ROUTES = [
  { id:'absolute-batman', title:'Absolute Batman', shortTitle:'Batman', icon:'🦇', accent:'blue', description:'Bruce Wayne’s brutal reinvention on the Absolute Earth.' },
  { id:'absolute-wonder-woman', title:'Absolute Wonder Woman', shortTitle:'Wonder Woman', icon:'✦', accent:'pink', description:'Diana’s witch-forged mythology and impossible mission.' },
  { id:'absolute-superman', title:'Absolute Superman', shortTitle:'Superman', icon:'◆', accent:'red', description:'Kal-El against Lazarus Corporation and an unfamiliar world.' },
  { id:'absolute-flash', title:'Absolute Flash', shortTitle:'Flash', icon:'⚡', accent:'yellow', description:'Wally West without the traditional Speed Force or Flash family.' },
  { id:'absolute-martian-manhunter', title:'Absolute Martian Manhunter', shortTitle:'Martian Manhunter', icon:'◈', accent:'green', description:'A psychological and cosmic reinvention of the Martian Manhunter.' },
  { id:'absolute-green-lantern', title:'Absolute Green Lantern', shortTitle:'Green Lantern', icon:'◉', accent:'cyan', description:'Jo Mullein and Earth’s transformation under alien light.' },
  { id:'absolute-expansion', title:'Absolute Expansion', shortTitle:'Expansion', icon:'✧', accent:'orange', description:'Line-wide specials and later Absolute launches.' }
];

export function resolveStandardRoute(item, section = {}, block = {}) {
  const title = String(item.t || '');
  const lower = title.toLowerCase();
  const sectionName = String(section.label || '').toLowerCase();
  if (/batman|detective comics|detective #|nightwing|robin|catwoman|harley quinn|joker|fear state|gotham war|dark detective|next batman/.test(lower)) return 'bat-family';
  if (/superman|action comics|action #|supergirl|power girl|house of el|man of steel/.test(lower)) return 'superman-family';
  if (/the flash|flash forward|speed metal/.test(lower)) return 'flash-family';
  if (/green lantern|hal jordan|\bgl #/.test(lower)) return 'green-lantern-corps';
  if (/titans|teen titans|young justice|beast world|wonder girl/.test(lower)) return 'titans-young-heroes';
  if (/wonder woman|amazon|nubia/.test(lower)) return 'wonder-woman-amazons';
  if (/aquaman|atlantis|drowned earth|emperor aquaman/.test(lower)) return 'aquaman-atlantis';
  if (/green arrow|star city/.test(lower)) return 'green-arrow-family';
  if (/justice league dark|swamp thing|zatanna|constantine|deadly green|dark fate/.test(lower)) return 'dark-supernatural';
  if (/justice league|infinite frontier|doomsday clock|dark crisis|death metal|year of the villain|hell arisen|no justice|absolute power|dc all in|dc k\.o\.|omega act|event leviathan|heroes in crisis/.test(lower)) return 'universe-spine';
  if (sectionName.includes('spine')) return 'universe-spine';
  return 'extra-heroes';
}

export function resolveAbsoluteRoute(item) {
  const title = String(item.t || '').toLowerCase();
  if (title.includes('absolute batman')) return 'absolute-batman';
  if (title.includes('absolute wonder woman')) return 'absolute-wonder-woman';
  if (title.includes('absolute superman')) return 'absolute-superman';
  if (title.includes('absolute flash')) return 'absolute-flash';
  if (title.includes('absolute martian manhunter')) return 'absolute-martian-manhunter';
  if (title.includes('absolute green lantern')) return 'absolute-green-lantern';
  return 'absolute-expansion';
}
