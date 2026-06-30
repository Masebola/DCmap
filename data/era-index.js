export const ERA_INDEX = [
  { id:'post-crisis', label:'Crisis → Zero Hour', dates:'1985–1994', format:'legacy', loader:()=>import('./eras/post-crisis/index.js') },
  { id:'zh-ic', label:'Zero Hour → IC', dates:'1994–2006', format:'legacy', loader:()=>import('./eras/zero-hour-to-infinite-crisis/index.js') },
  { id:'52-fc', label:'52 → Final Crisis', dates:'2006–2008', format:'legacy', loader:()=>import('./eras/52-to-final-crisis/index.js') },
  { id:'pfc-bn', label:'Post-FC → Blackest Night', dates:'2008–2010', format:'legacy', loader:()=>import('./eras/post-final-crisis/index.js') },
  { id:'pbn', label:'Post-BN → Flashpoint', dates:'2010–2011', format:'legacy', loader:()=>import('./eras/post-blackest-night/index.js') },
  { id:'new52', label:'New 52', dates:'2011–2016', format:'structured', loader:()=>import('./eras/new52/index.js') },
  { id:'rebirth', label:'Rebirth → Metal', dates:'2016–2018', format:'structured', loader:()=>import('./eras/rebirth/index.js') },
  { id:'post-metal', label:'Post-Metal → IF', dates:'2018–2021', format:'structured', loader:()=>import('./eras/post-metal/index.js') },
  { id:'if-dc', label:'Infinite Frontier', dates:'2021–2023', format:'structured', loader:()=>import('./eras/infinite-frontier/index.js') },
  { id:'dod', label:'Dawn of DC', dates:'2023–2024', format:'structured', loader:()=>import('./eras/dawn-of-dc/index.js') },
  { id:'allin', label:'DC All In', dates:'2024–2026', format:'structured', loader:()=>import('./eras/all-in/index.js') },
  { id:'absolute', label:'Absolute Universe', dates:'2024–2026', format:'structured', loader:()=>import('./eras/absolute/index.js') }
];

const cache = new Map();
export async function loadEra(id) {
  if (cache.has(id)) return cache.get(id);
  const meta = ERA_INDEX.find(era => era.id === id) || ERA_INDEX[5];
  const module = await meta.loader();
  const data = module.default;
  cache.set(meta.id, data);
  return data;
}
