globalThis.localStorage={getItem(){return null;},setItem(){},removeItem(){}};
globalThis.matchMedia=()=>({matches:false,addEventListener(){}});
const [{default:new52},{prepareStructuredEra},{renderMasterFlow,renderRoutes,renderEvents},{default:legacy},{renderLegacyEra}] = await Promise.all([
  import('../data/eras/new52/index.js'),
  import('../assets/js/data-model.js'),
  import('../components/structured-views.js'),
  import('../data/eras/post-crisis/index.js'),
  import('../components/legacy-view.js')
]);
const model=prepareStructuredEra(new52);
const outputs=[renderMasterFlow(model),renderRoutes(model),renderEvents(model),renderLegacyEra(legacy)];
for(const route of model.routes.values()) outputs.push(renderRoutes(model,route.id));
for(const event of model.events.values()) outputs.push(renderEvents(model,event.id));
if(outputs.some(output=>typeof output!=='string'||!output.length)) throw new Error('A view returned empty output');
console.log('Rendered',outputs.length,'views successfully');
