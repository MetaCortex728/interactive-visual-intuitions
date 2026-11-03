const assert=require('assert/strict'),M=require('./model.cjs');
const Cube=require('../cube-permutation-study/vendor/cube.cjs');
let checks=0;
function check(ok){assert(ok);checks++;}
for(let n=0;n<=7;n++){
 const a=Array.from({length:n},(_,i)=>i),ps=M.permutations(a);
 check(BigInt(ps.length)===M.fact(n));check(new Set(ps.map(p=>p.join())).size===ps.length);
 ps.forEach((p,i)=>{check(p.join()===M.unrank(n,i).join());let inv=0;for(let j=0;j<n;j++)for(let k=j+1;k<n;k++)if(p[j]>p[k])inv++;check(inv%2===M.parity(p));});
 for(let k=0;k<=n;k++){const s=M.subsets(n,k);check(BigInt(s.length)===M.choose(n,k));check(M.falling(n,k)===M.choose(n,k)*M.fact(k));}
 check(Array.from({length:n+1},(_,k)=>M.choose(n,k)).reduce((a,b)=>a+b,0n)===2n**BigInt(n));
}
for(let a=0;a<=3;a++)for(let b=0;b<=3;b++)for(let c=0;c<=3;c++){
 const w=M.multiset([a,b,c]);check(BigInt(w.length)===M.fact(a+b+c)/(M.fact(a)*M.fact(b)*M.fact(c)));check(new Set(w.map(x=>x.join())).size===w.length);
}
for(let k=0;k<=15;k++){let count=0;for(let a=0;a<=k;a++)for(let b=0;b<=k-a;b++)count++;check(BigInt(count)===M.choose(k+2,2));}
check(M.trace([0,0]).at(-1).join()==='0,1,2');check(M.trace([0,1,0]).at(-1).join()===M.trace([1,0,1]).at(-1).join());
for(let d=0;d<=7;d++){const words=M.words(2,d);check(words.length===2**d);check(words.every(w=>M.parity(M.trace(w).at(-1))===d%2));}
check(M.threeTokenGraph().nodes.length===6&&M.threeTokenGraph().edges.length===6);
check(M.cubeCount()===43252003274489856000n);
const c=new Cube();for(const move of ['R','U','F','L','B','D','R2',"U'",'F2']){c.move(move);check(M.legal(c.co,c.eo,c.cp,c.ep));}
const solved=new Cube(),tw=solved.co.slice(),fl=solved.eo.slice();tw[0]=1;fl[0]=1;
check(!M.legal(tw,solved.eo,solved.cp,solved.ep));check(!M.legal(solved.co,fl,solved.cp,solved.ep));
check(M.tree(3,6)===1093n);check(M.tree(3,3)*2n===80n);check(M.tree(18,0)===1n);
console.log('PASS',checks,'assertions: exact counts, independent inversion parity, subset/grouping identities, stars-bars enumeration, word collisions, cube invariants, search budgets.');
for(let d=1;d<=3;d++){
 const g=M.lattice(d);check(g.n===3**d);check(g.edges.length===d*2*3**(d-1));
 for(const [a,b] of g.edges){const ca=Array.from({length:d},(_,j)=>Math.floor(a/3**j)%3),cb=Array.from({length:d},(_,j)=>Math.floor(b/3**j)%3);check(ca.reduce((s,x,j)=>s+Math.abs(x-cb[j]),0)===1);}
 const h=M.scramble(g,18),a=M.boardFromHistory(g,h);check([0,1,2].every(c=>a.filter(x=>x===c).length===g.n/3));let b=a;for(const i of h.slice().reverse())b=M.swapEdge(b,g.edges[i]);check(b.join()===g.target.join());
 if(d<3){const t=M.distances(g);check(BigInt(t.size)===M.fact(g.n)/M.fact(g.n/3)**3n);for(const [s,distance] of t){const board=s.split('').map(Number);if(distance){const next=M.shortestNext(g,board,t);check(next>=0&&t.get(M.swapEdge(board,g.edges[next]).join(''))===distance-1);}for(const e of g.edges)check(Math.abs(distance-t.get(M.swapEdge(board,e).join('')))<=1);}}
}
const path9=M.lattice(2,true),grid9=M.lattice(2),dp=M.distances(path9),dg=M.distances(grid9);check(dp.size===1680);check(dp.get('222111000')===18);check(dg.get('222111000')===8);
check(M.fact(27)/M.fact(9)**3n===227873431500n);
console.log('PASS',checks,'total assertions including lattice adjacency, all 1D/2D shortest-path labels, inverse replay, and fixed-nine comparison.');
