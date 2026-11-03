const assert=require('node:assert/strict');
const {suite,reopenWithSaved}=require('../../scripts/browser-harness.cjs');
const STORE_KEY='visual-intuitions:cube-permutation-study';
suite('cube-permutation-study',async({browser,newPage,url,shot,record})=>{
 const errors=[],setup=async p=>{p.on('pageerror',e=>errors.push(e.message));await p.route(/^https?:/,r=>r.abort());};
 let page=await newPage({viewport:{width:1100,height:1200}});await setup(page);
 await page.goto(url('cube-permutation-study.html'));
 await page.waitForFunction(()=>window.__cubeStudy,null,{timeout:60000});
 const state=()=>page.evaluate(()=>window.__cubeStudy.getState());
 assert((await state()).webgl,'WebGL view did not start');
 const pixels=()=>page.evaluate(()=>[...document.querySelectorAll('canvas')].map(c=>{const gl=c.getContext('webgl2')||c.getContext('webgl');const a=new Uint8Array(gl.drawingBufferWidth*gl.drawingBufferHeight*4);gl.readPixels(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight,gl.RGBA,gl.UNSIGNED_BYTE,a);let visible=0,sum=0;for(let j=0;j<a.length;j+=4){if(a[j+3])visible++;sum=(sum+a[j]*3+a[j+1]*5+a[j+2]*7)>>>0;}return {visible,sum};}));
 const initialPixels=await pixels();assert(initialPixels.length>0&&initialPixels.every(p=>p.visible>1000),'Blank cube canvas');
 await shot(page,'desktop.png',{fullPage:true});
 console.log('INITIAL',await page.evaluate(()=>({state:window.__cubeStudy.getState(),width:innerWidth,scroll:document.documentElement.scrollWidth,canvases:document.querySelectorAll('canvas').length,error:document.querySelector('#error').textContent})));
 for(let i=0;i<3;i++){
  await page.evaluate(i=>window.__cubeStudy.selectCase(i),i);
  await page.locator('#end').click();
  assert((await page.locator('.lane-state').allTextContents()).every(s=>s.includes('Solved')));
  console.log('END',i,await page.locator('.lane-state').allTextContents());
 }
 await page.evaluate(()=>window.__cubeStudy.selectCase(0));
 await page.locator('#speed').selectOption('250');
 await page.locator('#play').click();console.log('START',await state());await page.waitForTimeout(1500);console.log('RUNNING',await state());await page.locator('#play').click();
 console.log('PLAY',await state());
 assert((await state()).step>0);
 assert.notDeepEqual(await pixels(),initialPixels);
 await page.locator('#turn-lens').click();
 await page.locator('#piece-picker').selectOption('URF');
 console.log('TRACK',await page.locator('#selection').textContent());
 assert.equal((await state()).selected,'URF');
 const node=page.locator('.cs-graph [data-piece]').first();const name=await node.getAttribute('data-piece');await node.locator('circle').click();
 assert.equal((await state()).selected,name);
 await page.locator('#align').selectOption('progress');await page.evaluate(()=>window.__cubeStudy.jump(15));
 assert.deepEqual((await state()).indices,[8,15]);
 // A value saved by another window of the same page is picked up at once.
 await page.evaluate(key=>window.dispatchEvent(new StorageEvent('storage',{key,newValue:JSON.stringify({caseIndex:1,step:2,lens:'turn',align:'moves',duration:250,selected:{name:'UF'}})})),STORE_KEY);
 assert.equal((await state()).selected,'UF');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#next').click();
 assert.equal((await state()).step,3);
 await page.emulateMedia({reducedMotion:'no-preference'});
 // A saved position is restored when the page is opened again.
 page=await reopenWithSaved(page,STORE_KEY,{caseIndex:2,step:4,lens:'turn',align:'moves',duration:250,selected:{name:'UF'}},setup);
 await page.waitForFunction(()=>window.__cubeStudy,null,{timeout:60000});
 {const s=await state();assert.equal(s.caseIndex,2);assert.equal(s.step,4);assert.equal(s.lens,'turn');assert.equal(s.selected,'UF');}
 await page.evaluate(()=>window.__cubeStudy.selectCase(0));
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(1000);
 await page.evaluate(()=>window.scrollTo(0,0));
 console.log('GEOMETRY',await page.evaluate(()=>({inner:[innerWidth,innerHeight,scrollY],body:[document.body.scrollHeight,getComputedStyle(document.body).overflow],lanes:[...document.querySelectorAll('.cs-lane')].map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,rows:getComputedStyle(e).gridTemplateRows}})})));
 await shot(page,'mobile.png',{fullPage:true});
 const mobilePixels=await pixels();assert(mobilePixels.every(p=>p.visible>1000),'Blank cube canvas on mobile');
 await page.setViewportSize({width:390,height:2800});await page.waitForTimeout(500);
 await shot(page,'mobile-overview.png');
 await page.setViewportSize({width:352,height:2800});await page.waitForTimeout(500);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Horizontal overflow at 352 px');
 const mobile=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,root:document.querySelector('#cube-study').getBoundingClientRect().width}));
 console.log('MOBILE',mobile);
 console.log('ERRORS',errors);
 assert.deepEqual(errors,[]);
 // With Three.js blocked the study falls back to a 2D sticker net and still plays to the end.
 const fallbackPage=await newPage({viewport:{width:850,height:1200}});
 const fallbackErrors=[];fallbackPage.on('pageerror',e=>fallbackErrors.push(e.message));
 await fallbackPage.route(/^https?:/,r=>r.abort());
 await fallbackPage.route(/\/vendor\/three\//,r=>r.abort());
 await fallbackPage.goto(url('cube-permutation-study.html'));
 await fallbackPage.waitForFunction(()=>window.__cubeStudy);
 await fallbackPage.waitForFunction(()=>window.__cubeStudy.getState().webgl===false&&document.querySelectorAll('.cs-sticker').length>0,null,{timeout:30000});
 assert.equal(await fallbackPage.locator('.cs-sticker').count(),108);
 await fallbackPage.locator('#end').click();
 assert((await fallbackPage.locator('.lane-state').allTextContents()).every(s=>s.includes('Solved')));
 assert.deepEqual(fallbackErrors,[]);
 record({errors,fallbackErrors,mobile,checks:'nonblank desktop/mobile canvases; animated playback; six solved endpoints; tracking; progress alignment; storage-event and reload restore; reduced motion; 352px no overflow; blocked network; blocked Three.js fallback'});
});
