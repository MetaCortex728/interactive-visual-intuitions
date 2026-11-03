// Shared setup for the Playwright browser suites.
//
// Each suite opens a standalone page from dist/ (run `npm run build` first) in Playwright's bundled
// Chromium, headless, and writes its result file and screenshots to output/browser/<suite>/.
const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const dist=path.join(root,'dist');

function pageUrl(name){
  const file=path.join(dist,name);
  if(!fs.existsSync(file))throw Error(`${path.relative(root,file)} is missing; run \`npm run build\` first.`);
  return pathToFileURL(file).href;
}

// Runs body({browser,newPage,url,out,shot,record}) and reports pass or failure with the duration.
// record(result) writes <suite>.json to the output folder; shot(page,name,options) saves a screenshot there.
function suite(name,body){
  const out=path.join(root,'output','browser',name);
  fs.mkdirSync(out,{recursive:true});
  const started=Date.now();
  const seconds=()=>((Date.now()-started)/1000).toFixed(1);
  (async()=>{
    // SwiftShader lets headless Chromium render WebGL on machines without a GPU.
    const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader','--use-angle=swiftshader']});
    try{
      await body({
        browser,
        // A page in its own browser context, so reopenWithSaved can open a second tab sharing its storage.
        newPage:async options=>(await browser.newContext(options)).newPage(),
        url:pageUrl,
        out,
        shot:(page,file,options={})=>page.screenshot({...options,path:path.join(out,file)}),
        record:result=>fs.writeFileSync(path.join(out,name+'.json'),JSON.stringify(result,null,2)),
      });
    }finally{await browser.close();}
  })().then(
    ()=>console.log(`PASS ${name} (${seconds()} s)`),
    e=>{console.error(e);console.error(`FAIL ${name} (${seconds()} s)`);process.exitCode=1;},
  );
}

// Closes page and opens its URL again in a new tab of the same browser context, with value already saved
// under key in local storage (as the page's localState.write stores it), the way a returning visitor
// arrives. The old page is closed first because the labs save their own state when hidden.
// setup(newPage) runs before navigation, for listeners and routes. Returns the new page.
async function reopenWithSaved(page,key,value,setup=async()=>{}){
  const href=page.url(),context=page.context();
  await page.close();
  const fresh=await context.newPage();
  await setup(fresh);
  await fresh.addInitScript(({key,raw})=>{try{localStorage.setItem(key,raw);}catch(e){}},{key,raw:JSON.stringify(value)});
  await fresh.goto(href);
  return fresh;
}

module.exports={suite,reopenWithSaved};
