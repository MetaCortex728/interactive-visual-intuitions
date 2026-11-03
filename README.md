# Interactive Visual Intuitions

Interactive browser visualizations that build intuition for elementary mathematics: counting and arrangement, order of operations, paths between states, and chance.

## Origin

Han developed these studies locally in October 2026 with OpenAI Codex as a coding assistant, without version control. This repository starts from that local snapshot (2026-10-28 sources) and continues development here.

The first commit imports the sources as they were, except for files that cannot be redistributed in this repository:

- HTML exports produced by the original host renderer, whose wrapper code is not part of this project;
- the min2phase.js solver (GPL-3.0), used only to precompute two cube solutions that are now stored in `prepared.json` (see [License](#license));
- screenshots and a delivery record tied to the original machine.

Paths to the original machine were replaced on import: build scripts write to `output/`, and browser tests load `playwright` as an ordinary package. The labs were first shown inside a host page that supplied colours, fonts and saved state; that role is now played by this repository's own page shell (see [Build and open](#build-and-open)).

## Build and open

Requires Node.js 24 or later.

```sh
npm ci
npx playwright install chromium
npm run build
npm test
```

`npm run build` runs each lab's build script (fragments go to `output/`) and writes complete standalone pages to `dist/`:

- `dist/cube-permutation-study.html`
- `dist/possibility-atlas.html`
- `dist/states-and-moves.html` (explorer plus reading companion)

Open any of them directly in a browser; no server or network connection is needed. Three.js is copied from `node_modules` into `dist/vendor/three/`, so keep that folder next to the pages if you move them. Where WebGL is unavailable, the cube views fall back to a 2D sticker net. Saved positions are kept in the browser's local storage for each page; if storage is blocked, the pages still work but start fresh each time.

`dist/` and `output/` are generated and ignored by git.

## Tests

`npm test` runs two groups, in order:

- `npm run test:unit`: Node checks of the mathematics: the cube geometry and stored solutions, the possibility atlas model, and the States and Moves model and visual sequences.
- `npm run test:browser`: builds `dist/` first, then runs four Playwright suites in headless Chromium against the standalone pages, opened from `file://` with HTTP(S) requests blocked:
  - `artifacts/cube-permutation-study/test-browser.cjs`: nonblank and changing WebGL canvases, playback, all solved endpoints, piece tracking, alignment, reduced motion, no horizontal overflow on a narrow screen, and the 2D sticker net when Three.js is blocked;
  - `artifacts/possibility-atlas/test-browser.cjs`: every view at 1100, 390 and 320 pixels, derivation stepping, swaps and distances, light and dark schemes, reduced motion, and labels kept inside their drawings at extreme settings;
  - `artifacts/states-and-moves/test-browser.cjs`: every chapter at 1100, 736, 390 and 320 pixels, the reading companion's text and its link to the explorer, representative controls, extreme settings, and light and dark schemes;
  - `artifacts/states-and-moves/test-sequence-browser.cjs`: every visual sequence at the same widths, the 3D cube's sticker positions, play, pause, step, scrub and selection, reduced motion, and the flat fallback when Three.js is blocked.

Every suite also checks saved-state restore, both from another window and on reopening the page, and fails on any page error. Each prints `PASS` or `FAIL` with its duration and writes a result file and screenshots to `output/browser/<suite>/`.

Browser tests need Playwright's Chromium once per machine: `npx playwright install chromium` (on Linux, add `--with-deps` to install system libraries too). The suites use only portable paths and Playwright's own browser, so they are meant to run on Linux and Windows; CI exercises Linux.

## Layout

- `scripts/shell.html`, `scripts/build.mjs`: the page shell (colours for light and dark schemes, system fonts, local saved state, icons) and the build that wraps each lab's fragment in it.

- `artifacts/cube-permutation-study/`: a human speedsolve, a shorter computed route and a short commutator, shown as cube moves and permutations side by side.
- `artifacts/possibility-atlas/`: permutations, combinations, repeated colours and token arrangements in one, two and three dimensions.
- `artifacts/states-and-moves/`: States and Moves, six interactive chapters in plain language (counting, clock arithmetic, order of actions, shortest routes, things that never change, and chance) plus a connection map, five linked visual sequences and a reading companion for secondary-school readers; it imports the cube study's `vendor/cube.cjs` and `data.json`.

## License

Licensed under the Apache License, Version 2.0; see `LICENSE`. Third-party notices are in `NOTICE`. The built pages bundle Three.js (MIT), copied from npm into `dist/vendor/three/` with its licence.

The cube study's two stored solver results (the 16-move route for the Du scramble and the 21-turn two-phase result for Superflip) were computed once with [min2phase.js](https://github.com/cs0x7f/min2phase.js) by Chen Shuang (GPL-3.0). That solver is not included in this repository and is not required to build or test it; the build scripts read the stored solutions from `artifacts/cube-permutation-study/prepared.json` and verify that each one solves its scramble.
