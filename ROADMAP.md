# Roadmap

Planned work, roughly in order. Everything stays at an elementary level: secondary-school mathematics that a learner can follow through the visuals. Estimates are rough and include tests and documentation. Each new lab follows the existing pattern: a folder under `artifacts/`, a fragment built into the shared page shell, a card on the start page, unit tests of its model and a Chromium browser suite run by `npm test`, with no network requests.

## 1. Fractions and ratios lab

- **Goal:** show what a fraction is with area models and the number line, so that equivalent fractions are seen to be the same point.
- **Done when:** learners can pick a numerator and denominator, see the fraction as a shaded area and as a point on the number line, split or merge parts to make equivalent fractions that land on the same point, and compare two fractions or ratios side by side. Unit tests check equivalence and ordering exactly with integer arithmetic; the browser suite covers every control at 320 and 1100 px in light and dark schemes.
- **Estimate:** about 6 hours.

## 2. Coordinates and straight-line graphs lab

- **Goal:** build intuition for plotting points and for straight lines as rules relating x and y.
- **Done when:** learners can place points on a grid and read their coordinates, see slope as rise over run on a drawn step triangle, and move a line with sliders for its slope and intercept while its equation updates. Unit tests check slope and intercept from two points, including vertical and horizontal lines; the browser suite covers the controls, keyboard use and narrow screens.
- **Estimate:** about 5 hours.

## 3. Chance experiments lab

- **Goal:** show observed frequencies approaching expected ones as an experiment is repeated.
- **Done when:** learners can roll dice or toss coins once, ten times or many times with a seeded random generator, see observed frequencies drawn beside the exact counts of equally likely outcomes (for example, the 36 outcomes of two dice), and reset to start again. Unit tests check the exact counts and that a fixed seed gives a fixed run; the browser suite checks the charts and controls.
- **Estimate:** about 5 hours.

## 4. Area and volume by rearrangement lab

- **Goal:** show that cutting a shape and moving its pieces keeps its area, and that stacking layers builds volume.
- **Done when:** learners can cut and move pieces to turn a parallelogram into a rectangle and a triangle into half a rectangle, with the area shown unchanged at every step, and stack unit cubes or layers to find the volume of a box and a prism. Unit tests check that every dissection keeps the total area exactly; the browser suite covers each dissection, step by step.
- **Estimate:** about 5 hours.

## 5. Accessibility pass across labs

- **Goal:** make every lab usable without a mouse and understandable without seeing the drawings.
- **Done when:** every control in every lab works with the keyboard alone, focus is always visible, and each visual state has a text description that updates with it (for screen readers and for anyone who prefers text). Browser tests drive each lab by keyboard and check that the descriptions change with the state.
- **Estimate:** about 3 hours.

## 6. Shared playback and state components

- **Goal:** replace the playback controls and saved-state code duplicated in the labs with one tested module.
- **Done when:** one module in `scripts/` provides play, pause, step, scrub, reduced motion and saved state, every lab uses it, its own unit tests pass, and all existing lab tests pass unchanged.
- **Estimate:** about 3 hours.
