globalThis.localStorage={getItem(){return null;},setItem(){},removeItem(){}};
globalThis.matchMedia=()=>({matches:false,addEventListener(){}});
const [{ERA_INDEX,loadEra},{prepareStructuredEra},{STRUCTURED_MAIN_ISSUE_IDS,STRUCTURED_ERA_IDS,STRUCTURED_LEGACY_IDS,ERA_TOTALS},{globalStats},{store}] = await Promise.all([
  import('../data/era-index.js'),import('../assets/js/data-model.js'),import('../data/progress-manifest.js'),import('../assets/js/progress.js'),import('../assets/js/state.js')
]);
const ids=ERA_INDEX.filter(era=>era.format==='structured').map(era=>era.id);
if(JSON.stringify(ids)!==JSON.stringify(STRUCTURED_ERA_IDS)) throw new Error('Structured era manifest is stale.');
const union=new Set();
for(const id of ids){const model=prepareStructuredEra(await loadEra(id));model.mainIssues.forEach((_,key)=>union.add(key));if(ERA_TOTALS[id]!==model.mainIssues.size)throw new Error(`${id} manifest total mismatch`);}
if(union.size!==STRUCTURED_MAIN_ISSUE_IDS.length) throw new Error(`Structured union mismatch: ${union.size} vs ${STRUCTURED_MAIN_ISSUE_IDS.length}`);
const testIssue=STRUCTURED_MAIN_ISSUE_IDS[0]; const alias=STRUCTURED_LEGACY_IDS[0];
store.value.issueProgress[testIssue]=true; store.value.legacyProgress[alias]=999;
const stats=globalStats();
const legacyBase=Object.entries(ERA_TOTALS).filter(([id])=>!STRUCTURED_ERA_IDS.includes(id)).reduce((sum,[,n])=>sum+n,0);
if(stats.total!==legacyBase+STRUCTURED_MAIN_ISSUE_IDS.length) throw new Error('Global total double-counts structured eras.');
if(stats.read!==1) throw new Error(`Migrated legacy progress was double-counted: ${stats.read}`);
console.log('Library accounting and cross-era deduplication passed.');
