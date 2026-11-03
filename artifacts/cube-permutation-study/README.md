# Cube paths and permutations

Built and checked 2026-10-28 for a linked interactive comparison of shortest-move solutions, human speedsolving, and cubie permutations/orientations.

## Entry point and sources

`visual.template.html` is the maintained source; `assemble.cjs` injects verified traces and writes the fragment to `output/cube-paths-and-permutations.html`. `npm run build` (from the repository root) wraps it in the shared page shell as `dist/cube-permutation-study.html`, which opens directly from disk. Three.js 0.160.1 and its OrbitControls are vendored into `dist/vendor/three/` by the build; the page loads them through an import map and makes no network requests.

- [Du reconstruction, credited to Yusheng Du](https://reco.nz/solve/3455): scramble, inspection orientation, executed moves and stage boundaries. The page's 2019 date is not presented as the competition date.
- [WCA Wuhu Open 2018](https://www.worldcubeassociation.org/competitions/WuhuOpen2018/results/all?event=333): confirms the 3.47-second single world record at that competition. This is a historical record, not a claim about the current record.
- [Cube20 research](https://www.cube20.org/): HTM definition, universal 20-move bound, and Superflip's proven distance 20.
- [CubeSkills: Lookahead Progression Framework](https://www.cubeskills.com/blog/lookahead-progression-framework): human subgoals, piece tracking, familiar insertions and reducing pauses. No inference about Du's exact thoughts or finger timing is claimed.
- [cubejs](https://github.com/ldez/cubejs), version 1.3.2: move engine. The downloaded source and its upstream MIT licence are retained in `vendor/`.
- [min2phase.js](https://github.com/cs0x7f/min2phase.js) by Chen Shuang (GPL-3.0): two-phase search. It was run once to compute the 16-move Du route and the 21-turn Superflip result; both are stored in `prepared.json` (`solution`, `compact`, `superflip.twoPhase`). The solver is not included in this repository and is not required: `prepare.cjs` and `build-data.cjs` read the stored solutions and check with `vendor/cube.cjs` that each one solves its scramble.

## Comparisons and evidence limits

1. Du: replay of 31 recorded face-turn actions, or 27 HTM after adjacent same-face simplification, against a verified 16-HTM route for the identical scramble in the identical inspection frame. The latter is an upper bound, NOT proven globally shortest. Playback preserves the recorded 31 actions. Equal-duration animation is pedagogical, not measured finger timing. It predicts no human speed for the 16-turn route.
2. Exact short case: `R U R' U'`, inverse solution of length 4, compared to five repetitions of that familiar trigger (20 turns). Exhaustive BFS finds 1, 18, 243 and 3,240 unique states at distances 0-3, excluding the target, which proves minimum 4. The repeated trigger is an illustration, not a real record or a recommendation for an expert solve.
3. Superflip: published 20-HTM minimum compared with a 21-turn two-phase result computed once and stored in `prepared.json`. Both solve. The minimum's lower bound is cited, not recomputed here. The right lane is a solver, not a human.

This is a validated explorer of these cases, not an arbitrary-scramble optimal solver. No mathematical claim that every fast two-phase output is optimal is made.

## Verification

- `node build-data.cjs`: all six paths solve; 118 immutable snapshots; every snapshot's 54 sticker identities match its cubie state; both lanes share the same initial state; adjacent snapshots match the move engine; inverse and four-quarter-turn identities pass.
- `node test-geometry.cjs`: all 18 rendered move endpoints match all 54 sticker identities independently using 3D coordinate rotations. The human stage boundaries have a complete cross and 1, 2, 3, 4, 4, 4 completed F2L pairs respectively.
- `test-browser.cjs`: Playwright with its bundled Chromium, headless, against `dist/cube-permutation-study.html`; desktop and mobile. Nonblank canvas pixels, changing playback pixels, all six solved endpoints, graph clicking and native piece selection, same-progress alignment, saved-state restoration (from another window and on reopening the page), reduced-motion stepping, no horizontal overflow at 352px inner width, blocked network, sticker-net fallback when Three.js cannot load; no page errors. The result and screenshots go to `output/browser/cube-permutation-study/`.
- Two defects found and fixed before delivery: mutable `toJSON()` array references corrupted historical permutation snapshots; saved-state echoes stopped animation. Tests cover both behaviors.

Rebuild: `prepare.cjs` (verifies the stored solutions) and `build-data.cjs` regenerate `prepared.json` and `data.json`; then run `npm run build` from the repository root, which runs `assemble.cjs` and writes the standalone page to `dist/`. Saved positions are kept in the browser's local storage. The page makes no network requests at view time.

User acceptance and measured learning benefits remain untested. No changes to installed skills, personal instructions, other applications or previous visualizations were made.

