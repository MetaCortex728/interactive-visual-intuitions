// Builds standalone pages in dist/ from each lab's HTML fragment.
//
// 1. Runs the lab build scripts, which write fragments to output/.
// 2. Wraps each fragment in scripts/shell.html (design tokens, local saved state, icons).
// 3. Writes dist/index.html, a start page with one card per lab, in the same shell; each lab page
//    links back to it.
// 4. Copies Three.js and OrbitControls from node_modules to dist/vendor/three/ and, on pages
//    that use them, adds an import map so the 3D views work offline.
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {marked} from 'marked';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'output');
const dist = path.join(root, 'dist');
const vendor = path.join(dist, 'vendor', 'three');

// Build order (States and Moves reuses the cube study's data); `card` is the order on the start page.
const labs = [
  {
    script: 'artifacts/cube-permutation-study/assemble.cjs', fragment: 'cube-paths-and-permutations.html', page: 'cube-permutation-study.html', title: 'Cube paths and permutations', card: 3,
    summary: 'Compare a recorded speedsolve with a much shorter computed route, played side by side on two cubes. Step through the turns, follow a single piece, and watch how every turn shuffles the cube\'s pieces.',
  },
  {
    script: 'artifacts/possibility-atlas/build.cjs', fragment: 'possibility-atlas.html', page: 'possibility-atlas.html', title: 'The Shape of Possibility', card: 2,
    summary: 'Count the ways to arrange or choose coloured tokens, step by step, with and without repeated colours. Then swap tokens on a line, a grid and a cube of positions to see how the shape of the board changes how many swaps you need.',
  },
  {
    script: 'artifacts/states-and-moves/build.cjs', fragment: 'states-and-moves.html', page: 'states-and-moves.html', title: 'States and Moves', companion: true, card: 1,
    summary: 'Six short chapters on counting, clock arithmetic, the order of actions, shortest routes, things that never change, and chance. Play the animated stories, change the settings in each chapter, and read the plain-language explanation that follows along.',
  },
];

// Chromium refuses ES module imports from file:// URLs, so for file:// pages a classic script
// registers the vendored sources and the import map points at blob URLs made from them.
// Over http(s) the import map points straight at the vendored module files.
const threeLoader = `<script>if(location.protocol==='file:')document.write('<script src="vendor/three/three-sources.js"><\\/script>');</script>
<script>(function(){var imports=null,src=self.__threeSources;try{if(src){var url=function(t){return URL.createObjectURL(new Blob([t],{type:'text/javascript'}));};imports={'three':url(src.three),'three/addons/controls/OrbitControls.js':url(src.orbitControls)};}}catch(e){imports=null;}if(!imports)imports={'three':'./vendor/three/three.module.js','three/addons/controls/OrbitControls.js':'./vendor/three/OrbitControls.js'};var map=document.createElement('script');map.type='importmap';map.textContent=JSON.stringify({imports:imports});document.head.append(map);})();</script>`;

const backLink = '<nav class="site-nav" aria-label="Site"><a href="index.html"><span aria-hidden="true">&larr;&nbsp;</span>All labs</a></nav>\n';

const startHead = `<style>
.start-header { margin-block: 12px 28px; }
.start-header h1 { font-size: 1.9rem; margin: 0 0 8px; }
.start-header p { margin: 0; max-width: 62ch; font-size: 1.05rem; color: var(--muted-foreground); }
.lab-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 16px; margin: 0; padding: 0; list-style: none; }
.lab-card { position: relative; display: flex; flex-direction: column; gap: 8px; padding: 18px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--background); overflow-wrap: anywhere; }
.lab-card:hover { background: var(--muted); }
.lab-card:focus-within { outline: 2px solid var(--focus); outline-offset: 2px; }
.lab-card h2 { font-size: 1.2rem; margin: 0; }
.lab-card p { margin: 0; flex: 1; }
.lab-card a { text-decoration: none; }
.lab-card a:focus-visible { outline: none; }
/* Makes the whole card a click target for its link. */
.lab-card a::after { content: ""; position: absolute; inset: 0; border-radius: var(--radius); }
.lab-card .lab-open { color: var(--accent); font-weight: 600; }
.start-footer { margin-top: 32px; }
</style>`;

