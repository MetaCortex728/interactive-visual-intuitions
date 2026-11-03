# Mathematics of Change

A progressive interactive journey from rearranging three tokens to repeated steps, the order of actions, paths between states, impossible positions and chance.

Prepared 2026-10-28 and trimmed to an elementary scope on 2026-11-03. The examples, diagrams and derivations are built for this study. Sources anchor the theory and the further-reading paths; they are not a substitute for working through the examples.

## The Organizing Question

**What can change, what must remain, and what becomes simpler when we change our description?**

A cube is a particularly tangible meeting point of these questions, not their boundary. A move becomes a rearrangement of positions; rearrangements can be combined, and the order of combining matters; chosen moves connect states into a graph; a graph has shortest paths, properties that no legal move can change, and random walks in which probability spreads out while its total stays fixed.

The order is deliberate. First explore an object, then notice a contrast, derive what explains it, and connect it to another setting. The reflection prompts are invitations, not tests or gates. You can stay with one visual and return later; nothing requires a single uninterrupted reading.

## Read Alongside the Interactive Journey

The opening **Visual sequences** view links an action, its abstract representation and a chronological playhead. Follow three coloured identities, a sliding grid, cube sticker cycles, two orders of the same triangle moves, and probability moving around a six-cycle. Play, step or scrub the same transition in both views; the reading below follows the selected subject. **Explore all fields** retains the full parameter-driven experiments.

The 1D, 2D and 3D scenes change the move rules as well as the geometry; they are not a dimension-only comparison. The controlled fixed-token comparison remains in the Possibility Atlas. Cube rings show the current face turn's five disjoint sticker cycles, not five independent legal moves. Intermediate frames illustrate transitions between exact states; they are not additional discrete puzzle states or measured physical motion.

The numbered chapters match the interactive chapter selector. In the downloadable document, each chapter has a button that selects its corresponding experiment. All computations run in the document; no remote model or service is needed.

Begin with three tokens. By chapter 6, a single path has become many possible paths, each with a probability. Chapter 7 in the explorer is the connection map, not another prerequisite.

## Keep Four Meanings Apart

- **Object:** a token arrangement, a position on a clock, a board, a distribution.
- **Transformation:** a swap, a turn of the triangle, a tile slide, one random-walk step.
- **Invariant:** colour counts, parity, total probability.
- **Objective:** a shortest path, reaching a target, recognizing a class.

Swaps, turns and slides can be undone, so each one has a reverse move. A random-walk step usually cannot be undone: once probability has spread out, the step does not record where it came from. A visually similar arrow does not imply identical mathematics.

Big-O applies to an **algorithm on a specified input family**, not to a mathematical subject. Each chapter names the varying quantities and the cost being counted. Exact finite enumeration, arithmetic-operation counts, rounding in decimal displays and proof are kept distinct.

## Existing Companion Labs

- Possibility Atlas: arrangements, combinations, sequences and dimension (`possibility-atlas/`) includes the 1D / 2D / 3D lattice experiments and deeper counting derivations.
- Cube Permutation Study: algorithms and human execution (`cube-permutation-study/`) retains the synchronized cube/permutation exploration and sourced solve comparisons. A short solution is not called optimal without a certificate or cited exact result.

These remain specialized labs. This document is the conceptual path connecting and extending them.


## 01. What counts as different?

*Sets, equivalence, information*

**Explore:** If two objects become indistinguishable, did the world change, or did your description change?

**Notice:** Switch from three identities to two colors. Six labeled arrangements collapse into three observable arrangements. Each visible arrangement has two labeled explanations.

**Essence:** A mathematical state is a choice of distinctions. An equivalence relation tells us which distinctions to forget. The quotient set keeps one class for each observable outcome, rather than arbitrarily deleting states.

$$
|X|=\frac{N!}{n_1!\cdots n_k!}
$$

### Derive

1. There are 3 choices for the first distinct token, then 2, then 1: 3! = 6 arrangements.

2. If tokens A and B share one color, exchanging their identities is invisible. Every color arrangement has exactly 2! labeled versions, so there are 3!/2! = 3 outcomes.

3. For N objects with repeated color counts n1,...,nk, each color arrangement has n1!...nk! labeled versions. Hence N!/(n1!...nk!) outcomes. This division works because these fibers have equal size.

4. A quotient set is not automatically a quotient group. To define multiplication of cosets independently of representatives, the subgroup must be normal. Forgetting colors usually gives an orbit or coset space, not a new group.

**Connect:** This is the first bridge to information: an observation can merge several physical possibilities. Later, a probability distribution will say how likely each possibility is. A set of possibilities alone does not say that.

**Complexity:** Explicitly writing all labeled arrangements costs Theta(N * N!) token outputs. Computing just the count is a different problem. Factorial uses O(N) multiplications, but exact integer arithmetic is not constant-cost as N grows.

