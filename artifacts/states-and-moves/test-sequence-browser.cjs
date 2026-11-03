const assert=require('node:assert/strict');
const {suite,reopenWithSaved}=require('../../scripts/browser-harness.cjs');
const STORE_KEY='visual-intuitions:states-and-moves';
suite('states-and-moves-sequences',async({browser,newPage,url,shot,record})=>{
  const errors=[],layout=[],setup=async p=>{p.on('pageerror',e=>errors.push(e.message));await p.route(/^https?:/,r=>r.abort());};
  let page=await newPage({viewport:{width:1100,height:1000}});await setup(page);
  await page.goto(url('states-and-moves.html'));await page.waitForFunction(()=>window.SequenceStudio&&window.MathJourneyTest);
  await page.waitForFunction(()=>window.SequenceStudio.webgl(),null,{timeout:45000});
  async function check(width,story,pos){await page.waitForTimeout(70);const bad=await page.evaluate(()=>{const labels=[...document.querySelectorAll('#sequence-studio svg text')],overlaps=[];if(window.SequenceStudio.state().story===2){const ts=[...document.querySelectorAll('#story-right svg text')];ts.forEach((a,i)=>ts.slice(i+1).forEach(b=>{const x=a.getBBox(),y=b.getBBox();if(x.x<y.x+y.width+2&&x.x+x.width+2>y.x&&x.y<y.y+y.height+2&&x.y+x.height+2>y.y)overlaps.push([a.textContent,b.textContent]);}));}return {overflow:document.documentElement.scrollWidth>innerWidth+1,overlaps,labels:labels.filter(t=>{const b=t.getBBox(),v=t.ownerSVGElement.viewBox.baseVal;return b.x<-.5||b.y<-.5||b.x+b.width>v.width+.5||b.y+b.height>v.height+.5;}).map(t=>t.textContent)};});if(bad.overflow||bad.labels.length||bad.overlaps.length)layout.push({width,story,pos,...bad});}
  for(const width of [1100,736,390,320]){await page.setViewportSize({width,height:1000});for(let i=0;i<5;i++){
    await page.evaluate(i=>window.SequenceStudio.select(i),i);for(const pos of [0,.5,i===3?2:8]){await page.evaluate(p=>window.SequenceStudio.jump(p),pos);await check(width,i,pos);}
  }}
  await page.setViewportSize({width:1100,height:1000});await page.evaluate(()=>{window.SequenceStudio.select(2);window.SequenceStudio.jump(.5);});await page.waitForTimeout(150);await shot(page,'sequence-cube-desktop.png');
  const middle=await page.evaluate(()=>window.SequenceStudio.inspectCube());assert(middle.size[0]>200&&middle.size[1]>200);assert(middle.pixels.length>5000);
  await page.evaluate(()=>window.SequenceStudio.jump(1));const end=await page.evaluate(()=>window.SequenceStudio.inspectCube());assert.notEqual(end.pixels,middle.pixels,'Cube pixels must change during a turn');
  const S=require('./sequence-model.cjs'),D=require('./sequence-data.cjs');for(let i=0;i<54;i++){const tile=end.tiles.find(t=>t.id===i),dest=D.cube.states[1].indexOf(i),loc=S.location(dest),p=loc.p.map((v,j)=>v+.493*loc.n[j]);assert(tile.point.every((v,j)=>Math.abs(v-p[j])<1e-6));assert(tile.normal.every((v,j)=>Math.abs(v-loc.n[j])<1e-6));}
  await page.getByRole('button',{name:'U9',exact:true}).click();assert.equal((await page.evaluate(()=>window.SequenceStudio.state())).selected,8);assert.equal(await page.locator('#story-right [data-token="8"]').count(),1);
  await page.getByRole('slider',{name:'Sequence position',exact:true}).fill('2.5');assert.equal((await page.evaluate(()=>window.SequenceStudio.state())).position,2.5);
  await page.getByRole('button',{name:'Play sequence',exact:true}).click();await page.waitForTimeout(180);await page.getByRole('button',{name:'Pause sequence',exact:true}).click();const p=(await page.evaluate(()=>window.SequenceStudio.state())).position;assert(p>2.5&&p<3,'Playback did not advance part of a step: '+p);
  await page.getByRole('button',{name:'Restart sequence',exact:true}).click();assert.equal((await page.evaluate(()=>window.SequenceStudio.state())).position,0);
  await page.getByRole('button',{name:'Next transition',exact:true}).click();await page.waitForTimeout(1000);assert.equal((await page.evaluate(()=>window.SequenceStudio.state())).position,1);
  await page.getByRole('button',{name:'Explore the underlying model',exact:true}).click();assert.equal((await page.evaluate(()=>window.MathJourneyTest.state())).presentation,'lab');assert(await page.locator('#journey-lab-surface').isVisible());
  await page.getByRole('button',{name:'Visual sequences',exact:true}).click();assert(await page.locator('#sequence-studio').isVisible());
  for(const [story,filename]of [[0,'sequence-order.png'],[3,'sequence-composition.png'],[4,'sequence-probability.png']]){await page.evaluate(i=>{window.SequenceStudio.select(i);window.SequenceStudio.jump(1.5);},story);await page.waitForTimeout(120);await shot(page,filename);}
  await page.setViewportSize({width:390,height:1000});await page.evaluate(()=>{window.SequenceStudio.select(2);window.SequenceStudio.jump(.5);});await page.waitForTimeout(150);await shot(page,'sequence-cube-mobile.png',{fullPage:true});
  await page.emulateMedia({colorScheme:'dark',reducedMotion:'reduce'});await page.getByRole('button',{name:'Next transition',exact:true}).click();assert.equal((await page.evaluate(()=>window.SequenceStudio.state())).position,1);await page.waitForTimeout(150);await shot(page,'sequence-cube-dark.png');
  // A value saved by another window of the same page is picked up at once.
  await page.evaluate(key=>{const journey={presentation:'sequence',studio:{story:4,position:3.5,lazy:false}};window.dispatchEvent(new StorageEvent('storage',{key,newValue:JSON.stringify(journey)}));},STORE_KEY);assert.equal((await page.evaluate(()=>window.SequenceStudio.state())).position,3.5);assert.equal((await page.evaluate(()=>window.SequenceStudio.state())).story,4);
  // A saved sequence position is restored when the page is opened again.
  page=await reopenWithSaved(page,STORE_KEY,{presentation:'sequence',studio:{story:3,position:1.5,selected:null,lazy:true}},setup);
  await page.waitForFunction(()=>window.SequenceStudio&&window.MathJourneyTest);
  {const s=await page.evaluate(()=>window.SequenceStudio.state());assert.equal(s.story,3);assert.equal(s.position,1.5);assert(await page.locator('#sequence-studio').isVisible());}
  // With the network and the vendored Three.js both blocked, the studio falls back to flat drawings.
  const offline=await newPage({viewport:{width:390,height:1000}});const offlineErrors=[];offline.on('pageerror',e=>offlineErrors.push(e.message));
  await offline.route(/^https?:/,r=>r.abort());await offline.route(/\/vendor\/three\//,r=>r.abort());
  await offline.goto(url('states-and-moves.html'));await offline.waitForFunction(()=>window.SequenceStudio);await offline.waitForFunction(()=>document.getElementById('story-error').textContent.includes('3D needs'));await offline.evaluate(()=>window.SequenceStudio.jump(1));assert.equal(await offline.locator('#story-left svg rect').count(),54);await offline.evaluate(()=>window.SequenceStudio.select(4));await offline.getByRole('button',{name:'Always move',exact:true}).click();assert.equal((await offline.evaluate(()=>window.SequenceStudio.state())).lazy,false);
  const result={errors,offlineErrors,layout,stories:5,widths:[1100,736,390,320],threeD:'nonblank, moving, actual mesh endpoints match 54 sticker identities',controls:'play/pause/step/scrub/select/storage-event and reopen restore/reduced-motion/blocked network/blocked Three.js passed'};record(result);console.log(JSON.stringify(result));assert.deepEqual(errors,[]);assert.deepEqual(offlineErrors,[]);assert.deepEqual(layout,[]);
});
