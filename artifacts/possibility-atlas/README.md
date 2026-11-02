# The Shape of Possibility

Interactive study, 2026-10-28. Extends the earlier cube comparison with permutations, combinations, repeated colors, stars and bars, words versus states, cube invariants, search frontiers, and a default 1D-to-3D colored-token progression.

## Open

- `possibility-atlas-v1.html`: standalone export. Open directly in a browser; no server is needed. All mathematical data and runtime drawing logic are embedded. Tested with external network requests blocked.
- Earlier cube study (`../cube-permutation-study/`): sourced human solve, comparison routes and linked cube views.
- `DERIVATIONS.md`: reopenable local companion notes and source links. This file is the authored export source.

The 1D and nine-position models use exact BFS. The same-nine example is CCCBBBAAA to ABCABCABC: 18 swaps on the line versus 8 on the grid. The 27-position lattice only provides a transport lower bound and reverse-history upper bound. It is not a Rubik's Cube and does not claim optimal solutions.

## Source and Checks

- `model.cjs`: exact counting and transition model.
- `visual.template.html`: editable presentation source.
- `build.cjs`: embeds the model and position permutations generated using the existing vendored cubejs dependency.
- `test.cjs`: 34,044 passing assertions, including exhaustive small-state distances, independent inversion parity, combinatorial identities and inverse replay.
- `test-browser.cjs`: passing Edge/Playwright interaction checks for eight views at 1100, 390 and 320 pixels; maximum control values; state restoration; fixed-nine boards; manual and optimal swaps; theme and reduced-motion checks. Browser errors and measured overflow/label-bound violations: zero.
- `desktop.png`, `mobile.png`, `mobile-derivation.png`, `dimensions-dark.png`: captured views. Mobile derivations were separately inspected after scrolling, since a full-page screenshot need not paint every offscreen iframe region.

The generator complexity table describes algorithms with an explicit-output contract, not benchmarked browser complexity. Some bounded UI enumerators materialize all results.

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
