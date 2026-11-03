const fs = require('fs');
const assert = require('assert/strict');
const Cube = require('./vendor/cube.cjs');
// The two solver outputs below were computed once with an external two-phase solver
// and are stored in prepared.json; this script only verifies them.
const stored = require('./prepared.json');
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
assert.equal(stored.scramble, scramble);
const solution = stored.solution;
assert.equal(typeof solution, 'string');
assert(new Cube().move(scramble).move(solution).isSolved(), 'stored solution must solve the scramble');
assert.equal(solution.trim().split(/\s+/).length, 16);
console.log('Stored short solution solves:', solution);
const superflip = stored.superflip;
assert(superflip && typeof superflip.scramble === 'string' && typeof superflip.twoPhase === 'string');
const superState = new Cube().move(superflip.scramble);
assert(superState.co.every(v => v === 0) && superState.eo.every(v => v === 1));
assert(superState.cp.every((v, i) => v === i) && superState.ep.every((v, i) => v === i));
assert(new Cube(superState).move(superflip.twoPhase).isSolved(), 'stored two-phase result must solve Superflip');
assert.equal(superflip.twoPhase.trim().split(/\s+/).length, 21);
console.log('Stored Superflip two-phase result solves:', superflip.twoPhase);
const faces = 'URFDLB';
const rotate = alg => alg.trim().split(/\s+/).map(m => faces[oriented.center.indexOf(faces.indexOf(m[0]))] + m.slice(1)).join(' ');
const compact = rotate(solution);
assert(new Cube(oriented).move(compact).isSolved());
assert.equal(compact, stored.compact, 'stored compact form must match the rotated solution');
fs.writeFileSync(__dirname+'/prepared.json', JSON.stringify({scramble,inspection:"y x'",human,segments,compact,solution,centers:oriented.center,optimal:false,superflip},null,2));
