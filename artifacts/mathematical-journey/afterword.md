## Dimension Is Not One Number

The earlier 1D-to-3D experiment changed both the number of positions and the neighbour graph. For a side-three, D-dimensional lattice, there are N=3^D positions and E=2D*3^(D-1) neighbour edges. With N/3 tokens of each of three colours, the number of arrangements is N!/((N/3)!)^3:

- 1D: N=3, E=2, 6 colour arrangements.
- 2D: N=9, E=12, 1,680 colour arrangements.
- 3D: N=27, E=54, 227,873,431,500 colour arrangements.

These are neighbour-swap colour systems, not Rubik's Cubes. A cube turn moves coupled pieces and imposes orientation constraints. Replacing one move rule with the other changes the problem.

To isolate geometry, keep nine positions and the same colour counts: a line and a 3x3 grid each have 1,680 colour arrangements, but different edges and shortest paths. The size of the possibility set alone does not explain difficulty. "Dimension" can also mean something else again: a circle drawn on a page sits in two coordinates, but a point moving along it needs only one number, its angle, to say where it is.

## Three Connections Worth Dwelling On

### One Graph, Several Questions

The six arrangements of three tokens, joined by swaps, form one small graph. Chapter 4 asks for the fewest moves from one arrangement to another. Chapter 5 asks a different kind of question on a larger graph: which states can be reached at all? Chapter 6 asks where a walker that picks its moves at random is likely to be after some steps. The graph is the same kind of object each time; the question changes what we compute and what counts as an answer.

A shortest path is one route. A random walk spreads probability over many routes at once. Neither answer replaces the other: knowing where a walker is likely to be does not tell you the quickest way home, and knowing the quickest way does not tell you where a random walker ends up.

### An Invariant Is Both Power and Blindness

An invariant compresses a state. Parity reduces a whole arrangement of tiles to one bit, allowing a quick proof that a position is impossible. But many states share that bit, so it cannot tell you the shortest solution. Total probability is similar: it is always exactly 1, which catches bookkeeping mistakes immediately, but it says nothing about where the walker is likely to be.

The design question is not simply "Can I summarize this?" It is "Which questions does this summary still answer?" The same question arises when choosing what to record in a spreadsheet, what a scoreboard shows, or what a simplified model keeps.

### A Simpler Description Must Respect the Moves

Suppose we describe a detailed state more coarsely, for example by recording only colours instead of token names. A move can be described in the coarse language only if its coarse result depends on the coarse description alone, not on hidden details. If two detailed states look identical but a move sends them to states that look different, the coarse description cannot predict that move.

For example, after merging token identities A and B into one colour, "swap the left two positions" still makes sense: from what you can see, you can say what you will see next. "Move token A to the rightmost slot" may not: the coarse description no longer tells you which token is A. Checking this before simplifying a description is a habit worth keeping well beyond puzzles.

## Further Branches, With a Reason to Follow Each

1. **Error-correcting codes:** parity checks are constraints that define which messages are valid. Several checks together can locate an error rather than merely detect an odd number of flips. This extends the invariant chapter without pretending all puzzle constraints are codes.
2. **Probability with dice and games:** many board games are random walks on a graph of squares. The same bookkeeping as chapter 6, with probabilities that always add to 1, gives exact chances of landing on each square after a number of turns.
3. **Planning and routing:** distinguish whether a goal can be reached from how to reach it cheaply, then add costs, obstacles and timing. Maps, delivery routes and robot motion all start from the state-graph picture of chapter 4.
4. **Computational complexity:** ask which quantities grow. A fixed 3x3 puzzle has finitely many states; claims about how hard growing families of puzzles are require precise rules and proofs. Fast experiments on six or twelve states do not establish scalable algorithms.

These are continuations, not claims that this finite document covers the fields. The test for adding a subject is whether it clarifies a concrete question or exposes a useful connection.

## Research Trail

### Repetition and Symmetry

[Keith Conrad, Group Actions](https://kconrad.math.uconn.edu/blurbs/grouptheory/gpaction.pdf) develops orbits in general. The clock orbits of chapter 2 and the six triangle symmetries of chapter 3 are small first examples of the ideas in these notes. The notes go well beyond the level of this document; they are a continuation, not a prerequisite.

## What the Experiments Do and Do Not Establish

The token arrangements, colour classes, clock orbits, triangle compositions, graph paths and the sliding-puzzle component use exact discrete computations. The random-walk view uses floating-point arithmetic alongside an explicit derivation that the total stays 1; displayed probabilities are rounded.

Numerical checks catch implementation mistakes; they do not replace universal proofs. The saved cube and lattice labs contain the specialized source and optimality distinctions. Human speed-solving is not ranked here by an invented universal score, and no unmeasured advantage is claimed.

The durable standalone document contains the entire interactive explorer and this reading companion. Browser execution is local to the viewing surface; no personal data or external API is required. Reopening the file preserves the document. State restoration is supported by the host when available and by the standalone wrapper's local fallback; it is not a promise of cross-device synchronization.
