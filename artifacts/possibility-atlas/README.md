# The Shape of Possibility

Interactive study, 2026-10-28. Extends the earlier cube comparison with permutations, combinations, repeated colours, stars and bars, words versus states, legal cube positions, and a default 1D-to-3D coloured-token progression.

On 2026-11-03 the reading and the visible text were rewritten in plain language for secondary-school readers. The search-frontier view, the running-time lines under each view, the cost-model panel and the reading sections on running time and research papers were removed. The model and its computed results are unchanged.

## Open

- `dist/possibility-atlas.html` (after `npm ci` and `npm run build` in the repository root): standalone page. Open directly in a browser; no server or network connection is needed. All mathematical data and runtime drawing logic are embedded.
- Earlier cube study (`../cube-permutation-study/`): sourced human solve, comparison routes and linked cube views.
- `DERIVATIONS.md`: plain-language companion notes with a few source links. This file is the authored export source.

The 1D and nine-position models use exact breadth-first search. The same-nine example is CCCBBBAAA to ABCABCABC: 18 swaps on the line versus 8 on the grid. The 27-position lattice only provides a transport lower bound and reverse-history upper bound. It is not a Rubik's Cube and does not claim optimal solutions.

## Source and Checks

- `model.cjs`: exact counting and transition model.
- `visual.template.html`: editable presentation source.
- `build.cjs`: embeds the model and position permutations generated using the existing vendored cubejs dependency.
- `test.cjs`: 34,044 passing assertions, including exhaustive small-state distances, independent inversion parity, combinatorial identities and inverse replay.
- `test-browser.cjs`: Playwright interaction checks in headless Chromium against `dist/possibility-atlas.html` for the seven views at 1100, 390 and 320 pixels, with the network blocked; maximum control values; state restoration (from another window and on reopening the page); fixed-nine boards; manual and optimal swaps; theme and reduced-motion checks. It requires zero browser errors and zero overflow or label-bound violations. The result (`possibility-atlas.json`) and screenshots (`desktop.png`, `mobile.png`, `mobile-derivation.png`, `dimensions-dark.png`) go to `output/browser/possibility-atlas/`.

## Rebuild

From the repository root, run each command separately:

```sh
npm run build
node artifacts/possibility-atlas/test.cjs
node artifacts/possibility-atlas/test-browser.cjs
```

`npm run build` runs `build.cjs` (fragment in `output/possibility-atlas.html`) and wraps it as `dist/possibility-atlas.html`. The browser test opens that page in Playwright's bundled Chromium, so run `npm run build` first (`npm run test:browser` does this for you). No user browser profile is used by these tests.

## Delivery Evidence

Local HTML SHA-256: `30071536160ebc1f3fad94795f2d794e0fcc3eb8775eb95b3c032f970180e0a7`.


Nothing was publicly hosted or made public.
