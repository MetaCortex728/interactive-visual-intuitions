const assert=require('node:assert/strict');
const M=require('./model.cjs');
let checks=0;
const ok=(x,msg)=>{assert.ok(x,msg);checks++;};
const near=(a,b,t=1e-9)=>ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
const eq=(a,b)=>{assert.deepEqual(a,b);checks++;};
eq(M.quotient(false).length,6);eq(M.quotient(true).length,3);M.quotient(true).forEach(g=>eq(g.items.length,2));
for(let n=3;n<=40;n++)for(let k=0;k<n;k++){const orbits=M.clock(n,k);eq(orbits.length,M.gcd(n,k));eq(new Set(orbits.flat()).size,n);orbits.forEach(o=>eq(o.length,n/M.gcd(n,k)));}
const ps=M.permutations([0,1,2]);for(const a of ps){eq(M.compose(a,M.inverse(a)),M.identity);for(const b of ps)for(const c of ps)eq(M.compose(M.compose(a,b),c),M.compose(a,M.compose(b,c)));}
eq(M.groupWord(['r','r','r']),M.identity);eq(M.groupWord(['s','s']),M.identity);eq(M.groupWord(['s','r','s']),M.inverse(M.r));ok(M.groupWord(['r','s']).join('')!==M.groupWord(['s','r']).join(''));
for(const all of [false,true]){const g=M.stateGraph(all);eq(g.edges.length,all?9:6);for(let a=0;a<6;a++)for(let b=0;b<6;b++){const p=M.shortest(g,a,b);eq(p[0],a);eq(p.at(-1),b);p.slice(1).forEach((v,i)=>ok(g.edges.some(e=>(e.a===v&&e.b===p[i])||(e.b===v&&e.a===p[i]))));if(!all)ok(M.shortest(M.stateGraph(true),a,b).length<=p.length);}}
eq(M.shortest(M.stateGraph(),5).length-1,3);eq(M.shortest(M.stateGraph(true),5).length-1,1);
// Exhaustive finite reachability is independent of the parity classifier.
const queue=[[1,2,3,4,5,6,7,8,0]],seen=new Set([queue[0].join('')]);
for(let q=0;q<queue.length;q++){const a=queue[q],z=a.indexOf(0);eq(M.inversions(a)%2,0);for(const d of [-3,3,-1,1]){const i=z+d;if(i<0||i>8||Math.abs(z%3-i%3)+Math.abs(Math.floor(z/3)-Math.floor(i/3))!==1)continue;const b=M.slide(a,i),key=b.join('');if(!seen.has(key)){seen.add(key);queue.push(b);}}}
eq(seen.size,181440);ok(!seen.has('213456780'));eq(M.slide([1,2,3,4,5,6,7,8,0],0),[1,2,3,4,5,6,7,8,0]);
for(let n=3;n<=14;n++)for(const alpha of [0,0.25,0.5])for(let t=0;t<=40;t++){const p=M.randomWalk(n,alpha,t);near(p.reduce((a,b)=>a+b,0),1);ok(p.every(x=>x>=0));}
for(let n=3;n<=14;n++)for(const alpha of [0,0.25,0.5])M.average(Array(n).fill(1/n),alpha).forEach(x=>near(x,1/n));
console.log(JSON.stringify({status:'PASS',assertions:checks,slidingReachable:seen.size,chapters:6},null,2));
