const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
  const {marked}=await import(pathToFileURL(require.resolve('marked')));
  const target=path.join(__dirname,'states-and-moves.html'),chapters=require('./chapters.cjs'),equations=require('./equations.cjs');
  let html=fs.readFileSync(target,'utf8');
  if(html.includes('id="journey-reading"'))throw Error('Run render.py again before exporting the reading companion.');
  const intro=marked.parse(fs.readFileSync(path.join(__dirname,'preface.md'),'utf8'));
  const after=marked.parse(fs.readFileSync(path.join(__dirname,'afterword.md'),'utf8'));
  const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const safe=c=>({...c,...Object.fromEntries(['title','field','question','notice','essence','connect','reflect'].map(k=>[k,escape(c[k])])),derive:c.derive.map(escape)});
  const articles=chapters.map(safe).map((c,i)=>`<article data-chapter="${i}" ${i?'hidden':''}><p class="eyebrow">Chapter ${String(i+1).padStart(2,'0')} / ${c.field}</p><h2>${c.title}</h2><p class="question">${c.question}</p><p><strong>Notice.</strong> ${c.notice}</p><p><strong>Essence.</strong> ${c.essence}</p>${equations[i].html}<h3>Derive</h3><ol>${c.derive.map(p=>`<li>${p}</li>`).join('')}</ol><p><strong>Connect.</strong> ${c.connect}</p><p class="contemplate"><strong>Contemplate.</strong> ${c.reflect}</p><div class="reading-links">${c.links.map(j=>`<button type="button" data-go="${j}">${String(j+1).padStart(2,'0')} ${escape(chapters[j].title)}</button>`).join('')}</div></article>`).join('');
  const styles=`<style>
  body{font-family:system-ui,sans-serif;color:light-dark(#202326,#e8e8e8);max-width:1120px;margin:auto;line-height:1.65}
  #journey-reading{max-width:820px;margin:28px auto 72px}#journey-reading h2{font-size:24px;line-height:1.3;margin-top:32px;font-weight:600}#journey-reading h3{font-size:18px;font-weight:600;margin-top:26px}
  #journey-reading p,#journey-reading li{overflow-wrap:anywhere}#journey-reading li{margin-block:14px}#journey-reading a{color:light-dark(#176852,#7dddc2)}#journey-reading .eyebrow{font-size:13px;color:light-dark(#555c62,#b9c0c5)}
  #journey-reading .question{font-size:19px;line-height:1.5}#journey-reading .contemplate{border-left:3px solid light-dark(#24846a,#7dddc2);padding-left:16px}
  #journey-reading details{border-top:1px solid light-dark(#d5dadd,#43484c);margin-top:24px;padding-top:18px}#journey-reading summary{cursor:pointer;font-weight:600}
  #journey-reading button{font:inherit;border:1px solid light-dark(#ccd1d4,#4a5054);background:light-dark(#f3f5f5,#292d30);color:inherit;padding:9px 13px;border-radius:6px;cursor:pointer;white-space:normal;text-align:left}
  #journey-reading .reading-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}#journey-reading .reading-nav{display:flex;justify-content:space-between;gap:10px;margin-top:24px}
  #journey-reading button:focus-visible{outline:2px solid light-dark(#176852,#7dddc2);outline-offset:3px}#journey-reading [hidden]{display:none}
  @media(max-width:480px){body{padding:12px}#journey-reading{margin-top:20px}#journey-reading h2{font-size:22px}}
  </style>`;
  const companion=`<main id="journey-reading"><details><summary>Orientation and companion labs</summary>${intro}</details><p><label><input type="checkbox" id="read-all"> Show the complete reading sequence</label></p><div id="selected-reading">${articles}<article data-chapter="${chapters.length}" hidden>${after}</article></div><nav class="reading-nav" aria-label="Reading order"><button type="button" id="read-prev">Previous chapter</button><button type="button" id="read-next">Next chapter</button></nav><p class="eyebrow">Version 1.2 · 2026-11-03 · Five linked visual sequences plus all seven exploration views. Cube 3D requires network access and WebGL; offline it becomes an endpoint net. The cycle diagrams and other experiments remain interactive offline. Intermediate frames interpolate between exact model states.</p></main>`;
  const script=`<script>(function(){const last=${chapters.length};let selected=0;const frame=document.getElementById('codex-visualization'),reading=document.getElementById('journey-reading'),all=document.getElementById('read-all');function sync(i){if(!Number.isInteger(i)||i<0||i>last)return;selected=i;reading.querySelectorAll('[data-chapter]').forEach(a=>a.hidden=!all.checked&&Number(a.dataset.chapter)!==i);document.getElementById('read-prev').disabled=i===0;document.getElementById('read-next').disabled=i===last;}function go(i){all.checked=false;sync(i);frame.contentWindow.postMessage({type:'journeyChapter',chapter:i},'*');frame.scrollIntoView({block:'start'});}window.addEventListener('message',e=>{if(e.source===frame.contentWindow&&e.data?.type==='journeySelected')sync(e.data.chapter);});reading.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.go))));all.onchange=()=>sync(selected);document.getElementById('read-prev').onclick=()=>go(Math.max(0,selected-1));document.getElementById('read-next').onclick=()=>go(Math.min(last,selected+1));sync(0);})();</script>`;
  html=html.replace('</head>',styles+'\n</head>').replace('</body>',companion+script+'\n</body>');
  // render.py uses a double-quoted data-srcdoc attribute; apostrophes need no entity there.
  html=html.replace(/(data-srcdoc=")([^"]*)(")/,(_,open,body,close)=>open+body.replaceAll('&#x27;',"'")+close);
  if(Buffer.byteLength(html)>200*1024)throw Error('Document exceeds the native Notion text-upload limit.');
  fs.writeFileSync(target,html);
  console.log(JSON.stringify({export:target,bytes:Buffer.byteLength(html)}));
})();
