/* Shared exact counting and state-transition model; no rendering dependencies. */
(function(root){
  const fact=n=>{let v=1n;for(let i=2;i<=n;i++)v*=BigInt(i);return v;};
  const choose=(n,k)=>k<0||k>n?0n:fact(n)/(fact(k)*fact(n-k));
  const falling=(n,k)=>fact(n)/fact(n-k);
  function permutations(a){if(!a.length)return [[]];return a.flatMap((x,i)=>permutations(a.filter((_,j)=>i!==j)).map(p=>[x,...p]));}
  function unrank(n,r){const pool=Array.from({length:n},(_,i)=>i),p=[];for(let left=n;left;left--){const f=Number(fact(left-1)),i=Math.floor(r/f);p.push(pool.splice(i,1)[0]);r%=f;}return p;}
  function cycles(p){const seen=new Set(),out=[];for(let i=0;i<p.length;i++){if(seen.has(i))continue;let j=i,c=[];while(!seen.has(j)){seen.add(j);c.push(j);j=p[j];}out.push(c);}return out;}
  const parity=p=>(p.length-cycles(p).length)%2;
  function subsets(n,k){const out=[];function walk(start,a){if(a.length===k){out.push(a);return;}for(let i=start;i<=n-(k-a.length);i++)walk(i+1,[...a,i]);}walk(0,[]);return out;}
  function words(m,d){if(!d)return [[]];return words(m,d-1).flatMap(w=>Array.from({length:m},(_,i)=>[...w,i]));}
  function multiset(counts){const out=[];function walk(c,a){if(c.every(x=>x===0)){out.push(a);return;}c.forEach((x,i)=>{if(x){const next=c.slice();next[i]--;walk(next,[...a,i]);}});}walk(counts,[]);return out;}
  function applySwap(p,g){const q=p.slice();[q[g],q[g+1]]=[q[g+1],q[g]];return q;}
  function trace(word){const states=[[0,1,2]];word.forEach(g=>states.push(applySwap(states.at(-1),g)));return states;}
  function threeTokenGraph(){const nodes=permutations([0,1,2]),edges=[];nodes.forEach((p,i)=>{for(let g=0;g<2;g++){const j=nodes.findIndex(q=>q.join('')===applySwap(p,g).join(''));if(i<j)edges.push({from:i,to:j,g});}});return {nodes,edges};}
  const tree=(b,d)=>{let total=0n;for(let i=0;i<=d;i++)total+=BigInt(b)**BigInt(i);return total;};
  const cubeCount=()=>fact(8)*fact(12)*3n**7n*2n**11n/2n;
  const legal=(cornerTwists,edgeFlips,cp,ep)=>cornerTwists.reduce((a,b)=>a+b,0)%3===0&&edgeFlips.reduce((a,b)=>a+b,0)%2===0&&parity(cp)===parity(ep);
  function lattice(dim,lineNine=false){const n=lineNine?9:3**dim,edges=[];for(let i=0;i<n;i++)for(let axis=0;axis<(lineNine?1:dim);axis++){const stride=3**axis,side=lineNine?9:3;if(Math.floor(i/stride)%side<side-1)edges.push([i,i+stride,axis]);}return {n,edges,target:Array.from({length:n},(_,i)=>i%3)};}
  function swapEdge(board,edge){const a=board.slice();[a[edge[0]],a[edge[1]]]=[a[edge[1]],a[edge[0]]];return a;}
  function boardFromHistory(g,h){return h.reduce((a,i)=>swapEdge(a,g.edges[i]),g.target.slice());}
  function distances(g){if(g.n>9)throw Error('Exact state enumeration is limited to nine positions.');const key=a=>a.join(''),start=key(g.target),dist=new Map([[start,0]]),queue=[g.target];for(let j=0;j<queue.length;j++){const a=queue[j],d=dist.get(key(a));for(let i=0;i<g.edges.length;i++){const [u,v]=g.edges[i];if(a[u]===a[v])continue;const b=swapEdge(a,g.edges[i]),k=key(b);if(!dist.has(k)){dist.set(k,d+1);queue.push(b);}}}return dist;}
  function shortestNext(g,a,dist){const d=dist.get(a.join(''));return d===0?-1:g.edges.findIndex(e=>dist.get(swapEdge(a,e).join(''))===d-1);}
  function scramble(g,count=18,seed=37){let a=g.target.slice(),h=[];for(let j=0;j<count;j++){const eligible=g.edges.map((e,i)=>i).filter(i=>a[g.edges[i][0]]!==a[g.edges[i][1]]&&i!==h.at(-1));if(!eligible.length)break;seed=(Math.imul(seed,1664525)+1013904223)>>>0;const i=eligible[seed%eligible.length];a=swapEdge(a,g.edges[i]);h.push(i);}return h;}
  const api={fact,choose,falling,permutations,unrank,cycles,parity,subsets,words,multiset,applySwap,trace,threeTokenGraph,tree,cubeCount,legal,lattice,swapEdge,boardFromHistory,distances,shortestNext,scramble};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Possibility=api;
})(typeof window!=='undefined'?window:globalThis);
