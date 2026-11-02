const Cube=require('../cube-permutation-study/vendor/cube.cjs');
const {CF,EF}=require('../cube-permutation-study/data.json');
const S=require('./sequence-model.cjs');
function stickers(c){const a=S.identity(54);c.cp.forEach((p,k)=>CF[p].forEach((id,j)=>a[CF[k][(j+c.co[k])%3]]=id));c.ep.forEach((p,k)=>EF[p].forEach((id,j)=>a[EF[k][(j+c.eo[k])%2]]=id));return a;}
const labels=['R','U',"R'","U'",'U','R',"U'","R'"];
const cubeMoves=labels.map(m=>{const a=stickers(new Cube().move(m));return a.map((_,i)=>a.indexOf(i));});
const lineMoves=[[0,1],[1,2],[0,1]].map(([a,b])=>S.swap(3,a,b));
const gridMoves=[[8,7],[7,4],[4,5],[5,8],[8,5],[5,4],[4,7],[7,8]].map(([a,b])=>S.swap(9,a,b));
module.exports={
  line:{labels:['Swap 1–2','Swap 2–3','Swap 1–2'],moves:lineMoves,states:S.trace([2,1,0],lineMoves)},
  grid:{labels:['Left','Up','Right','Down','Undo','Undo','Undo','Undo'],moves:gridMoves,states:S.trace([1,2,3,4,5,6,7,8,0],gridMoves)},
  cube:{labels,moves:cubeMoves,states:S.trace(S.identity(54),cubeMoves)}
};
