# The Shape of Possibility

Counting and rearrangement: permutations, combinations, repeated colours, stars and bars, words versus states, legal cube positions, and coloured tokens swapped on a line, a grid and a block of positions. Built as `dist/possibility-atlas.html` by `npm run build` from the repository root.

## Sources

- `DERIVATIONS.md`: plain-language notes behind each view, with a few source links.
- The corner and edge permutations for the cube moves `R`, `U` and `R U R' U'` are generated with the cubejs engine vendored in `../cube-permutation-study/vendor/`.

## How the data is built

- `model.cjs`: exact counting and swap-distance model.
- `visual.template.html`: page source.
- `build.cjs`: embeds the model and those cube permutations in the template and writes the fragment to `output/possibility-atlas.html`; `npm run build` wraps it in the shared page shell. All data and drawing code are embedded, so the page needs no network.

Distances on the 3-position line and the 9-position line and grid come from exact breadth-first search. The fixed comparison takes the same nine colours from CCCBBBAAA to ABCABCABC: 18 swaps on the line against 8 on the grid. For the 27-position block, the page shows only a lower bound (how far tokens must travel) and an upper bound (undoing the recorded swaps); it does not claim optimal solutions there, and the block is not a Rubik's Cube.

## Checks

- `test.cjs`: 34,044 assertions, including exhaustive small-state distances, an independent inversion-parity check, counting identities and inverse replay.
- `test-browser.cjs`: headless Chromium against the built page with HTTP(S) blocked: the seven views at 1100, 390 and 320 pixels, maximum control values, saved-state restore (from another window and on reopening), the fixed nine-token boards, manual and optimal swaps, light and dark schemes, and reduced motion. It fails on any page error, horizontal overflow or label outside its drawing. Results and screenshots go to `output/browser/possibility-atlas/`.

Run them on their own from the repository root with `node artifacts/possibility-atlas/test.cjs` and, after `npm run build`, `node artifacts/possibility-atlas/test-browser.cjs`.

## Limits

Results are for the fixed small boards shown; they say nothing general about larger boards. How well the page helps learners has not been measured.
