# Mathematics of Change

Built 2026-10-28 to explore elementary mathematics around the cube, progressively and interactively, without artificial subject boundaries.

## Open

- [Complete interactive document](mathematics-of-change.html): sequence-first explorer plus synchronized reading companion, native MathML equations, and a complete-reading option. The cube's 3D rendering needs the pinned Three.js CDN and WebGL; its endpoint net and all other experiments work offline.
- [Reading source](GUIDE.md): approximately 3,600 words including derivations, reflection prompts, complexity assumptions and a further-reading link.

The existing cube and possibility-atlas outputs are unchanged. Their specialized experiments are linked as companion labs, not silently reimplemented or mislabelled as new findings.

## Elementary Scope (1.2)

On 2026-11-03 the journey was trimmed to material a secondary-school reader can follow through the visuals. The chapters on necklace counting, linear maps, continuous flows, hidden modes, optimization and loops around a hole were removed, together with their views, model functions, equations, reading text, visual sequences and tests. The probability chapter now shows only a random walk on a six-cycle: probability moves between states and always adds to 1.

## Sequence-First Revision (1.1)

Following Han's visual reference, the default view pairs concrete action and abstract structure on one playhead. Five stories cover three-token ordering, sliding-grid reachability, cube sticker cycles, operation order and probability flow. Play/pause, previous/next transition, direct sequence selection and fractional scrubbing update both views. Colour identities persist; cube stickers have unique home-face/position IDs. Clicking either representation selects the corresponding identity. The cube sequence is a commutator followed by its inverse, not a new shortest-solve claim.

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

`node artifacts/mathematical-journey/test.cjs` passes **189,328 assertions**. These include all **181,440 reachable standard 3x3 sliding-puzzle states**, colour classes, clock orbits, group composition/inverses, graph paths, probability normalization and nonnegativity, and the unchanged even distribution. Enumeration is finite evidence; the document separately supplies mathematical derivations.

`test-sequences.cjs` passes **904 checks** for source/destination maps, inverse replay, cycle endpoints, exact cube geometry and model agreement.

`test-browser.cjs` and `test-sequence-browser.cjs` have been updated for the seven views and five stories but have not been run since the trim: the repository has no package manifest yet, so Playwright is not available. Before the trim, both suites passed in headless Edge at 1100, 736, 390 and 320 pixels for the earlier thirteen views and eight stories; `browser-check.json` and `sequence-browser-check.json` are the records of that earlier run and will be overwritten by the next one. The explorer suite covers every navigation view, representative native controls, parameter extremes, saved-state events, reading-panel synchronization, math/paragraph preservation, light/dark appearance and blocked-network operation. The sequence suite covers all stories, actual Three.js mesh endpoints for all 54 stickers, nonblank/changing canvas pixels, playback/step/scrub/selection, state restoration, reduced motion and the offline net fallback.

The explorer suite blocks HTTP(S) requests. The sequence suite checks online 3D and a separately network-blocked fallback. There is no server, API call or remote model dependency in the mathematical computations. Three.js and its orbit control are pinned to 0.160.1 and loaded from the same allowed CDN as the earlier cube study. Browser/module availability can change presentation: an offline net is explicitly not identical to 3D.


## Files and Reproduction

- `model.cjs`: shared discrete model and random-walk update.
- `chapters.cjs`, `equations.cjs`, `preface.md`, `afterword.md`: reading content and typeset laws.
- `visual.template.html`: interactive fragment source.
- `sequence.template.html`, `sequence-model.cjs`, `sequence-data.cjs`: linked visual sequences, shared geometry and traces generated from the existing cube.js engine.
- `build.cjs`: generates the fragment in the original visualization directory and `GUIDE.md`.
- `export.cjs`: adds the synchronized reading companion to the standard standalone wrapper.
- `test.cjs`, `test-sequences.cjs`, `test-browser.cjs`, `test-sequence-browser.cjs`: verification; `browser-check.json` and `sequence-browser-check.json` record browser runs.

Run these separately from the workspace root:

```powershell
node artifacts/mathematical-journey/build.cjs
(Rendered with the Codex visualization renderer, which is not part of this repository.)
node artifacts/mathematical-journey/export.cjs
node artifacts/mathematical-journey/test.cjs
node artifacts/mathematical-journey/test-browser.cjs
node artifacts/mathematical-journey/test-sequences.cjs
node artifacts/mathematical-journey/test-sequence-browser.cjs
```

The exporter uses the configured local `marked` package; browser tests use the bundled Playwright package and Edge. No installation was performed. The final document has no build-time dependency at viewing time.

## Deliberate Boundaries

This is a substantive connected learning path, not an exhaustive encyclopedia, theorem prover or arbitrary-cube optimal solver. Every experiment names its state space and rules. Fixed-size examples do not imply asymptotic hardness or scalable performance. Native HTML state persistence depends on the viewing surface; cross-device synchronization is not promised.