**Contemplate:** What distinctions would you keep to solve the puzzle, and which would you forget to recognize a pattern?

Continue connections: 04. A solution is a path; 06. From a path to many possible paths.

## 02. Repetition becomes arithmetic

*Number theory, cyclic groups*

**Explore:** Why can the same repeated step visit every position in one clock, but only some positions in another?

**Notice:** Choose n = 12 and step k = 4: there are four disjoint three-position orbits. Change k to 5: a single orbit visits all twelve positions.

**Essence:** The structure is not the circle drawn on screen; it is addition modulo n. Repeating one transformation exposes divisibility. Geometry makes the arithmetic visible.

$$
\operatorname{ord}_{+}(k)=\frac{n}{\gcd(n,k)}
$$

### Derive

1. After t steps from x, the position is x + tk modulo n. Return means tk is divisible by n.

2. Write n = g n0 and k = g k0 with g = gcd(n,k). Since n0 and k0 are coprime, n divides tk exactly when n0 divides t. The first positive return is n/g.

3. Each orbit therefore has n/g positions. There are n/(n/g) = g disjoint orbits. For k = 0, gcd(n,0) = n, giving n one-point orbits.

4. The orbit of 0 is the subgroup generated by k. Other orbits are its translates. If gcd(n,k)=1, repeated addition by k permutes all residues. Do not confuse this additive order with multiplicative order modulo n.

**Connect:** A cycle is a permutation with a compact arithmetic description. The same idea returns when the rotation of the triangle repeats after three steps, and when parity counts modulo 2. The same word "cycle" will mean different but related objects; the document keeps their definitions separate.

**Complexity:** Euclid computes gcd in O(log n) remainder steps. Enumerating the entire orbit costs Theta(n/g), and drawing all n positions costs Theta(n). A short formula does not remove the cost of displaying its output.

**Contemplate:** Why does changing k from 4 to 5 have a more dramatic effect than making the drawing larger?

Continue connections: 03. Order is part of the meaning; 05. An impossibility can be visible.

## 03. Order is part of the meaning

*Group theory, symmetry*

**Explore:** Does doing the same two actions in the opposite order produce the same transformation?

**Notice:** Use r then s, and compare with s then r. Track the colored vertices and the source-to-destination arrows together. Then try rrr and ss.

**Essence:** A group packages reversible transformations and their composition. Its identity is doing nothing, its inverses undo actions, and associativity lets us regroup a sequence without changing its order. Commutativity is an extra property, not part of the definition.

$$
r^3=s^2=e,\qquad srs=r^{-1}
$$

### Derive

1. Label the triangle positions 0,1,2. Let r map 0 to 1, 1 to 2, 2 to 0; let s fix 0 and swap 1,2.

2. Our words are chronological: "rs" means r first, then s, which is s composed with r in conventional function notation. A source map p followed by q is q[p[i]]. This convention is used in both diagrams.

3. Compute rrr = e and ss = e. But rs maps 0 to 2, while sr maps 0 to 1, so rs is not sr. Compute srs = r inverse.

4. Every word reduces to one of e, r, rr, s, rs, rrs. There are six distinct maps. These form D3, isomorphic to S3 on the three vertices. The commutator measures failure to commute, but need not itself be small or local.

**Connect:** In robotics, rotating then translating differs from translating then rotating. In code, the order of noncommuting updates matters. In a cube, useful sequences exploit composition and conjugation rather than moving every sticker independently.

**Complexity:** Apply a word of L explicit permutations on N positions in O(LN) time and O(N) working space. Multiplying stored permutations costs O(N). For this fixed triangle, N=3, so evaluation is O(L), not a claim about all group word problems.

**Contemplate:** What remains the same when the triangle turns, and what changes when its labels move?

Continue connections: 04. A solution is a path; 05. An impossibility can be visible.

## 04. A solution is a path

*Graph theory, algorithms, geometry*

**Explore:** Can the shortest solution change even though the set of states has not changed?

**Notice:** Select state 210. With adjacent swaps it is three moves from 012; with any transposition it is one. The diagram has the same six nodes but different edges.

**Essence:** States become vertices; permitted actions become edges. A shortest-path metric depends on the generators and their costs. "Optimal" is incomplete until you say what counts as a move and what you minimize.

$$
d_G(x,y)=\min_{p:x\leadsto y}|p|
$$

### Derive

1. Start with all six arrangements. Add an edge when a permitted swap relates two states. Adjacent swaps produce a six-cycle; all three transpositions produce K3,3.

2. Breadth-first search begins at the target, discovers distance 1 states, then distance 2, and so on. With unit edge costs, the first discovery of a state is a shortest path: any shorter path would have appeared in an earlier layer.

3. Adding edges while retaining all old edges cannot increase shortest distances. Merely changing the layout or replacing the move set does not guarantee this monotonicity.

4. With unequal positive move costs use a weighted shortest-path algorithm such as Dijkstra, not unmodified BFS. Human execution time also includes recognition, ergonomics and transitions, so minimum move count need not mean minimum time.

