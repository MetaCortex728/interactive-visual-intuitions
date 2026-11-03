# States and Moves

Built 2026-10-28 to explore elementary mathematics around the cube, step by step and interactively, without artificial subject boundaries.

## Open

- `dist/states-and-moves.html` (after `npm ci` and `npm run build` in the repository root): sequence-first explorer plus synchronized reading companion, native MathML equations, and a complete-reading option. Everything works offline, opened directly from disk. The cube's 3D rendering uses the vendored Three.js in `dist/vendor/three/` and needs WebGL; without WebGL it is shown as an endpoint net.
- [Reading source](GUIDE.md): approximately 3,800 words including derivations, reflection prompts and further branches.

The existing cube and possibility-atlas outputs are unchanged. Their specialized experiments are linked as companion labs, not silently reimplemented or mislabelled as new findings.

## Plain Language and New Name (1.3)

On 2026-11-03 the lab directory and the document were renamed States and Moves (git history records the earlier name); the build now writes `output/states-and-moves.html` and creates `output/` if needed. The six chapters, equations, preface, afterword and on-screen text were rewritten for a curious secondary-school reader: group-theory vocabulary was replaced by everyday descriptions, field labels became plain ones (Counting, Clock arithmetic, Order of actions, Shortest routes, Things that never change, Chance), and the running-time ("Complexity") part of every chapter was removed from the data, the reading, the guide and the explorer. University-level reading links were dropped. The exact claims and the distinction between proofs, complete computer checks and illustrations are unchanged.

## Elementary Scope (1.2)

On 2026-11-03 the journey was trimmed to material a secondary-school reader can follow through the visuals. The chapters on necklace counting, linear maps, continuous flows, hidden modes, optimization and loops around a hole were removed, together with their views, model functions, equations, reading text, visual sequences and tests. The probability chapter now shows only a random walk on a six-cycle: probability moves between states and always adds to 1.

## Sequence-First Revision (1.1)

Following Han's visual reference, the default view pairs concrete action and abstract structure on one playhead. Five stories cover three-token ordering, sliding-grid reachability, cube sticker cycles, operation order and probability flow. Play/pause, previous/next transition, direct sequence selection and fractional scrubbing update both views. Colour identities persist; cube stickers have unique home-face/position IDs. Clicking either representation selects the corresponding identity. The cube sequence is the four moves R U R' U' followed by the same moves undone in reverse order, not a new shortest-solve claim.

The full seven-view explorer and reading are retained under **Explore all fields**. These five opening traces are guided illustrations, not a replacement for the interactive chapters. The 1D/2D/3D examples use different move rules; the dimension-only comparison remains in the linked atlas.

## Contents

1. Identity, colour classes and counting arrangements.
2. Repeated steps on a clock and modular arithmetic.
3. Triangle symmetries: the order of two moves matters.
4. Moves as edges, arrangements as states, and shortest paths.
5. Sliding-puzzle parity and impossible states.
6. A random walk on a six-cycle: probability moves, its total stays 1.
7. A navigable connection map.

## Verification

`node artifacts/states-and-moves/test.cjs` passes **189,328 assertions**. These include all **181,440 reachable standard 3x3 sliding-puzzle states**, colour groups, clock loops, triangle move combinations and reverse moves, shortest routes, probability normalization and nonnegativity, and the unchanged even distribution. Enumeration is finite evidence; the document separately supplies mathematical derivations.

`test-sequences.cjs` passes **904 checks** for source/destination maps, inverse replay, cycle endpoints, exact cube geometry and model agreement.

`test-browser.cjs` and `test-sequence-browser.cjs` have been updated for the seven views, five stories and the renamed controls and readouts but have not been run since the trim; they still target the earlier host-rendered export and are being moved to `dist/`. Before the trim, both suites passed in headless Edge at 1100, 736, 390 and 320 pixels for the earlier thirteen views and eight stories; `browser-check.json` and `sequence-browser-check.json` are the records of that earlier run and will be overwritten by the next one. The explorer suite covers every navigation view, representative native controls, parameter extremes, saved-state events, reading-panel synchronization, math/paragraph preservation, light/dark appearance and blocked-network operation. The sequence suite covers all stories, actual Three.js mesh endpoints for all 54 stickers, nonblank/changing canvas pixels, playback/step/scrub/selection, state restoration, reduced motion and the offline net fallback.

The explorer suite blocks HTTP(S) requests. The sequence suite checks 3D and a separate fallback when Three.js cannot load. There is no server, API call or remote model dependency in the mathematical computations. Three.js and its orbit control are pinned to 0.160.1 and vendored by the build, as for the cube study. WebGL availability can change presentation: the fallback net is explicitly not identical to 3D.


## Files and Reproduction

- `model.cjs`: shared discrete model and random-walk update.
- `chapters.cjs`, `equations.cjs`, `preface.md`, `afterword.md`: reading content and typeset laws.
- `visual.template.html`: interactive fragment source.
- `sequence.template.html`, `sequence-model.cjs`, `sequence-data.cjs`: linked visual sequences, shared geometry and traces generated from the existing cube.js engine.
- `build.cjs`: generates the fragment in `output/` (creating it if missing) and regenerates `GUIDE.md`.
- `companion.cjs`: the synchronized reading companion; `npm run build` adds it below the explorer in `dist/states-and-moves.html`.
- `test.cjs`, `test-sequences.cjs`, `test-browser.cjs`, `test-sequence-browser.cjs`: verification; `browser-check.json` and `sequence-browser-check.json` record browser runs.

Run these separately from the workspace root:

```sh
npm run build
node artifacts/states-and-moves/test.cjs
node artifacts/states-and-moves/test-browser.cjs
node artifacts/states-and-moves/test-sequences.cjs
node artifacts/states-and-moves/test-sequence-browser.cjs
```

`npm run build` runs `build.cjs` and uses `marked` to render the preface and afterword for the reading companion. Browser tests use Playwright. The built page needs nothing from the network at viewing time.

## Deliberate Boundaries

This is a substantive connected learning path, not an exhaustive encyclopedia, theorem prover or arbitrary-cube optimal solver. Every experiment names its state space and rules. Results on fixed-size examples say nothing about how hard larger versions of a puzzle are. Saved state is kept in this browser's local storage only; cross-device synchronization is not promised.
