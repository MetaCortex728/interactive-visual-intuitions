const assert=require('assert/strict');
const fs=require('fs');
const Cube=require('./vendor/cube.cjs');
const data=require('./data.json');
// Exercise the actual fragment's facelet coordinates against the independent move engine.
const source=fs.readFileSync(__dirname+'/visual.template.html','utf8');
const loc=new Function('return ('+source.slice(source.indexOf('function loc(i)'),source.indexOf('function initView('))+')')();
const spec={R:[0,1,-1],L:[0,-1,1],U:[1,1,-1],D:[1,-1,1],F:[2,1,-1],B:[2,-1,1]};
function rotate(v,axis,angle){const [x,y,z]=v,c=Math.round(Math.cos(angle)),s=Math.round(Math.sin(angle));return axis===0?[x,c*y-s*z,s*y+c*z]:axis===1?[c*x+s*z,y,-s*x+c*z]:[c*x-s*y,s*x+c*y,z];}
function identityMap(c){const ids=Array.from({length:54},(_,i)=>i);c.cp.forEach((p,k)=>data.CF[p].forEach((id,j)=>ids[data.CF[k][(j+c.co[k])%3]]=id));c.ep.forEach((p,k)=>data.EF[p].forEach((id,j)=>ids[data.EF[k][(j+c.eo[k])%2]]=id));return ids;}
for(const face of 'URFDLB')for(const suffix of ['',"'",'2']){
 const move=face+suffix,[axis,side,sign]=spec[face],angle=sign*(suffix==='2'?2:suffix==="'"?-1:1)*Math.PI/2;
 const mapped=Array(54);
 for(let i=0;i<54;i++){
  let {p,n}=loc(i);if(p[axis]===side){p=rotate(p,axis,angle);n=rotate(n,axis,angle);}
  const target=Array.from({length:54},(_,j)=>j).find(j=>{const q=loc(j);return q.p.every((v,k)=>v===p[k])&&q.n.every((v,k)=>v===n[k]);});
  assert.notEqual(target,undefined);mapped[target]=i;
 }
 assert.deepEqual(mapped,identityMap(new Cube().move(move)),move);
}
console.log('PASS: all 18 rendered face-turn endpoints match the move engine, including all 54 sticker identities.');
const human=data.cases[0].right;
for(const stage of human.stageEnds){const s=human.states[stage.end];const cross=[4,5,6,7].filter(j=>s.ep[j]===j&&!s.eo[j]).length;const pairs=[4,5,6,7].filter(j=>s.cp[j]===j&&!s.co[j]&&s.ep[j+4]===j+4&&!s.eo[j+4]).length;console.log(stage.name,{cross,pairs});assert.equal(cross,4);}