**Connect:** This is the bridge from cube algorithms to planning, network routing, configuration spaces and optimal control. The previously saved cube study separates certified shallow optima, published bounds and human reconstructions; it does not label an arbitrary short solution optimal.

**Complexity:** For an explicit graph, BFS costs O(V+E) time and O(V) auxiliary space, excluding graph storage. In an implicit search tree with branching b and depth d, naive expansion can require O(b^d) nodes. If constructing each successor costs O(N), include that factor. Repeated states can make the tree much larger than the graph.

**Contemplate:** Which objective would you optimize: moves, time, memory, energy, or the ease of recognizing the next step?

Continue connections: 05. An impossibility can be visible; 06. From a path to many possible paths.

## 05. An impossibility can be visible

*Invariants, parity, reachability*

**Explore:** Can a state look almost solved and still be impossible to solve using the allowed moves?

**Notice:** Slide tiles into the blank. The inversion parity stays even. Now exchange tiles 1 and 2 with the deliberate illegal-edit control: the board enters the other parity class.

**Essence:** An invariant is a property preserved by every legal move. It can rule out reachability without searching all paths. An invariant is not necessarily a complete description of reachability; completeness needs another argument.

$$
I(\mathrm{legal}(x))\equiv I(x)\pmod 2
$$

### Derive

1. Read the numbered tiles row by row, omitting the blank. An inversion is a pair out of ascending order. The solved sequence has zero inversions.

2. A horizontal blank move does not change the relative order of any two numbered tiles. A vertical move on a width-three board moves a tile past exactly two numbered tiles in the flattened list. Two pair-order changes preserve inversion parity.

3. Therefore every legal sequence preserves parity. Exchanging two numbered labels flips permutation parity and makes a state unreachable from solved.

4. For the standard odd-width sliding puzzle, even inversion parity is also sufficient for solvability. This chapter proves the necessary invariant and exhaustively checks the complete 3x3 reachable component; it does not pretend that the invariant proof alone establishes sufficiency for all puzzle sizes. Even-width boards require a blank-row term.

**Connect:** Parity behaves like a one-bit error detector: it detects some impossible edits but not all kinds of mistakes. Cube corner twists, edge flips and permutation parity are related constraints with different moduli. Conservation laws in physics are continuous relatives of the same strategy.

**Complexity:** The displayed pair-counting implementation costs O(N^2). Merge-sort inversion counting costs O(N log N). Either can reject an impossible state before an exponential search. Exhaustive 3x3 reachability has 9!/2 = 181,440 states; this fixed number is not an asymptotic complexity class.

**Contemplate:** What would an invariant fail to tell you about an even-parity board?

Continue connections: 02. Repetition becomes arithmetic; 04. A solution is a path.

## 06. From a path to many possible paths

*Probability, random walks*

**Explore:** If you cannot say exactly where a walker is, what can you still say for certain?

**Notice:** Start all probability at vertex 0 of a six-cycle and take steps. Each vertex passes its probability to its neighbours, or keeps half of it with the half-stay rule. The individual numbers change at every step; their total stays 1.

**Essence:** A random walk can be described by a distribution: one probability for each state. A step does not create or destroy probability. It only moves it along the edges of the graph, so the total is conserved even when the walker itself is uncertain.

$$
\sum_j p_j^{(t+1)}=\sum_j p_j^{(t)}=1
$$

### Derive

1. Each step keeps alpha of the probability at its vertex and sends (1-alpha)/2 to each neighbour. Thus p_next[j]=alpha p[j]+(1-alpha)(p[j-1]+p[j+1])/2, with positions counted modulo n.

2. Follow the probability at one vertex: alpha of it stays, and two shares of (1-alpha)/2 leave. The three parts add to alpha+(1-alpha)=1, so every bit of probability arrives somewhere. Adding over all vertices, the new total equals the old total, which started at 1.

3. Every new value is a sum of nonnegative shares of old values, so no probability becomes negative. Together with the total, this means the numbers always form a valid distribution.

4. If every vertex holds 1/6, each vertex receives alpha/6 from itself and (1-alpha)/12 from each neighbour, which is 1/6 again. On this symmetric cycle, the even spread is left unchanged by a step.

**Connect:** The six-state puzzle graph also supports a random walk, but finding the shortest solution and asking where a random walker is likely to be are different goals. Board games with dice, shuffling and models of diffusion use the same bookkeeping: probabilities move between states, and the total stays 1.

**Complexity:** On an n-cycle, one update costs Theta(n); t updates cost Theta(tn) and O(n) working memory. On a general graph with V vertices and E edges, one update costs O(V+E).

**Contemplate:** Can you become less sure where the walker is while still being completely sure of the total? What would watching a single moving dot hide?

Continue connections: 01. What counts as different?; 04. A solution is a path.

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
