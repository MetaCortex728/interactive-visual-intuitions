const fs=require('fs'), assert=require('assert/strict');
const Cube=require('./vendor/cube.cjs'), solver=require('./vendor/min2phase.cjs');
const record=require('./prepared.json');
const CF=[[8,9,20],[6,18,38],[0,36,47],[2,45,11],[29,26,15],[27,44,24],[33,53,42],[35,17,51]];
const EF=[[5,10],[7,19],[3,37],[1,46],[32,16],[28,25],[30,43],[34,52],[23,12],[21,41],[50,39],[48,14]];
function stickers(c){
 const out=Array.from({length:54},(_,i)=>i);
 c.cp.forEach((piece,pos)=>CF[piece].forEach((id,j)=>out[CF[pos][(j+c.co[pos])%3]]=id));
 c.ep.forEach((piece,pos)=>EF[piece].forEach((id,j)=>out[EF[pos][(j+c.eo[pos])%2]]=id));
 return out;
}
const tokens=s=>s.trim().split(/\s+/).filter(Boolean);
function trace(start,alg){
 const c=new Cube(start), states=[];
 const push=()=>{const ids=stickers(c);assert.equal(new Set(ids).size,54);assert.equal(ids.map(i=>'URFDLB'[Math.floor(i/9)]).join(''),c.asString());states.push({...structuredClone(c.toJSON()),stickers:ids});};
 push(); for(const m of tokens(alg)){c.move(m);push();} assert(c.isSolved(),alg);return states;
}
function compactMoves(seq){const stack=[];for(const t of tokens(seq)){const n=t.endsWith('2')?2:t.endsWith("'")?3:1;if(stack.length&&stack.at(-1).f===t[0]){stack.at(-1).n=(stack.at(-1).n+n)%4;if(!stack.at(-1).n)stack.pop();}else stack.push({f:t[0],n});}return stack.map(x=>x.f+['','','2',"'"][x.n]).join(' ');}
const oriented=new Cube().move(record.scramble).move(record.inspection);
const faces='URFDLB';
const normalized=Cube.fromString(oriented.asString().split('').map(f=>faces[oriented.center.indexOf(faces.indexOf(f))]).join(''));
const initialShort=new Cube().move("R U R' U'");
const moves=[...faces].flatMap(f=>[f,f+'2',f+"'"]);
let frontier=[new Cube()], seen=new Set([new Cube().asString()]), layers=[1];
for(let d=1;d<=3;d++){const next=[];for(const c of frontier)for(const m of moves){const n=new Cube(c).move(m),s=n.asString();if(!seen.has(s)){seen.add(s);next.push(n);}}frontier=next;layers.push(next.length);}
assert(!seen.has(initialShort.asString()));
const superAlg="R L U2 F U' D F2 R2 B2 L U2 F' B' U R2 D F2 U R2 U";
const superState=new Cube().move(superAlg);assert(superState.co.every(v=>v===0));assert(superState.eo.every(v=>v===1));assert(superState.cp.every((v,i)=>v===i));assert(superState.ep.every((v,i)=>v===i));
solver.initFull();const heuristic=solver.solve(superState.asString()).trim();
const cases=[
 {id:'record',label:'Du 3.47 s',title:'Former world record · Wuhu 2018',scramble:record.scramble,inspection:record.inspection,colors:oriented.center,
  note:'Same scramble. 16 is a verified upper bound, not a proof of optimality. Equal move pacing is not the original timing.',
  left:{label:'Short route',badge:'16 HTM · optimality unproven',alg:record.compact,stages:[['Verified solution',record.compact]]},
  right:{label:'Human reconstruction',badge:'31 executed HTM · 3.47 s recorded',alg:record.human,stages:record.segments},
  source:'https://reco.nz/solve/3455',start:normalized.toJSON()},
 {id:'exact',label:'Exact shortest path',title:'A small state with an exhaustive optimality certificate',scramble:"R U R' U'",inspection:'',colors:[0,1,2,3,4,5],
  note:'All 3,502 states at distance 0–3 were enumerated; none is this state. Four moves solve it. The repeated trigger is illustrative, not a record solve.',
  left:{label:'Provably shortest',badge:'4 HTM · exhaustive depth-3 exclusion',alg:"U R U' R'",stages:[['Inverse commutator',"U R U' R'"]]},
  right:{label:'Repeat a familiar trigger',badge:'20 HTM · illustrative pattern reuse',alg:Array(5).fill("R U R' U'").join(' '),stages:Array.from({length:5},(_,i)=>['Trigger '+(i+1),"R U R' U'"])},
  source:'https://www.cube20.org/',start:initialShort.toJSON(),layers},
 {id:'superflip',label:'Superflip · 20',title:'A published distance-20 state',scramble:superAlg,inspection:'',colors:[0,1,2,3,4,5],
  note:'All edges are in place but flipped. The 20-move minimum is a published result; only replay correctness is verified here. Right lane is a solver, not a human.',
  left:{label:'Certified shortest length',badge:'20 HTM · published lower bound',alg:Cube.inverse(superAlg),stages:[['20-move inverse',Cube.inverse(superAlg)]]},
  right:{label:'Fast two-phase search',badge:tokens(heuristic).length+' HTM · no optimality guarantee',alg:heuristic,stages:[['Two-phase result',heuristic]]},source:'https://www.cube20.org/',start:superState.toJSON()}
];
for(const c of cases) for(const lane of [c.left,c.right]){lane.moves=tokens(lane.alg);lane.states=trace(c.start,lane.alg);lane.qtm=lane.moves.reduce((n,t)=>n+(t.includes('2')?2:1),0);lane.simplified=compactMoves(lane.alg);lane.stageEnds=[];let count=0;for(const [name,a]of lane.stages){count+=tokens(a).length;lane.stageEnds.push({name,end:count});}}
for(const f of faces){assert(new Cube().move(`${f} ${f} ${f} ${f}`).isSolved());assert(new Cube().move(`${f} ${f}'`).isSolved());}
// Check immutable snapshots after all moves, not only when they are captured.
for(const c of cases){
 assert.deepEqual(c.left.states[0],c.right.states[0]);
 for(const lane of [c.left,c.right])for(let j=0;j<lane.states.length;j++){
  const s=lane.states[j];assert.deepEqual(stickers(s),s.stickers);
  if(j)assert.deepEqual(new Cube(lane.states[j-1]).move(lane.moves[j-1]).toJSON(),new Cube(s).toJSON());
 }
}
fs.writeFileSync(__dirname+'/data.json',JSON.stringify({cases,CF,EF,proof:{layers,total:seen.size}},null,0));
console.log(JSON.stringify({proof:{layers,total:seen.size},cases:cases.map(c=>({id:c.id,left:c.left.moves.length,right:c.right.moves.length,rightSimplified:tokens(c.right.simplified).length})),checks:'All six traces solve; all sticker maps match cube.js; inverse and four-turn identities pass.'},null,2));