const startContent = labList => `<header class="start-header">
<h1>Interactive Visual Intuitions</h1>
<p>Hands-on visual labs that help you build an intuition for elementary mathematics by changing things and watching what happens.</p>
</header>
<main>
<ul class="lab-cards" aria-label="Labs">
${labList.map(lab => `<li class="lab-card">
<h2><a href="${lab.page}">${escapeHtml(lab.title)}</a></h2>
<p>${escapeHtml(lab.summary)}</p>
<span class="lab-open" aria-hidden="true">Open the lab &rarr;</span>
</li>`).join('\n')}
</ul>
</main>
<footer class="start-footer text-small text-muted">
<p>Every lab works offline, straight from this folder. Your settings are saved in this browser only.</p>
</footer>`;

const escapeHtml = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const fill = (template, values) => template.replace(/<!--shell:(\w+)-->/g, (_, key) => {
  if (!(key in values)) throw Error(`No value for shell placeholder ${key}`);
  return values[key];
});

function copyVendor() {
  fs.mkdirSync(vendor, {recursive: true});
  // three's exports map hides package.json, so locate the package from its main entry.
  const threeDir = path.resolve(path.dirname(require.resolve('three')), '..');
  const files = {
    'three.module.js': path.join(threeDir, 'build', 'three.module.js'),
    'OrbitControls.js': path.join(threeDir, 'examples', 'jsm', 'controls', 'OrbitControls.js'),
    'LICENSE': path.join(threeDir, 'LICENSE'),
  };
  for (const [name, from] of Object.entries(files)) fs.copyFileSync(from, path.join(vendor, name));
  const sources = {
    three: fs.readFileSync(files['three.module.js'], 'utf8'),
    orbitControls: fs.readFileSync(files['OrbitControls.js'], 'utf8'),
  };
  const version = JSON.parse(fs.readFileSync(path.join(threeDir, 'package.json'), 'utf8')).version;
  fs.writeFileSync(path.join(vendor, 'three-sources.js'),
    `/* three ${version} (MIT, see LICENSE): module sources for pages opened from file:// URLs. */\nself.__threeSources=${JSON.stringify(sources)};\n`);
  return version;
}

for (const lab of labs) execFileSync(process.execPath, [path.join(root, lab.script)], {cwd: root, stdio: 'inherit'});

fs.mkdirSync(dist, {recursive: true});
const threeVersion = copyVendor();
const shell = fs.readFileSync(path.join(root, 'scripts', 'shell.html'), 'utf8');
const { companion } = require(path.join(root, 'artifacts/states-and-moves/companion.cjs'));
const report = [];

for (const lab of labs) {
  const fragment = fs.readFileSync(path.join(output, lab.fragment), 'utf8');
  if (/https?:\/\/(?!www\.w3\.org\/)[^'"\s]*\.(m?js|css)\b/.test(fragment)) throw Error(`${lab.fragment} still loads a remote script or stylesheet`);
  const usesThree = /import\(\s*['"]three['"]\s*\)/.test(fragment);
  let head = usesThree ? threeLoader : '', content = fragment;
  if (lab.companion) {
    const reading = companion(marked);
    head += '\n' + reading.head;
    content += '\n' + reading.body;
  }
  const html = fill(shell, {title: escapeHtml(lab.title), head, nav: backLink, content});
  const target = path.join(dist, lab.page);
  fs.writeFileSync(target, html);
  report.push({page: path.relative(root, target), bytes: Buffer.byteLength(html), three: usesThree});
}

const start = fill(shell, {title: 'Interactive Visual Intuitions', head: startHead, nav: '', content: startContent(labs.toSorted((a, b) => a.card - b.card))});
fs.writeFileSync(path.join(dist, 'index.html'), start);
report.unshift({page: 'dist/index.html', bytes: Buffer.byteLength(start), three: false});

console.log(JSON.stringify({pages: report, vendor: {three: threeVersion, dir: path.relative(root, vendor)}}, null, 2));
