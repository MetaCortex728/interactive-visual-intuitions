# Cube paths and permutations

Built and checked 2026-10-28 for a linked interactive comparison of shortest-move solutions, human speedsolving, and cubie permutations/orientations.

## Entry point and sources

The original entry point was a fragment rendered by the Codex visualization tool.
`visual.template.html` is the maintained source; `assemble.cjs` injects verified traces.
`preview.html` is the generated browser-test wrapper, not a separately published service.

- [Du reconstruction, credited to Yusheng Du](https://reco.nz/solve/3455): scramble, inspection orientation, executed moves and stage boundaries. The page's 2019 date is not presented as the competition date.
- [WCA Wuhu Open 2018](https://www.worldcubeassociation.org/competitions/WuhuOpen2018/results/all?event=333): confirms the 3.47-second single world record at that competition. This is a historical record, not a claim about the current record.
- [Cube20 research](https://www.cube20.org/): HTM definition, universal 20-move bound, and Superflip's proven distance 20.
- [CubeSkills: Lookahead Progression Framework](https://www.cubeskills.com/blog/lookahead-progression-framework): human subgoals, piece tracking, familiar insertions and reducing pauses. No inference about Du's exact thoughts or finger timing is claimed.
- [cubejs](https://github.com/ldez/cubejs), version 1.3.2: move engine. [min2phase.js](https://github.com/cs0x7f/min2phase.js): two-phase search. Downloaded sources and upstream license files are retained in `vendor/`.

## Comparisons and evidence limits

1. Du: replay of 31 recorded face-turn actions, or 27 HTM after adjacent same-face simplification, against a verified 16-HTM route for the identical scramble in the identical inspection frame. The latter is an upper bound, NOT proven globally shortest. Playback preserves the recorded 31 actions. Equal-duration animation is pedagogical, not measured finger timing. It predicts no human speed for the 16-turn route.
2. Exact short case: `R U R' U'`, inverse solution of length 4, compared to five repetitions of that familiar trigger (20 turns). Exhaustive BFS finds 1, 18, 243 and 3,240 unique states at distances 0-3, excluding the target, which proves minimum 4. The repeated trigger is an illustration, not a real record or a recommendation for an expert solve.
3. Superflip: published 20-HTM minimum compared with a locally computed 21-turn two-phase result. Both solve. The minimum's lower bound is cited, not recomputed here. The right lane is a solver, not a human.

This is a validated explorer of these cases, not an arbitrary-scramble optimal solver. No mathematical claim that every fast two-phase output is optimal is made.

## Verification

- `node build-data.cjs`: all six paths solve; 118 immutable snapshots; every snapshot's 54 sticker identities match its cubie state; both lanes share the same initial state; adjacent snapshots match the move engine; inverse and four-quarter-turn identities pass.
- `node test-geometry.cjs`: all 18 rendered move endpoints match all 54 sticker identities independently using 3D coordinate rotations. The human stage boundaries have a complete cross and 1, 2, 3, 4, 4, 4 completed F2L pairs respectively.
- `node test-browser.cjs`: Playwright/Edge, desktop and mobile. Nonblank canvas pixels, changing playback pixels, all six solved endpoints, graph clicking and native piece selection, same-progress alignment, saved-state restoration, reduced-motion stepping, no horizontal overflow at 320px inner width, blocked-CDN sticker-net fallback; no page errors. Desktop and mobile screenshots inspected.
- Two defects found and fixed before delivery: mutable `toJSON()` array references corrupted historical permutation snapshots; host saved-state echoes stopped animation. Tests cover both behaviors.

Rebuild: run `build-data.cjs`, then `assemble.cjs`; regenerate `preview.html` with the bundled visualize `render.py --force` before browser testing. The tests use the bundled Playwright package and installed Edge; a sandbox permitting browser startup/network library loads is needed. The visualization itself makes no application API requests, and uses version-pinned Three.js modules from esm.sh.

User acceptance and measured learning benefits remain untested. No changes to installed skills, personal instructions, other applications or previous visualizations were made.

