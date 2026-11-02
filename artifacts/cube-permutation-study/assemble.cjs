const fs=require('fs');
const path=require('path');
const out=require('path').join(__dirname,'../../output/cube-paths-and-permutations.html');
const html=fs.readFileSync(path.join(__dirname,'visual.template.html'),'utf8').replace('__CUBE_DATA__',fs.readFileSync(path.join(__dirname,'data.json'),'utf8'));
fs.writeFileSync(out,html);
console.log(out,Buffer.byteLength(html));
