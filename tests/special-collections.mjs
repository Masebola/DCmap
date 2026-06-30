globalThis.localStorage={getItem(){return null;},setItem(){},removeItem(){}};
globalThis.matchMedia=()=>({matches:false,addEventListener(){}});

const [specials, view, outside] = await Promise.all([
  import('../data/special-collections.js'),
  import('../components/special-collections-view.js'),
  import('../components/outside-roadmap-view.js')
]);

const ids = new Set();
for (const item of specials.SPECIAL_COLLECTIONS) {
  if (ids.has(item.id)) throw new Error(`Duplicate special collection id: ${item.id}`);
  ids.add(item.id);
  if (!['elseworlds','collaborations'].includes(item.section)) throw new Error(`Invalid section on ${item.id}`);
  if (!item.group || !item.title || !item.years || !item.summary) throw new Error(`Missing metadata on ${item.id}`);
  if (!Array.isArray(item.issues) || !item.issues.length) throw new Error(`No issues on ${item.id}`);
  const issueIds = item.issues.map(issue => issue.id);
  if (new Set(issueIds).size !== issueIds.length) throw new Error(`Duplicate issue inside ${item.id}`);
}

const elseworlds = view.renderSpecialCollections('elseworlds');
const collaborations = view.renderSpecialCollections('collaborations');
if (!elseworlds.includes('Elseworlds / Black Label')) throw new Error('Elseworlds shelf did not render.');
if (!elseworlds.includes('Kingdom Come')) throw new Error('Classic Elseworlds title missing.');
if (!collaborations.includes('DC × Marvel')) throw new Error('DC × Marvel group missing.');
if (!collaborations.includes('Batman/TMNT')) throw new Error('Other-publisher collaboration missing.');

view.setSpecialFilter('search','Kingdom Come');
const searched = view.renderSpecialCollections('elseworlds');
if (!searched.includes('Kingdom Come') || searched.includes('Superman: Red Son')) throw new Error('Special shelf search filtering failed.');
view.resetSpecialFilters();

outside.setOutsideFilter('era','New 52');
let outsideHtml = outside.renderOutsideRoadmap();
if (!outsideHtml.includes('Red Hood and the Outlaws (2011)')) throw new Error('Outside Roadmap era filter removed matching item.');
if (outsideHtml.includes('Red Hood and the Outlaws (2016)')) throw new Error('Outside Roadmap era filter retained non-matching item.');
outside.setOutsideFilter('search','Futures End');
outsideHtml = outside.renderOutsideRoadmap();
if (!outsideHtml.includes('Futures End') || outsideHtml.includes('Batman Eternal')) throw new Error('Outside Roadmap search filter failed.');
outside.resetOutsideFilters();

console.log(`Validated ${specials.SPECIAL_COLLECTIONS.length} special-shelf works and interactive filters.`);
