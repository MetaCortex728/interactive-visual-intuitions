/* Finite models and a probability update. Permutations map source to destination. */
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
  function average(v,alpha){return v.map((x,i)=>alpha*x+(1-alpha)*(v[mod(i-1,v.length)]+v[(i+1)%v.length])/2);}
  function randomWalk(n,alpha,t){let p=Array(n).fill(0);p[0]=1;for(let i=0;i<t;i++)p=average(p,alpha);return p;}
  const connections=[[0,3,'arrangements become states'],[0,5,'weigh the possibilities'],[1,2,'compose repeats'],[1,4,'count modulo 2'],[2,3,'choose generators'],[3,4,'test reachability'],[3,5,'randomize the move']];
  const api={mod,gcd,permutations,compose,inverse,r,s,identity,groupWord,clock,quotient,stateGraph,shortest,inversions,slide,average,randomWalk,connections};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Journey=api;
})(typeof window!=='undefined'?window:globalThis);
