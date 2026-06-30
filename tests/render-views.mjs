globalThis.localStorage={getItem(){return null;},setItem(){},removeItem(){}};
globalThis.matchMedia=()=>({matches:false,addEventListener(){}});
const [{ERA_INDEX,loadEra},{prepareStructuredEra},structured,{renderOutsideRoadmap},{renderCompletedLibrary},{renderGreatStories},{renderStats},{renderSpecialCollections},{default:legacy},{renderLegacyEra}] = await Promise.all([
  import('../data/era-index.js'),
  import('../assets/js/data-model.js'),
  import('../components/structured-views.js'),
  import('../components/outside-roadmap-view.js'),
  import('../components/completed-view.js'),
  import('../components/great-stories-view.js'),
  import('../components/stats-view.js'),
  import('../components/special-collections-view.js'),
  import('../data/eras/post-crisis/index.js'),
  import('../components/legacy-view.js')
]);
const models=[];
const outputs=[renderLegacyEra(legacy),renderOutsideRoadmap()];
for (const meta of ERA_INDEX.filter(era=>era.format==='structured')) {
  const model=prepareStructuredEra(await loadEra(meta.id)); models.push(model);
  outputs.push(structured.renderMasterFlow(model),structured.renderRoutes(model),structured.renderEvents(model));
  for(const route of model.routes.values()) outputs.push(structured.renderRoutes(model,route.id));
  for(const event of model.events.values()) outputs.push(structured.renderEvents(model,event.id));
}
outputs.push(renderCompletedLibrary(models),renderGreatStories(models),renderStats(models),renderSpecialCollections('elseworlds'),renderSpecialCollections('collaborations'));
if(outputs.some(output=>typeof output!=='string'||!output.length)) throw new Error('A view returned empty output');
for (const phrase of ['Outside the Roadmap','Rebirth to Dark Nights: Metal','Post-Metal','Infinite Frontier','Dawn of DC','DC All In','Absolute Universe','Great Stories','Stats','Elseworlds & Collaborations','DC × Marvel']) {
  if(!outputs.some(output=>output.includes(phrase))) throw new Error(`${phrase} did not render`);
}
console.log('Rendered',outputs.length,'views successfully');
