const {chromium}=require('playwright');
const {pathToFileURL}=require('url'),assert=require('assert/strict'),fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage({viewport:{width:1100,height:1100}}),errors=[],layout=[];
 page.on('pageerror',e=>errors.push(e.message));await page.route(/^https?:/,r=>r.abort());
 await page.goto(pathToFileURL(__dirname+'/possibility-atlas-v1.html').href);const f=page.frames().find(x=>x!==page.mainFrame());await f.waitForFunction(()=>window.__possibilityAtlas);
 for(const width of [1100,390,320]){
  await page.setViewportSize({width,height:1100});
  for(let tab=0;tab<7;tab++){
   await f.evaluate(t=>window.__possibilityAtlas.select(t),tab);await page.waitForTimeout(180);
   const result=await f.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,marks:document.querySelectorAll('#pa-a svg path,#pa-a svg rect,#pa-a svg line,#pa-a svg circle').length,bad:[...document.querySelectorAll('#possibility-atlas svg text')].filter(t=>{const a=t.getBBox(),s=t.ownerSVGElement.viewBox.baseVal;return a.x<-.5||a.x+a.width>s.width+.5;}).map(t=>t.textContent)}));
   assert(!result.overflow);if(tab<6)assert(result.marks>0);else assert(await f.locator('[data-position]').count()>0);if(result.bad.length)layout.push({width,tab,bad:result.bad});
   for(let p=0;p<3;p++)await f.locator('#pa-proof-next').click();assert((await f.locator('#pa-proof-label').textContent()).includes('4 / 4'));
  }
 }
 await f.evaluate(()=>window.__possibilityAtlas.select(6));
 for(const dim of [1,2,3]){
  await f.getByRole('button',{name:dim+'D · '+3**dim+' positions',exact:true}).click();assert.equal(await f.locator('[data-position]').count(),3**dim);
  await f.locator('[data-position="0"]').click();await f.locator('[data-position="1"]').click();
  assert((await f.evaluate(()=>window.__possibilityAtlas.getState())).selected===-1);
  if(dim<3){for(let i=0;i<35;i++)await f.getByRole('button',{name:'Optimal next swap',exact:true}).click();assert((await f.locator('#pa-metrics').textContent()).includes('distance: 0'));}
  await page.waitForTimeout(120);const bounds=await f.evaluate(()=>({scroll:document.documentElement.scrollWidth,w:innerWidth}));assert(bounds.scroll<=bounds.w+1);
 }
 await f.getByRole('button',{name:'Reverse one recorded swap',exact:true}).click();
 for(const [shape,distance] of [['line',18],['grid',8]]){
  await f.getByRole('button',{name:'Same 9: '+shape,exact:true}).click();
  const snapshot=await f.evaluate(()=>{const s=window.__possibilityAtlas.getState(),m=window.__possibilityAtlas.model;return m.boardFromHistory(m.lattice(s.dim,s.lineNine),s.history);});
  assert.deepEqual(snapshot,[2,2,2,1,1,1,0,0,0]);assert((await f.locator('#pa-metrics').textContent()).includes('distance: '+distance));
 }
 await f.getByRole('button',{name:'3D · 27 positions',exact:true}).click();
 await page.emulateMedia({colorScheme:'dark',reducedMotion:'reduce'});await f.evaluate(()=>window.__possibilityAtlas.select(6));await page.setViewportSize({width:1100,height:1300});await page.waitForTimeout(200);await page.screenshot({path:__dirname+'/dimensions-dark.png',fullPage:true});
 await page.emulateMedia({colorScheme:'light',reducedMotion:'no-preference'});
 await f.evaluate(()=>window.__possibilityAtlas.select(4));await f.getByRole('button',{name:'aba',exact:true}).click();const a=await f.evaluate(()=>window.__possibilityAtlas.validate().word);await f.getByRole('button',{name:'bab',exact:true}).click();assert.deepEqual(await f.evaluate(()=>window.__possibilityAtlas.validate().word),a);
 await f.evaluate(()=>window.__possibilityAtlas.select(5));await f.getByRole('button',{name:'Swap two corners',exact:true}).click();assert((await f.locator('#pa-metrics').textContent()).includes('Unreachable'));await f.getByRole('button',{name:'Swap two edges',exact:true}).click();assert((await f.locator('#pa-metrics').textContent()).includes('Reachable'));
 await f.getByRole('button',{name:'Twist one corner',exact:true}).click();assert((await f.locator('#pa-metrics').textContent()).includes('Unreachable'));
 await f.evaluate(()=>window.__possibilityAtlas.select(0));await f.getByRole('button',{name:'Cube edges',exact:true}).click();await f.getByRole('button',{name:'Permutation matrix',exact:true}).click();await page.waitForTimeout(100);
 const matrix=await f.evaluate(()=>[...document.querySelectorAll('#pa-b svg text')].filter(t=>{const a=t.getBBox(),s=t.ownerSVGElement.viewBox.baseVal;return a.x<0||a.x+a.width>s.width;}).map(x=>x.textContent));if(matrix.length)layout.push({width:320,tab:'edge-matrix',bad:matrix});
 await f.getByRole('button',{name:'Cycle rings',exact:true}).click();const cycleBad=await f.evaluate(()=>[...document.querySelectorAll('#pa-b svg text')].filter(t=>{const a=t.getBBox(),s=t.ownerSVGElement.viewBox.baseVal;return a.x<0||a.x+a.width>s.width;}).map(x=>x.textContent));if(cycleBad.length)layout.push({width:320,tab:'edge-cycles',bad:cycleBad});
 await f.evaluate(()=>window.__possibilityAtlas.select(0));await f.getByRole('button',{name:'Abstract items',exact:true}).click();
 await page.setViewportSize({width:1100,height:1100});await page.waitForTimeout(200);await page.screenshot({path:__dirname+'/desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:1100});await page.waitForTimeout(200);const h=await f.evaluate(()=>document.documentElement.scrollHeight);await page.locator('iframe').evaluate((e,h)=>e.style.height=h+'px',h);await page.screenshot({path:__dirname+'/mobile.png',fullPage:true});
 await f.locator('#pa-proof-next').scrollIntoViewIfNeeded();await page.screenshot({path:__dirname+'/mobile-derivation.png'});assert(await f.locator('#pa-formula').isVisible());
 await page.setViewportSize({width:320,height:1100});
 for(const [tab,changes] of [[0,{n:6,rank:719,source:'generic'}],[1,{n:8,k:8,subset:[0,1,2,3,4,5,6,7]}],[2,{multi:[3,3,3]}],[3,{stars:[5,5,5]}],[4,{depth:7,word:[1,0,1,0,1,0,1]}],[6,{dim:3,lineNine:false}]]){
  await f.evaluate(({tab,changes})=>window.dispatchEvent(new StorageEvent('storage',{key:'visual-intuitions:possibility-atlas',newValue:JSON.stringify({...window.__possibilityAtlas.getState(),...changes,kind:'possibility-atlas-v1',tab})})),{tab,changes});
  await page.waitForTimeout(120);const bad=await f.evaluate(()=>[...document.querySelectorAll('#possibility-atlas svg text')].filter(t=>{const a=t.getBBox(),s=t.ownerSVGElement.viewBox.baseVal;return a.x<-.5||a.x+a.width>s.width+.5||a.y<-.5||a.y+a.height>s.height+.5;}).map(t=>t.textContent));if(bad.length)layout.push({tab,width:320,extreme:true,bad});
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(__dirname+'/browser-check.json',JSON.stringify({errors,layout},null,2));console.log(JSON.stringify({errors,layout}));await browser.close();assert.deepEqual(layout,[]);
})().catch(e=>{console.error(e);process.exitCode=1;});
