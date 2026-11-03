# Interactive Visual Intuitions

Interactive browser visualizations that build intuition for elementary mathematics: counting and arrangement, order of operations, paths between states, and chance.

## Origin

Han developed these studies locally in October 2026 with OpenAI Codex as a coding assistant, without version control. This repository starts from that local snapshot (2026-10-28 sources) and continues development here.

The first commit imports the sources as they were, except for files that cannot be redistributed in this repository:

- HTML exports produced by the Codex visualization renderer, whose wrapper code is not part of this project;
- `min2phase.js` (GPL-3.0), used only to precompute two cube solutions that remain in `prepared.json` and `data.json`;
- screenshots and a delivery record tied to the original machine.

Paths to the original machine were replaced on import: build scripts write to `output/`, and browser tests and the exporter load `playwright` and `marked` as ordinary packages. There is no package manifest or standalone renderer yet; adding them is the next step.

## Layout

- `artifacts/cube-permutation-study/`: a human speedsolve, a shorter computed route and a short commutator, shown as cube moves and permutations side by side.
- `artifacts/possibility-atlas/`: permutations, combinations, repeated colours and token arrangements in one, two and three dimensions.
- `artifacts/mathematical-journey/`: Mathematics of Change, six interactive chapters (telling arrangements apart, repeated steps, order of moves, shortest paths, parity and a random walk) plus a connection map, five linked visual sequences and a reading companion; it imports the cube study's `vendor/cube.cjs` and `data.json`.
