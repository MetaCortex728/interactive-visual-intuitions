// Reading companion for the standalone States and Moves page: the preface, the six chapters
// with their equations, and the afterword, kept in step with the explorer above it.
const fs=require('node:fs'),path=require('node:path');
const chapters=require('./chapters.cjs'),equations=require('./equations.cjs');

const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

const styles=`<style>
#journey-reading{max-width:820px;margin:28px auto 72px;line-height:1.65}
#journey-reading h2{font-size:24px;line-height:1.3;margin-top:32px;font-weight:600}
#journey-reading h3{font-size:18px;font-weight:600;margin-top:26px}
#journey-reading p,#journey-reading li{overflow-wrap:anywhere}
#journey-reading math[display="block"]{max-width:100%;overflow-x:auto;overflow-y:hidden;padding-block:2px}
#journey-reading li{margin-block:14px}
#journey-reading .eyebrow{font-size:13px;color:var(--muted-foreground)}
#journey-reading .question{font-size:19px;line-height:1.5}
#journey-reading .contemplate{border-left:3px solid var(--accent);padding-left:16px}
#journey-reading details{border-top:1px solid var(--border);margin-top:24px;padding-top:18px}
#journey-reading button{font:inherit;border:1px solid var(--border);background:var(--muted);color:inherit;padding:9px 13px;border-radius:6px;cursor:pointer;white-space:normal;text-align:left}
#journey-reading button:disabled{opacity:.5;cursor:not-allowed}
#journey-reading .reading-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
#journey-reading .reading-nav{display:flex;justify-content:space-between;gap:10px;margin-top:24px}
@media(max-width:480px){#journey-reading{margin-top:20px}#journey-reading h2{font-size:22px}}
</style>`;

// The explorer posts {type:'journeySelected'} when its chapter changes and listens for
// {type:'journeyChapter'}; both live in this same window.
function script(last){return `<script>(function(){const last=${last};let selected=0;const explorer=document.getElementById('math-journey'),reading=document.getElementById('journey-reading'),all=document.getElementById('read-all');function sync(i){if(!Number.isInteger(i)||i<0||i>last)return;selected=i;reading.querySelectorAll('[data-chapter]').forEach(a=>a.hidden=!all.checked&&Number(a.dataset.chapter)!==i);document.getElementById('read-prev').disabled=i===0;document.getElementById('read-next').disabled=i===last;}function go(i){all.checked=false;sync(i);window.postMessage({type:'journeyChapter',chapter:i},'*');explorer.scrollIntoView({block:'start'});}window.addEventListener('message',e=>{if(e.source===window&&e.data?.type==='journeySelected')sync(e.data.chapter);});reading.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.go))));all.onchange=()=>sync(selected);document.getElementById('read-prev').onclick=()=>go(Math.max(0,selected-1));document.getElementById('read-next').onclick=()=>go(Math.min(last,selected+1));sync(0);sync(window.__journeyEarlySelection);})();</script>`;}

// The explorer can announce its restored chapter before the reading script below it has run,
// so a listener in the head keeps the latest announcement for the reading script to start from.
const early=`<script>window.addEventListener('message',e=>{if(e.source===window&&e.data?.type==='journeySelected')window.__journeyEarlySelection=e.data.chapter;});</script>`;

// marked is passed in because it is published as an ES module.
function companion(marked){
  const intro=marked.parse(fs.readFileSync(path.join(__dirname,'preface.md'),'utf8'));
  const after=marked.parse(fs.readFileSync(path.join(__dirname,'afterword.md'),'utf8'));
  const safe=c=>({...c,...Object.fromEntries(['title','field','question','notice','essence','connect','reflect'].map(k=>[k,escape(c[k])])),derive:c.derive.map(escape)});
  const articles=chapters.map(safe).map((c,i)=>`<article data-chapter="${i}" ${i?'hidden':''}><p class="eyebrow">Chapter ${String(i+1).padStart(2,'0')} / ${c.field}</p><h2>${c.title}</h2><p class="question">${c.question}</p><p><strong>Notice.</strong> ${c.notice}</p><p><strong>Essence.</strong> ${c.essence}</p>${equations[i].html}<h3>Derive</h3><ol>${c.derive.map(p=>`<li>${p}</li>`).join('')}</ol><p><strong>Connect.</strong> ${c.connect}</p><p class="contemplate"><strong>Contemplate.</strong> ${c.reflect}</p><div class="reading-links">${c.links.map(j=>`<button type="button" data-go="${j}">${String(j+1).padStart(2,'0')} ${escape(chapters[j].title)}</button>`).join('')}</div></article>`).join('');
  const markup=`<main id="journey-reading"><details><summary>Orientation and companion labs</summary>${intro}</details><p><label><input type="checkbox" id="read-all"> Show the complete reading sequence</label></p><div id="selected-reading">${articles}<article data-chapter="${chapters.length}" hidden>${after}</article></div><nav class="reading-nav" aria-label="Reading order"><button type="button" id="read-prev">Previous chapter</button><button type="button" id="read-next">Next chapter</button></nav><p class="eyebrow">Version 1.3 · 2026-11-03 · Five linked visual sequences plus all seven exploration views. The cube's 3D view needs WebGL; without it the cube is shown as an endpoint net. Everything works offline. Intermediate frames interpolate between exact model states.</p></main>`;
  return {head:styles+early,body:markup+script(chapters.length)};
}

module.exports={companion};
