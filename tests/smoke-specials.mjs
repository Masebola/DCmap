class FakeClassList { add(){} remove(){} toggle(){} }
class FakeElement {
  constructor(id=''){this.id=id;this.innerHTML='';this.textContent='';this.value='';this.style={};this.dataset={};this.classList=new FakeClassList();this.open=false;}
  addEventListener(){}
  showModal(){this.open=true;}
  close(){this.open=false;}
}
const elements=new Map(['main','loading-bar','global-read','global-total','global-pct','global-bar','era-select','details-dialog','details-content','toast'].map(id=>[id,new FakeElement(id)]));
globalThis.document={
  body:new FakeElement('body'),
  documentElement:{dataset:{}},
  querySelector(selector){return selector.startsWith('#')?elements.get(selector.slice(1))||new FakeElement():new FakeElement();},
  querySelectorAll(){return [];},
  addEventListener(){}
};
globalThis.window=globalThis;
globalThis.location={hash:'#/specials/collaborations'};
globalThis.addEventListener=()=>{};
globalThis.matchMedia=()=>({matches:false,addEventListener(){}});
globalThis.localStorage={data:new Map(),getItem(k){return this.data.get(k)||null;},setItem(k,v){this.data.set(k,v);},removeItem(k){this.data.delete(k);}};
globalThis.scrollTo=()=>{};
globalThis.FileReader=class{};
await import('../assets/js/app.js');
await new Promise(resolve=>setTimeout(resolve,250));
const html=elements.get('main').innerHTML;
if(!html.includes('Elseworlds & Collaborations')) throw new Error('Special collection route did not render.');
if(!html.includes('DC × Marvel')) throw new Error('Collaboration group did not render.');
if(html.includes('That section could not be loaded')) throw new Error('Fatal render path shown.');
console.log('Special collections smoke render passed:', html.length, 'characters');
