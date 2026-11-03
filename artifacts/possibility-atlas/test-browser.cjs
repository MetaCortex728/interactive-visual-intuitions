const assert=require('node:assert/strict');
const {suite,reopenWithSaved}=require('../../scripts/browser-harness.cjs');
const STORE_KEY='visual-intuitions:possibility-atlas';
suite('possibility-atlas',async({browser,newPage,url,shot,record})=>{
 const errors=[],layout=[],setup=async p=>{p.on('pageerror',e=>errors.push(e.message));await p.route(/^https?:/,r=>r.abort());};
 let page=await newPage({viewport:{width:1100,height:1100}});await setup(page);
 await page.goto(url('possibility-atlas.html'));await page.waitForFunction(()=>window.__possibilityAtlas);
 for(const width of [1100,390,320]){
  await page.setViewportSize({width,height:1100});
  for(let tab=0;tab<7;tab++){
   await page.evaluate(t=>window.__possibilityAtlas.select(t),tab);await page.waitForTimeout(180);
   const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,marks:document.querySelectorAll('#pa-a svg path,#pa-a svg rect,#pa-a svg line,#pa-a svg circle').length,bad:[...document.querySelectorAll('#possibility-atlas svg text')].filter(t=>{const a=t.getBBox(),s=t.ownerSVGElement.viewBox.baseVal;return a.x<-.5||a.x+a.width>s.width+.5;}).map(t=>t.textContent)}));
   assert(!result.overflow,`Horizontal overflow at ${width} px, tab ${tab}`);if(tab<6)assert(result.marks>0);else assert(await page.locator('[data-position]').count()>0);if(result.bad.length)layout.push({width,tab,bad:result.bad});
   for(let p=0;p<3;p++)await page.locator('#pa-proof-next').click();assert((await page.locator('#pa-proof-label').textContent()).includes('4 / 4'));
  }
 }
 await page.evaluate(()=>window.__possibilityAtlas.select(6));
 for(const dim of [1,2,3]){
  await page.getByRole('button',{name:dim+'D · '+3**dim+' positions',exact:true}).click();assert.equal(await page.locator('[data-position]').count(),3**dim);
  await page.locator('[data-position="0"]').click();await page.locator('[data-position="1"]').click();
  assert((await page.evaluate(()=>window.__possibilityAtlas.getState())).selected===-1);
  if(dim<3){for(let i=0;i<35;i++)await page.getByRole('button',{name:'Optimal next swap',exact:true}).click();assert((await page.locator('#pa-metrics').textContent()).includes('distance: 0'));}
  await page.waitForTimeout(120);const bounds=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,w:innerWidth}));assert(bounds.scroll<=bounds.w+1);
 }
 await page.getByRole('button',{name:'Reverse one recorded swap',exact:true}).click();
 for(const [shape,distance] of [['line',18],['grid',8]]){
  await page.getByRole('button',{name:'Same 9: '+shape,exact:true}).click();
  const snapshot=await page.evaluate(()=>{const s=window.__possibilityAtlas.getState(),m=window.__possibilityAtlas.model;return m.boardFromHistory(m.lattice(s.dim,s.lineNine),s.history);});
  assert.deepEqual(snapshot,[2,2,2,1,1,1,0,0,0]);assert((await page.locator('#pa-metrics').textContent()).includes('distance: '+distance));
 }
 await page.getByRole('button',{name:'3D · 27 positions',exact:true}).click();
 await page.emulateMedia({colorScheme:'dark',reducedMotion:'reduce'});await page.evaluate(()=>window.__possibilityAtlas.select(6));await page.setViewportSize({width:1100,height:1300});await page.waitForTimeout(200);await shot(page,'dimensions-dark.png',{fullPage:true});
 await page.emulateMedia({colorScheme:'light',reducedMotion:'no-preference'});
 await page.evaluate(()=>window.__possibilityAtlas.select(4));await page.getByRole('button',{name:'aba',exact:true}).click();const a=await page.evaluate(()=>window.__possibilityAtlas.validate().word);await page.getByRole('button',{name:'bab',exact:true}).click();assert.deepEqual(await page.evaluate(()=>window.__possibilityAtlas.validate().word),a);
 await page.evaluate(()=>window.__possibilityAtlas.select(5));await page.getByRole('button',{name:'Swap two corners',exact:true}).click();assert((await page.locator('#pa-metrics').textContent()).includes('Unreachable'));await page.getByRole('button',{name:'Swap two edges',exact:true}).click();assert((await page.locator('#pa-metrics').textContent()).includes('Reachable'));
 await page.getByRole('button',{name:'Twist one corner',exact:true}).click();assert((await page.locator('#pa-metrics').textContent()).includes('Unreachable'));
 await page.evaluate(()=>window.__possibilityAtlas.select(0));await page.getByRole('button',{name:'Cube edges',exact:true}).click();await page.getByRole('button',{name:'Permutation matrix',exact:true}).click();await page.waitForTimeout(100);
 const outside=()=>page.evaluate(()=>[...document.querySelectorAll('#pa-b svg text')].filter(t=>{const a=t.getBBox(),s=t.ownerSVGElement.viewBox.baseVal;return a.x<0||a.x+a.width>s.width;}).map(x=>x.textContent));
 const matrix=await outside();if(matrix.length)layout.push({width:1100,tab:'edge-matrix',bad:matrix});
 await page.getByRole('button',{name:'Cycle rings',exact:true}).click();const cycleBad=await outside();if(cycleBad.length)layout.push({width:1100,tab:'edge-cycles',bad:cycleBad});
 await page.evaluate(()=>window.__possibilityAtlas.select(0));await page.getByRole('button',{name:'Abstract items',exact:true}).click();
 await page.setViewportSize({width:1100,height:1100});await page.waitForTimeout(200);await shot(page,'desktop.png',{fullPage:true});
 await page.setViewportSize({width:390,height:1100});await page.waitForTimeout(200);await shot(page,'mobile.png',{fullPage:true});
 await page.locator('#pa-proof-next').scrollIntoViewIfNeeded();await shot(page,'mobile-derivation.png');assert(await page.locator('#pa-formula').isVisible());
 await page.setViewportSize({width:320,height:1100});
 // Extreme saved values arriving from another window: labels must stay inside their drawings.
 for(const [tab,changes] of [[0,{n:6,rank:719,source:'generic'}],[1,{n:8,k:8,subset:[0,1,2,3,4,5,6,7]}],[2,{multi:[3,3,3]}],[3,{stars:[5,5,5]}],[4,{depth:7,word:[1,0,1,0,1,0,1]}],[6,{dim:3,lineNine:false}]]){
  await page.evaluate(({key,tab,changes})=>window.dispatchEvent(new StorageEvent('storage',{key,newValue:JSON.stringify({...window.__possibilityAtlas.getState(),...changes,kind:'possibility-atlas-v1',tab})})),{key:STORE_KEY,tab,changes});
  await page.waitForTimeout(120);
  const s=await page.evaluate(()=>window.__possibilityAtlas.getState());assert.equal(s.tab,tab);for(const [k,v] of Object.entries(changes))assert.deepEqual(s[k],v,`Saved ${k} was not applied`);
  const bad=await page.evaluate(()=>[...document.querySelectorAll('#possibility-atlas svg text')].filter(t=>{const a=t.getBBox(),s=t.ownerSVGElement.viewBox.baseVal;return a.x<-.5||a.x+a.width>s.width+.5||a.y<-.5||a.y+a.height>s.height+.5;}).map(t=>t.textContent));if(bad.length)layout.push({tab,width:320,extreme:true,bad});
 }
 // A saved state is restored when the page is opened again.
 page=await reopenWithSaved(page,STORE_KEY,{...await page.evaluate(()=>window.__possibilityAtlas.getState()),kind:'possibility-atlas-v1',tab:3,stars:[4,2,1],proof:2},setup);
 await page.waitForFunction(()=>window.__possibilityAtlas);
 {const s=await page.evaluate(()=>window.__possibilityAtlas.getState());assert.equal(s.tab,3);assert.deepEqual(s.stars,[4,2,1]);assert.equal(s.proof,2);assert((await page.locator('#pa-proof-label').textContent()).includes('3 / 4'));}
 record({errors,layout});console.log(JSON.stringify({errors,layout}));
 assert.deepEqual(errors,[]);assert.deepEqual(layout,[]);
});
