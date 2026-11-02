const fs = require('fs');
const assert = require('assert/strict');
const Cube = require('./vendor/cube.cjs');
const solver = require('./vendor/min2phase.cjs');
const scramble = "F U2 L2 B2 F' U L2 U R2 D2 L' B L2 B' R2 U2";
const segments = [
 ['Cross + first pair', "U R2 U' F' L F' L'"],
 ['Second pair', "L U' L'"],
 ['Third pair', "U' R U R'"],
 ['Fourth pair', "R' U R U' U' R' U R"],
 ['Last-layer orientation', "U R' U' R U' R' U2 R"],
 ['Final alignment', 'U']
];
const human = segments.map(s => s[1]).join(' ');
const oriented = new Cube().move(scramble).move("y x'");
assert(new Cube(oriented).move(human).isSolved());
console.log('Human reconstruction solves:', human.split(' ').length);
solver.initFull();
const start = Date.now();
const solution = new solver.Search().solution(new Cube().move(scramble).asString(),16,100000,1000,0).trim();
console.log({solution, milliseconds:Date.now()-start});
assert(!solution.startsWith('Error'));
assert(new Cube().move(scramble).move(solution).isSolved());
const faces = 'URFDLB';
const rotate = alg => alg.trim().split(/\s+/).map(m => faces[oriented.center.indexOf(faces.indexOf(m[0]))] + m.slice(1)).join(' ');
const compact = rotate(solution);
assert(new Cube(oriented).move(compact).isSolved());
fs.writeFileSync(__dirname+'/prepared.json', JSON.stringify({scramble,inspection:"y x'",human,segments,compact,solution,centers:oriented.center,optimal:false},null,2));
