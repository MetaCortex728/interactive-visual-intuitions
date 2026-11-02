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
for(let n=1;n<=8;n++){const groups=M.necklaces(n);eq(groups.length,M.fixedCounts(n).reduce((a,b)=>a+b,0)/n);eq(groups.reduce((s,g)=>s+g.items.length,0),2**n);for(const g of groups)for(const a of g.items){const o=M.necklace(a);eq(o.orbit.length*o.stabilizer.length,n);eq(o.orbit.length,g.items.length);}}
eq(M.fixedCounts(4),[16,2,4,2]);eq(M.necklaces(4).length,6);
for(let t=-2;t<=2;t+=0.1){near(M.det(M.matrix('shear',t)),1);near(M.det(M.matrix('scale',t)),t);near(M.det(M.matrix('projection',t)),0);}
for(let deg=-180;deg<=180;deg+=5){const a=M.matrix('rotation',deg);near(M.det(a),1);near(Math.hypot(...M.mv(a,[2,3])),Math.sqrt(13));}
for(let h=0.05;h<=0.5;h+=0.05)for(let n=0;n<=60;n++){const f=M.flow(h,n);near(Math.hypot(...f.exact.at(-1)),1);near(Math.hypot(...f.euler.at(-1)),(1+h*h)**(n/2));near(Math.hypot(...f.cayley.at(-1)),1);near(f.cayley.at(-1)[0],Math.cos(n*2*Math.atan(h/2)));}
for(let n=3;n<=14;n++)for(const alpha of [0,0.25,0.5])for(let t=0;t<=40;t++){const p=M.randomWalk(n,alpha,t);near(p.reduce((a,b)=>a+b,0),1);ok(p.every(x=>x>=0));ok(M.entropy(p)<=Math.log2(n)+1e-10);ok(M.tv(p)<=1&&M.tv(p)>=0);}
near(M.tv(M.randomWalk(6,0,40)),0.5);ok(M.tv(M.randomWalk(6,0.5,40))<0.00002);
for(let n=3;n<=16;n++)for(let k=0;k<n;k++)for(const alpha of [0,0.5])for(let t=0;t<12;t++){const m=M.mode(n,k,alpha,t);m.filtered.forEach((v,i)=>near(v,m.predicted[i]));}
eq(M.eigen(8,4,0),-1);eq(M.eigen(8,4,0.5),0);
for(let k=1;k<=12;k++)for(const q of [0.2,1,1.9,2,2.4])for(const pre of [false,true]){const d=M.descent(k,q,18,pre);d.path.forEach(([x,y],i)=>{near(x,1.6*d.factors[0]**i);near(y,d.factors[1]**i);near(d.values[i],(x*x+k*y*y)/2);});if(q<2)ok(d.values.at(-1)<d.values[0]);if(pre&&q===1)eq(d.path[1],[0,0]);}
for(const w of [-2,-1,0,1,2])for(const r of [0.4,1,1.8])for(const c of [0,0.4,0.9,1,1.5,1.8,2])for(const a of [0.3,1,1.5]){const loop=M.loop(w,r,c,a,1000);if(loop.crossing)eq(loop.winding,null);else near(M.numericalWinding(loop.points),loop.winding,1e-7);}
console.log(JSON.stringify({status:'PASS',assertions:checks,slidingReachable:seen.size,chapters:12},null,2));
