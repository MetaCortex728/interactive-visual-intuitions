const assert=require('node:assert/strict'),S=require('./sequence-model.cjs'),D=require('./sequence-data.cjs'),M=require('./model.cjs');
const Cube=require('../cube-permutation-study/vendor/cube.cjs');
let checks=0;const eq=(a,b)=>{assert.deepEqual(a,b);checks++;};
for(const d of Object.values(D))for(let k=0;k<d.moves.length;k++){
  const p=d.moves[k];eq([...p].sort((a,b)=>a-b),S.identity(p.length));eq(S.apply(d.states[k],p),d.states[k+1]);
  const inv=p.map((_,i)=>p.indexOf(i));eq(S.apply(d.states[k+1],inv),d.states[k]);
  const cs=S.cycles(p);eq(cs.flat().length,p.filter((x,i)=>x!==i).length);
  for(const c of cs)for(let i=0;i<c.length;i++){eq(p[c[i]],c[(i+1)%c.length]);const a=S.ringPosition(i,c.length,1,0,0,1),b=S.ringPosition((i+1)%c.length,c.length,0,0,0,1);assert(Math.hypot(a[0]-b[0],a[1]-b[1])<1e-10);checks++;}
}
eq(D.line.states.at(-1),[0,1,2]);eq(D.line.states.map(a=>M.inversions(a.map(x=>x+1))),[3,2,1,0]);
eq(D.grid.states.at(-1),D.grid.states[0]);for(const a of D.grid.states)eq(M.inversions(a)%2,0);
eq(D.cube.states.at(-1),S.identity(54));for(let k=0;k<D.cube.moves.length;k++){
  eq(S.cycles(D.cube.moves[k]).map(c=>c.length),[4,4,4,4,4]);
  const cube=new Cube().move(D.cube.labels.slice(0,k+1).join(' '));eq(D.cube.states[k+1].map(i=>'URFDLB'[Math.floor(i/9)]).join(''),cube.asString());
}
function rotate(v,axis,a){const[x,y,z]=v,c=Math.cos(a),s=Math.sin(a);return axis===0?[x,c*y-s*z,s*y+c*z]:axis===1?[c*x+s*z,y,-s*x+c*z]:[c*x-s*y,s*x+c*y,z];}
for(let k=0;k<D.cube.moves.length;k++)for(let i=0;i<54;i++){
  const {p,n}=S.location(i),move=D.cube.labels[k],[axis,side,sign]=S.turns[move[0]],angle=sign*(move.endsWith("'")?-1:1)*Math.PI/2,active=p[axis]===side;
  const end={p:active?rotate(p,axis,angle):p,n:active?rotate(n,axis,angle):n},dest=S.location(D.cube.moves[k][i]);
  assert(end.p.every((v,j)=>Math.abs(v-dest.p[j])<1e-10)&&end.n.every((v,j)=>Math.abs(v-dest.n[j])<1e-10));checks++;
}
eq(S.segment(0,8),{index:0,fraction:0});eq(S.segment(4,8),{index:3,fraction:1});eq(S.segment(4.5,8),{index:4,fraction:.5});
for(let k=0;k<=8;k++)for(const alpha of [0,.5])assert(Math.abs(M.randomWalk(6,alpha,k).reduce((s,x)=>s+x,0)-1)<1e-10);
console.log(JSON.stringify({checks,result:'passed',scope:'Exact permutations, inverse replay, cube geometry and cycle endpoints; not a learning-outcome measurement.'}));
