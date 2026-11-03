// Captures the README screenshots in docs/images/ from the built pages in dist/.
//
// Run `npm run build` first, then `node scripts/capture-screenshots.cjs`. Each lab is opened from
// file:// in Playwright's Chromium at 1100 px wide, light colour scheme, reduced motion, with HTTP(S)
// requests blocked and fresh local storage, and the first screen is saved as a PNG under 300 KB.
const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const dist=path.join(root,'dist');
const images=path.join(root,'docs','images');
const MAX_BYTES=300*1024;

const shots=[
  {page:'states-and-moves.html',file:'states-and-moves.png'},
  {page:'possibility-atlas.html',file:'possibility-atlas.png'},
  {page:'cube-permutation-study.html',file:'cube-permutation-study.png'},
];

(async()=>{
  fs.mkdirSync(images,{recursive:true});
  const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader','--use-angle=swiftshader']});
  const report=[];
  try{
    for(const shot of shots){
      const file=path.join(dist,shot.page);
      if(!fs.existsSync(file))throw Error(`${path.relative(root,file)} is missing; run \`npm run build\` first.`);
      const context=await browser.newContext({viewport:{width:1100,height:760},colorScheme:'light',reducedMotion:'reduce'});
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.route(/^https?:/,r=>r.abort());
      await page.goto(pathToFileURL(file).href);
      await page.waitForLoadState('load');
      await page.waitForTimeout(1500);
      if(errors.length)throw Error(`${shot.page}: ${errors.join('; ')}`);
      const target=path.join(images,shot.file);
      await page.screenshot({path:target});
      const bytes=fs.statSync(target).size;
      if(bytes>MAX_BYTES)throw Error(`${path.relative(root,target)} is ${bytes} bytes, over ${MAX_BYTES}`);
      report.push({image:path.relative(root,target),bytes});
      await context.close();
    }
  }finally{await browser.close();}
  console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
