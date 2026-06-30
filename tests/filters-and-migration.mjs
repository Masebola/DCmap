const rebirthEra=(await import('../data/eras/rebirth/index.js')).default;
const completedEntry=rebirthEra.entries.find(entry=>entry.id==='rb-batman-i-am-gotham');
const issueProgress=Object.fromEntries(completedEntry.issues.map(issue=>[issue.id,true]));
const saved={version:6,issueProgress,legacyProgress:{'rb-1-sp1':7},essentials:[],preferences:{theme:'system',routeView:'reading',includeOptional:false,autoHideCompleted:true,activeLanes:{rebirth:['bat-family']}},migrations:{},recent:[]};
globalThis.localStorage={getItem(key){return key==='dcrt-v6-state'?JSON.stringify(saved):null;},setItem(){},removeItem(){}};
globalThis.matchMedia=()=>({matches:false,addEventListener(){}});
const [{prepareStructuredEra},{store,migrateStructuredAliases},views] = await Promise.all([
  import('../assets/js/data-model.js'),
  import('../assets/js/state.js'),
  import('../components/structured-views.js')
]);
const model=prepareStructuredEra(rebirthEra);
migrateStructuredAliases(model);
let html=views.renderRoutes(model,'bat-family');
if(html.includes('data-entry-id="rb-batman-i-am-gotham"')) throw new Error('Completed entry was not auto-hidden.');
if(html.includes('Batgirl: Rebirth #1 and Batgirl #1–6')) throw new Error('Optional entry was not filtered.');
store.setRouteView('all');
html=views.renderRoutes(model,'bat-family');
if(!html.includes('data-entry-id="rb-batman-i-am-gotham"')) throw new Error('All view did not restore completed entry.');
const migrated=rebirthEra.entries.find(entry=>entry.id==='rb-superman-son').issues.filter(issue=>store.value.issueProgress[issue.id]).length;
if(migrated!==7) throw new Error(`Expected 7 migrated Superman issues, found ${migrated}.`);
store.setRouteView('reading');
const flow=views.renderMasterFlow(model);
if(!flow.includes('Bat-Family')) throw new Error('Selected lane missing from Master Flow.');
if(flow.includes('Superman Family</h3>')) throw new Error('Inactive lane still visible in Master Flow.');
console.log('Filters, auto-hide, active lanes and Rebirth migration passed.');
