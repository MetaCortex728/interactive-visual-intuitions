# Cube paths and permutations

Compares routes between the same scrambled cube and the solved cube, shown as cube moves and as permutations of the pieces side by side. Built as `dist/cube-permutation-study.html` by `npm run build` from the repository root.

## Sources

- [Du reconstruction, credited to Yusheng Du](https://reco.nz/solve/3455): scramble, inspection orientation, executed moves and stage boundaries. The page's 2019 date is not presented as the competition date.
- [WCA Wuhu Open 2018](https://www.worldcubeassociation.org/competitions/WuhuOpen2018/results/all?event=333): confirms the 3.47-second single world record at that competition. This is a historical record, not a claim about the current record.
- [Cube20 research](https://www.cube20.org/): half-turn metric (HTM) definition, the universal 20-move bound, and Superflip's proven distance 20.
- [CubeSkills: Lookahead Progression Framework](https://www.cubeskills.com/blog/lookahead-progression-framework): human subgoals, piece tracking, familiar insertions and reducing pauses. Nothing is inferred about Du's exact thoughts or finger timing.
- [cubejs](https://github.com/ldez/cubejs) 1.3.2: move engine, kept with its MIT licence in `vendor/`.
- [min2phase.js](https://github.com/cs0x7f/min2phase.js) by Chen Shuang (GPL-3.0): two-phase search, run once to compute the 16-move Du route and the 21-turn Superflip result. Both are stored in `prepared.json` (`solution`, `compact`, `superflip.twoPhase`). The solver is not included and not needed.

## How the data is built

- `prepare.cjs` reads the stored solutions and checks with `vendor/cube.cjs` that each one solves its scramble.
- `build-data.cjs` regenerates `prepared.json` and `data.json` (move traces and per-move snapshots).
- `assemble.cjs` injects the verified traces into `visual.template.html` (the maintained page source) and writes the fragment to `output/cube-paths-and-permutations.html`; `npm run build` wraps it in the shared page shell. Three.js and its OrbitControls are vendored into `dist/vendor/three/` by the build; the page makes no network requests.

## The three cases

1. Du: replay of 31 recorded face-turn actions (27 HTM after merging adjacent turns of the same face) against a verified 16-HTM route for the same scramble in the same inspection frame. The 16-move route is an upper bound, not proven shortest. Playback keeps all 31 recorded actions; equal-duration animation is for teaching, not measured finger timing.
2. Exact short case: `R U R' U'` solved by its 4-move inverse, compared with five repetitions of that trigger (20 turns). Exhaustive breadth-first search finds 1, 18, 243 and 3,240 distinct states at distances 0 to 3, none of them the target, which proves the minimum is 4.
3. Superflip: the published 20-HTM minimum against a 21-turn two-phase result. Both solve; the minimum's lower bound is cited, not recomputed. The right lane is a solver, not a human.

## Checks

- `build-data.cjs`: all six paths solve; 118 immutable snapshots; each snapshot's 54 sticker identities match its piece state; both lanes share the same initial state; adjacent snapshots agree with the move engine; inverse and four-quarter-turn identities hold.
- `test-geometry.cjs`: all 18 rendered move endpoints match all 54 sticker identities, checked independently with 3D coordinate rotations. The human stage boundaries have a complete cross and 1, 2, 3, 4, 4, 4 completed corner-edge pairs.
- `test-browser.cjs`: headless Chromium against the built page with HTTP(S) blocked, at desktop and phone widths: nonblank and changing canvas pixels, all six solved endpoints, graph and piece selection, alignment, saved-state restore (from another window and on reopening), reduced motion, no horizontal overflow, the sticker-net fallback when Three.js cannot load, and no page errors. Results and screenshots go to `output/browser/cube-permutation-study/`.

## Limits

This explores these fixed cases; it is not a solver for arbitrary scrambles and makes no claim that two-phase output is optimal. The repeated trigger is an illustration, not a recommended solve. How well the page helps learners has not been measured.
