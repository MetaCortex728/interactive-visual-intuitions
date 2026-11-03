// Browser checks for the start page, dist/index.html: every card opens a built lab page without page
// errors, every lab page links back, and the page fits at 320 and 1100 px. HTTP(S) requests are blocked.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {fileURLToPath}=require('node:url');
const {suite}=require('./browser-harness.cjs');

suite('start-page',async({newPage,url,shot,record})=>{
  const errors=[],blocked=[];
  const page=await newPage({viewport:{width:1100,height:900}});
  page.on('pageerror',e=>errors.push(`${page.url()}: ${e.message}`));
  await page.route(/^https?:/,r=>{blocked.push(r.request().url());return r.abort();});
  const start=url('index.html');
  await page.goto(start);

  assert.equal(await page.locator('h1').textContent(),'Interactive Visual Intuitions');
  const cards=await page.locator('.lab-card').evaluateAll(list=>list.map(card=>({
    title:card.querySelector('h2').textContent.trim(),
    summary:card.querySelector('p').textContent.trim(),
    href:card.querySelector('h2 a').getAttribute('href'),
  })));
  assert.equal(cards.length,3,'Expected one card per lab');

  // Layout: no horizontal overflow and every card fully inside the viewport width.
  const widths=[];
  for(const width of [320,1100]){
    await page.setViewportSize({width,height:900});
    const fit=await page.evaluate(()=>({
      scroll:document.documentElement.scrollWidth,
      inner:innerWidth,
      outside:[...document.querySelectorAll('.lab-card')].filter(c=>{const r=c.getBoundingClientRect();return r.left<0||r.right>innerWidth;}).length,
    }));
    assert(fit.scroll<=fit.inner,`Horizontal overflow at ${width} px: ${fit.scroll} > ${fit.inner}`);
    assert.equal(fit.outside,0,`A card extends past the viewport at ${width} px`);
    widths.push({width,...fit});
    await shot(page,`start-${width}.png`,{fullPage:true});
  }
  await page.emulateMedia({colorScheme:'dark'});
  const dark=await page.evaluate(()=>getComputedStyle(document.body).backgroundColor);
  await shot(page,'start-dark.png',{fullPage:true});
  await page.emulateMedia({colorScheme:'light'});
  const light=await page.evaluate(()=>getComputedStyle(document.body).backgroundColor);
  assert.notEqual(dark,light,'Dark scheme does not change the page background');

  // Keyboard: Tab reaches each card link in order, and Enter opens the focused one.
  const focused=[];
  for(let i=0;i<cards.length;i++){
    await page.keyboard.press('Tab');
    focused.push(await page.evaluate(()=>document.activeElement.getAttribute('href')));
  }
  assert.deepEqual(focused,cards.map(c=>c.href),'Tab order does not follow the cards');

  const visits=[];
  for(const [i,card] of cards.entries()){
    const target=new URL(card.href,start);
    assert.equal(target.protocol,'file:',`${card.title} links outside the build`);
    const file=fileURLToPath(target);
    assert(fs.existsSync(file),`${card.title} links to missing ${card.href}`);
    const before=errors.length;
    await page.goto(start);
    if(i===0){
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForURL(target.href);
    }else{
      await page.locator('.lab-card').nth(i).click();
      await page.waitForURL(target.href);
    }
    await page.waitForLoadState('load');
    await page.waitForTimeout(800);
    assert.equal(await page.title(),card.title,`${card.href} has the wrong title`);
    const back=page.getByRole('link',{name:'All labs'});
    assert.equal(await back.count(),1,`${card.href} has no link back to the start page`);
    assert.equal(new URL(await back.getAttribute('href'),page.url()).href,start,`${card.href} back link does not point at index.html`);
    await back.click();
    await page.waitForURL(start);
    assert.equal(await page.locator('.lab-card').count(),cards.length);
    assert.equal(errors.length,before,`Page errors on ${card.href}: ${errors.slice(before).join('; ')}`);
    visits.push({...card,page:path.basename(file)});
  }

  assert.deepEqual(errors,[],'Page errors');
  assert.deepEqual(blocked,[],'Network requests were attempted');
  record({status:'PASS',cards:visits,widths,colourSchemes:{light,dark},keyboard:focused,errors,blocked});
});
