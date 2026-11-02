# Mathematics of Change

Built 2026-10-28 to explore relevant mathematics beyond the cube, progressively and interactively, without artificial subject boundaries.

## Open

- [Complete interactive document](mathematics-of-change.html): sequence-first explorer plus synchronized reading companion, native MathML equations, and a complete-reading option. The cube's 3D rendering needs the pinned Three.js CDN and WebGL; its endpoint net and all other experiments work offline.
- [Reading source](GUIDE.md): approximately 5,900 words including derivations, reflection prompts, complexity assumptions and research links.

The existing cube and possibility-atlas outputs are unchanged. Their specialized experiments are linked as companion labs, not silently reimplemented or mislabeled as new findings.

## Sequence-First Revision (1.1)

Following Han's visual reference, the default view now pairs concrete action and abstract structure on one playhead. Eight stories cover three-token ordering, sliding-grid reachability, cube sticker cycles, operation order, projection, probability flow, paired descent trajectories and winding. Play/pause, previous/next transition, direct sequence selection and fractional scrubbing update both views. Color identities persist; cube stickers have unique home-face/position IDs. Clicking either representation selects the corresponding identity. The cube sequence is a commutator followed by its inverse, not a new shortest-solve claim.

The full thirteen-view explorer and reading are retained under **Explore all fields**. These eight opening traces are guided illustrations, not a replacement for the broader interactive curriculum. The 1D/2D/3D examples use different move rules; the dimension-only comparison remains in the linked atlas.

## Contents

1. Identity and quotient sets.
2. Modular arithmetic and orbits.
3. Noncommuting triangle symmetries.
4. Generators, configuration graphs and shortest paths.
5. Sliding-puzzle invariants and impossible states.
6. Necklaces, stabilizers and Burnside counting.
7. Linear operators, determinant and information loss.
8. Exact rotation, Euler drift and structure-preserving midpoint integration.
9. Probability, periodicity, mixing and entropy.
10. Fourier modes, eigenvalues and graph diffusion.
11. Optimization, conditioning and spectral stability.
12. Winding, forbidden crossings and homotopy.
13. A navigable connection map.

## Verification

`node artifacts/mathematical-journey/test.cjs` passed **238,745 assertions**. These include all **181,440 reachable standard 3x3 sliding-puzzle states**, group composition/inverses, graph paths, orbit-stabilizer counts, matrix properties, numerical-flow formulas, probability normalization, spectral predictions, descent recurrences and winding away from singularities. Enumeration is finite evidence; the document separately supplies mathematical derivations.

`node artifacts/mathematical-journey/test-browser.cjs` passed in isolated headless Edge at 1100, 736, 390 and 320 pixels. All 13 navigation views, representative native controls, parameter extremes, saved-state events, reading-panel synchronization, math/paragraph preservation, light/dark appearance and blocked-network operation were exercised. No page exceptions, horizontal overflow, SVG text clipping or undersized tested SVG labels were found. Screenshots were inspected; a state-redraw issue, unstable necklace sizing and unescaped mathematical inequalities were repaired before the final export.

`test-sequences.cjs` adds **904 checks** for source/destination maps, inverse replay, cycle endpoints, exact cube geometry and model agreement. `test-sequence-browser.cjs` checks all eight stories at 1100, 736, 390 and 320 pixels, actual Three.js mesh endpoints for all 54 stickers, nonblank/changing canvas pixels, playback/step/scrub/selection, state restoration, reduced motion and the offline net fallback. Narrow-screen cycle labels and a presentation/Fourier state-name collision were fixed; both browser suites then passed with no reported page errors or tested label clipping.

The original UI suite blocks HTTP(S) requests. The new sequence suite checks online 3D and a separately network-blocked fallback. There is no server, API call or remote model dependency in the mathematical computations. Three.js and its orbit control are pinned to 0.160.1 and loaded from the same allowed CDN as the earlier cube study. Browser/module availability can change presentation: an offline net is explicitly not identical to 3D.


## Files and Reproduction

- `model.cjs`: shared discrete/numerical model.
- `chapters.cjs`, `equations.cjs`, `preface.md`, `afterword.md`: reading content and typeset laws.
- `visual.template.html`: interactive fragment source.
- `sequence.template.html`, `sequence-model.cjs`, `sequence-data.cjs`: linked visual sequences, shared geometry and traces generated from the existing cube.js engine.
- `build.cjs`: generates the fragment in the original visualization directory and `GUIDE.md`.
- `export.cjs`: adds the synchronized reading companion to the standard standalone wrapper.
- `test.cjs`, `test-browser.cjs`, `browser-check.json`: verification.

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

This is a substantive connected learning path, not an exhaustive encyclopedia, arbitrary theorem prover, general optimizer, CFD simulator, or arbitrary-cube optimal solver. Every experiment names its state space and rules. Fixed-size examples do not imply asymptotic hardness or scalable performance. Native HTML state persistence depends on the viewing surface; cross-device synchronization is not promised.
