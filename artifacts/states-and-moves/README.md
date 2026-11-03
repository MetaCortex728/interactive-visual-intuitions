# States and Moves

Elementary mathematics around states and moves, in plain language for secondary-school readers. Built as `dist/states-and-moves.html` by `npm run build` from the repository root: five linked visual sequences, an explorer with six chapters and a connection map, and a reading companion below them.

## Contents

Visual sequences (the opening view): three-token ordering, sliding-grid reachability, cube sticker cycles, the order of two operations, and probability flow. Each pairs a concrete action with its structure on one playhead, with play, pause, step, scrub and selection. The cube sequence is `R U R' U'` followed by the same moves undone in reverse order, not a shortest-solve claim.

Chapters (under **Explore all fields**):

1. Counting: identity, colour classes and arrangements.
2. Clock arithmetic: repeated steps on a clock.
3. Order of actions: triangle symmetries, where the order of two moves matters.
4. Shortest routes: arrangements as states, moves as edges.
5. Things that never change: sliding-puzzle parity and impossible states.
6. Chance: a random walk on a six-cycle; probability moves but always adds to 1.

A connection map links the chapters. The cube work reuses `../cube-permutation-study/vendor/cube.cjs` and `data.json`; the dimension-only token comparison is left to The Shape of Possibility.

## Sources and how the data is built

- `model.cjs`: the shared discrete model and random-walk update.
- `chapters.cjs`, `equations.cjs`, `preface.md`, `afterword.md`: reading content and typeset equations (native MathML).
- `visual.template.html`: explorer source.
- `sequence.template.html`, `sequence-model.cjs`, `sequence-data.cjs`: visual sequences, shared geometry, and traces generated with the cubejs engine.
- `build.cjs`: writes the fragment to `output/states-and-moves.html` and regenerates `GUIDE.md`, the full reading (about 3,800 words).
- `companion.cjs`: the reading companion, rendered with `marked` and added below the explorer by `npm run build`.

The 3D cube uses the vendored Three.js in `dist/vendor/three/` and needs WebGL; without it the cube is shown as a flat net, which is not identical to the 3D view.

## Checks

- `test.cjs`: 189,328 assertions, including all 181,440 reachable 3 × 3 sliding-puzzle states, colour groups, clock loops, triangle move combinations and reverse moves, shortest routes, and probability that stays nonnegative and adds to 1.
- `test-sequences.cjs`: 904 checks of source and destination maps, inverse replay, cycle endpoints, exact cube geometry and agreement with the model.
- `test-browser.cjs`: headless Chromium at 1100, 736, 390 and 320 pixels with HTTP(S) blocked: every chapter, representative controls, extreme settings, saved-state restore (from another window and on reopening), the reading companion's synchronization and its link to the explorer, and light and dark schemes.
- `test-sequence-browser.cjs`: every sequence at the same widths, the Three.js mesh positions of all 54 stickers, nonblank and changing canvas pixels, play, pause, step, scrub and selection, saved-state restore, reduced motion, and the flat fallback when Three.js is blocked.

Browser results and screenshots go to `output/browser/states-and-moves/` and `output/browser/states-and-moves-sequences/`. Enumeration is finite evidence; the reading supplies the derivations.

## Limits

This is a connected learning path, not an encyclopedia, theorem prover or cube solver. Every experiment names its states and rules, and results on fixed small examples say nothing about how hard larger puzzles are. The sequences are guided illustrations, and the 1D, 2D and 3D examples use different move rules. Saved state stays in this browser's local storage. How well the page helps learners has not been measured.
