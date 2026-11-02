/* Finite models and numerical experiments. Permutations map source to destination. */
(function(root){
  const mod=(x,n)=>((x%n)+n)%n;
  const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
  const permutations=a=>a.length?a.flatMap((x,i)=>permutations(a.filter((_,j)=>j!==i)).map(p=>[x,...p])):[[]];
  const compose=(a,b)=>a.map(i=>b[i]); // a first, then b
  const inverse=p=>p.map((_,i)=>p.indexOf(i));
  const r=[1,2,0],s=[0,2,1],identity=[0,1,2];
  const groupWord=w=>w.reduce((p,c)=>compose(p,c==='r'?r:s),identity);
  function clock(n,k){const seen=new Set(),orbits=[];for(let i=0;i<n;i++){if(seen.has(i))continue;const a=[];let j=i;do{seen.add(j);a.push(j);j=mod(j+k,n);}while(j!==i);orbits.push(a);}return orbits;}
  function quotient(merge){const groups=new Map();for(const p of permutations(identity)){const key=p.map(x=>merge&&x<2?'A':['A','B','C'][x]).join('');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p);}return [...groups].map(([key,items])=>({key,items}));}
  function stateGraph(all=false){const nodes=permutations(identity),gens=all?[[0,1],[1,2],[0,2]]:[[0,1],[1,2]],edges=[];nodes.forEach((p,i)=>gens.forEach(([a,b],g)=>{const q=p.slice();[q[a],q[b]]=[q[b],q[a]];const j=nodes.findIndex(n=>n.join('')===q.join(''));if(i<j)edges.push({a:i,b:j,g});}));return {nodes,edges};}
  function shortest(graph,start,end=0){const queue=[start],parent=new Map([[start,null]]);for(let t=0;t<queue.length;t++){const u=queue[t];if(u===end)break;for(const e of graph.edges){const v=e.a===u?e.b:e.b===u?e.a:-1;if(v>=0&&!parent.has(v)){parent.set(v,u);queue.push(v);}}}if(!parent.has(end))return [];const path=[end];while(path.at(-1)!==start)path.push(parent.get(path.at(-1)));return path.reverse();}
  const inversions=a=>a.reduce((total,x,i)=>total+a.slice(i+1).filter(y=>x&&y&&x>y).length,0);
  function slide(a,i){const z=a.indexOf(0),d=Math.abs(Math.floor(z/3)-Math.floor(i/3))+Math.abs(z%3-i%3);if(d!==1)return a.slice();const b=a.slice();[b[z],b[i]]=[b[i],b[z]];return b;}
  const rotate=(a,k)=>a.map((_,i)=>a[mod(i-k,a.length)]);
  function necklace(a){const rotations=a.map((_,k)=>rotate(a,k)),unique=[...new Set(rotations.map(x=>x.join('')))];return {rotations,orbit:unique,stabilizer:rotations.map((x,i)=>x.join('')===a.join('')?i:-1).filter(i=>i>=0)};}
  function necklaces(n){const groups=new Map();for(let i=0;i<2**n;i++){const a=i.toString(2).padStart(n,'0').split('').map(Number),key=necklace(a).orbit.sort()[0];if(!groups.has(key))groups.set(key,[]);groups.get(key).push(a);}return [...groups].map(([key,items])=>({key,items}));}
  const fixedCounts=n=>Array.from({length:n},(_,k)=>2**gcd(n,k));
  function matrix(kind,t){if(kind==='shear')return [1,t,0,1];if(kind==='scale')return [1,0,0,t];if(kind==='projection')return [1,0,0,0];const a=t*Math.PI/180;return [Math.cos(a),-Math.sin(a),Math.sin(a),Math.cos(a)];}
  const mv=(a,v)=>[a[0]*v[0]+a[1]*v[1],a[2]*v[0]+a[3]*v[1]];
  const det=a=>a[0]*a[3]-a[1]*a[2];
  function flow(h,steps){const exact=[[1,0]],euler=[[1,0]],cayley=[[1,0]],den=1+h*h/4,A=[(1-h*h/4)/den,-h/den,h/den,(1-h*h/4)/den];for(let i=1;i<=steps;i++){const [x,y]=euler.at(-1);euler.push([x-h*y,y+h*x]);exact.push([Math.cos(i*h),Math.sin(i*h)]);cayley.push(mv(A,cayley.at(-1)));}return {exact,euler,cayley};}
  function average(v,alpha){return v.map((x,i)=>alpha*x+(1-alpha)*(v[mod(i-1,v.length)]+v[(i+1)%v.length])/2);}
  function randomWalk(n,alpha,t){let p=Array(n).fill(0);p[0]=1;for(let i=0;i<t;i++)p=average(p,alpha);return p;}
  const entropy=p=>-p.reduce((s,x)=>s+(x>0?x*Math.log2(x):0),0);
  const tv=p=>p.reduce((s,x)=>s+Math.abs(x-1/p.length),0)/2;
  const eigen=(n,k,alpha)=>alpha+(1-alpha)*Math.cos(2*Math.PI*k/n);
  function mode(n,k,alpha,t){const original=Array.from({length:n},(_,i)=>Math.cos(2*Math.PI*k*i/n)),lambda=eigen(n,k,alpha);let filtered=original.slice();for(let i=0;i<t;i++)filtered=average(filtered,alpha);return {original,filtered,lambda,predicted:original.map(v=>v*lambda**t)};}
  function descent(kappa,q,steps,precondition=false){const eta=q/kappa,path=[[1.6,1]],values=[(1.6**2+kappa)/2];for(let i=0;i<steps;i++){const [x,y]=path.at(-1),next=precondition?[x*(1-q),y*(1-q)]:[x*(1-eta),y*(1-q)];path.push(next);values.push((next[0]**2+kappa*next[1]**2)/2);}return {path,values,eta,factors:precondition?[1-q,1-q]:[1-eta,1-q]};}
  function loop(w,r,c,aspect=1,samples=160){const points=Array.from({length:samples+1},(_,i)=>{const t=2*Math.PI*w*i/samples;return [c+r*Math.cos(t),aspect*r*Math.sin(t)];});const crossing=w!==0&&Math.abs(Math.abs(c)-r)<1e-8;return {points,crossing,winding:crossing?null:w===0?0:Math.abs(c)<r?w:0};}
  function numericalWinding(points){let total=0;for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];total+=Math.atan2(a[0]*b[1]-a[1]*b[0],a[0]*b[0]+a[1]*b[1]);}return total/(2*Math.PI);}
  const connections=[[0,5,'forget labels'],[1,2,'compose repeats'],[2,3,'choose generators'],[3,4,'test reachability'],[2,5,'act on objects'],[2,6,'represent linearly'],[6,7,'infinitesimal change'],[3,8,'randomize the move'],[8,9,'diagonalize evolution'],[6,9,'eigenvectors'],[9,10,'damp each mode'],[7,10,'discretize a flow'],[1,11,'count turns'],[2,11,'compose loops'],[4,11,'preserve an invariant']];
  const api={mod,gcd,permutations,compose,inverse,r,s,identity,groupWord,clock,quotient,stateGraph,shortest,inversions,slide,rotate,necklace,necklaces,fixedCounts,matrix,mv,det,flow,average,randomWalk,entropy,tv,eigen,mode,descent,loop,numericalWinding,connections};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Journey=api;
})(typeof window!=='undefined'?window:globalThis);
