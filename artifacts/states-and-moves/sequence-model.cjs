/* Source-to-destination maps; continuous frames are presentation, not new puzzle states. */
(function(root){
  const identity=n=>Array.from({length:n},(_,i)=>i);
  function apply(a,p){const b=Array(a.length);a.forEach((v,i)=>b[p[i]]=v);return b;}
  function cycles(p){const seen=new Set(),out=[];for(let i=0;i<p.length;i++){if(seen.has(i))continue;let j=i,c=[];do{seen.add(j);c.push(j);j=p[j];}while(j!==i);if(c.length>1)out.push(c);}return out;}
  function swap(n,a,b){const p=identity(n);[p[a],p[b]]=[p[b],p[a]];return p;}
  function trace(initial,moves){const states=[initial.slice()];moves.forEach(p=>states.push(apply(states.at(-1),p)));return states;}
  function segment(position,length){const t=Math.max(0,Math.min(length,Number(position)||0)),index=t===0?0:Math.min(length-1,Math.ceil(t)-1);return {index,fraction:t-index};}
  function location(i){const f=Math.floor(i/9),r=Math.floor(i%9/3),c=i%3;return [
    {p:[c-1,1,r-1],n:[0,1,0]},{p:[1,1-r,1-c],n:[1,0,0]},{p:[c-1,1-r,1],n:[0,0,1]},
    {p:[c-1,-1,1-r],n:[0,-1,0]},{p:[-1,1-r,c-1],n:[-1,0,0]},{p:[1-c,1-r,-1],n:[0,0,-1]}
  ][f];}
  const turns={R:[0,1,-1],L:[0,-1,1],U:[1,1,-1],D:[1,-1,1],F:[2,1,-1],B:[2,-1,1]};
  function ringPosition(index,size,t,cx,cy,r){const a=-Math.PI/2+2*Math.PI*(index+t)/size;return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
  const api={identity,apply,cycles,swap,trace,segment,location,turns,ringPosition};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SequenceModel=api;
})(typeof window!=='undefined'?window:globalThis);
