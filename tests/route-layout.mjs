globalThis.localStorage={getItem(){return null;},setItem(){},removeItem(){}};
globalThis.matchMedia=()=>({matches:false,addEventListener(){}});
const [{ERA_INDEX,loadEra},{prepareStructuredEra},views]=await Promise.all([
  import('../data/era-index.js'),import('../assets/js/data-model.js'),import('../components/structured-views.js')
]);
for (const meta of ERA_INDEX.filter(era=>era.format==='structured')) {
  const model=prepareStructuredEra(await loadEra(meta.id));
  const route=[...model.routes.values()][0];
  const html=views.renderRoutes(model,route.id);
  if(!html.includes('Completed library')) throw new Error(`${meta.id}: route completion toolbar missing`);
  if(!html.includes('Optional')) throw new Error(`${meta.id}: optional filter missing`);
  if(!html.includes('route-block')) throw new Error(`${meta.id}: route blocks missing`);
}
const allIn=prepareStructuredEra(await loadEra('allin'));
views.toggleInlineEntry('ai-1-jlu');
views.toggleInlineEvent('we-are-yesterday');
const html=views.renderRoutes(allIn,'universe-spine');
if(!html.includes('inline-issue-panel')) throw new Error('Inline issue panel did not render');
if(!html.includes('inline-event-order')) throw new Error('Inline event order did not render');
console.log('Route layout controls passed across every structured era.');
