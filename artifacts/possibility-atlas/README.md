# The Shape of Possibility

Interactive study, 2026-10-28. Extends the earlier cube comparison with permutations, combinations, repeated colours, stars and bars, words versus states, legal cube positions, and a default 1D-to-3D coloured-token progression.

On 2026-11-03 the reading and the visible text were rewritten in plain language for secondary-school readers. The search-frontier view, the running-time lines under each view, the cost-model panel and the reading sections on running time and research papers were removed. The model and its computed results are unchanged.

## Open

- `possibility-atlas-v1.html`: standalone export. Open directly in a browser; no server is needed. All mathematical data and runtime drawing logic are embedded. Tested with external network requests blocked.
- Earlier cube study (`../cube-permutation-study/`): sourced human solve, comparison routes and linked cube views.
- `DERIVATIONS.md`: plain-language companion notes with a few source links. This file is the authored export source.

The 1D and nine-position models use exact breadth-first search. The same-nine example is CCCBBBAAA to ABCABCABC: 18 swaps on the line versus 8 on the grid. The 27-position lattice only provides a transport lower bound and reverse-history upper bound. It is not a Rubik's Cube and does not claim optimal solutions.

## Source and Checks

- `model.cjs`: exact counting and transition model.
- `visual.template.html`: editable presentation source.
- `build.cjs`: embeds the model and position permutations generated using the existing vendored cubejs dependency.
- `test.cjs`: 34,044 passing assertions, including exhaustive small-state distances, independent inversion parity, combinatorial identities and inverse replay.
- `test-browser.cjs`: Edge/Playwright interaction checks for the seven views at 1100, 390 and 320 pixels; maximum control values; state restoration; fixed-nine boards; manual and optimal swaps; theme and reduced-motion checks. Before the 2026-11-03 pass it passed for the earlier eight views with zero browser errors and zero overflow/label-bound violations. It has been updated for seven views but cannot run until the repository has a package manifest providing Playwright; `browser-check.json` records the earlier run.
- `desktop.png`, `mobile.png`, `mobile-derivation.png`, `dimensions-dark.png`: captured views. Mobile derivations were separately inspected after scrolling, since a full-page screenshot need not paint every offscreen iframe region.

## Rebuild

From the repository root, run each command separately:

```powershell
node artifacts/possibility-atlas/build.cjs
(Rendered with the Codex visualization renderer, which is not part of this repository.)
node artifacts/possibility-atlas/test.cjs
node artifacts/possibility-atlas/test-browser.cjs
```

The browser test uses the installed bundled Playwright and Edge. A restricted environment may require permission to launch the isolated browser profile. No user browser profile is used by these tests.

## Delivery Evidence

Local HTML SHA-256: `30071536160ebc1f3fad94795f2d794e0fcc3eb8775eb95b3c032f970180e0a7`.


Nothing was publicly hosted or made public.
