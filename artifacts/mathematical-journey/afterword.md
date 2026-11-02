## Dimension Is Not One Number

The earlier 1D-to-3D experiment changed both the number of positions and the neighborhood graph. For a side-three, D-dimensional lattice, there are N=3^D positions and E=2D*3^(D-1) neighbor edges. With N/3 tokens of each of three colors, the number of arrangements is N!/((N/3)!)^3:

- 1D: N=3, E=2, 6 color arrangements.
- 2D: N=9, E=12, 1,680 color arrangements.
- 3D: N=27, E=54, 227,873,431,500 color arrangements.

These are neighbor-swap color systems, not Rubik's Cubes. A cube turn moves coupled pieces and imposes orientation constraints. Replacing one move rule with the other changes the problem.

To isolate geometry, keep nine positions and the same color counts: a line and a 3x3 grid each have 1,680 color arrangements, but different edges and shortest paths. The size of the possibility set alone does not explain difficulty. A continuous configuration space adds another meaning of dimension: n freely moving points in a plane have 2n positional coordinates before constraints or equivalences. A circle has intrinsic dimension one despite being drawn in a plane. A family of rotations has one angle parameter even when its matrices have four entries.

## Three Connections Worth Dwelling On

### One Operator, Several Interpretations

On a cycle, let P average the two neighboring values and optionally retain some current value. Acting on probability masses, P describes a random walk. Acting on signed signal values, it smooths a signal. Acting repeatedly on an eigenmode, it multiplies by a scalar each time. These are the same algebra with different admissible inputs and questions.

Writing L=I-P reveals a diffusion generator. Continuous evolution exp(-tL) and discrete evolution P^t are related but generally not equal. An explicit Euler step for diffusion is I-hL. Its stability depends on the spectrum and the step size, just as the optimization experiment does. This is a precise connection between probability, signals, differential equations and numerical algorithms, not merely a shared visual metaphor.

### An Invariant Is Both Power and Blindness

An invariant compresses a state. Parity reduces a huge permutation to one bit, allowing a quick impossibility proof. But many states share that bit, so it cannot tell you the shortest solution. Winding similarly compresses a loop in a punctured plane. In that particular space it classifies loop homotopy, but two holes require more information: separate windings alone do not retain the order of traversals.

The design question is not simply "Can I summarize this?" It is "Which questions does this summary preserve?" This is relevant to abstraction in software, features in machine learning and reduced models in engineering.

### Abstraction Must Respect the Operation

Let q map a detailed state to a coarse description. A coarse update Fbar is well-defined only if q(F(x)) depends on q(x), not on hidden distinctions. In symbols, q after F must equal Fbar after q. If two detailed states look identical but their updates look different, there is no deterministic coarse update with that information alone.

For example, after merging token identities A and B into one color, "swap the left two positions" remains well-defined. "Move token A to the rightmost slot" may not: the coarse description no longer identifies A. This small commuting-diagram idea is an entry to homomorphisms, sufficient state descriptions and category theory. Category theory is not needed to use the criterion; it organizes when such structure-preserving translations compose.

## Further Branches, With a Reason to Follow Each

1. **Representation theory:** when symmetry is too abstract to inspect directly, represent group elements as linear operators and decompose into invariant subspaces. The Fourier modes of a cyclic group are an accessible first case; noncommutative groups need richer representations.
2. **Lie groups and differential geometry:** rotations form continuous families. Their infinitesimal generators live in a linear tangent space, but composing finite rotations is not generally vector addition. Three-dimensional rotations are a natural next example where order matters.
3. **Error-correcting codes:** parity checks are constraints defining a subset of possible messages. Multiple checks can locate errors rather than merely detect an odd number of flips. This extends the invariant chapter without pretending all puzzle constraints are linear codes.
4. **Information and statistical mechanics:** count compatible states, then assign probabilities and study entropy. A physical entropy needs an appropriate physical state model and units; Shannon entropy alone is not a thermodynamic simulation or a measure of semantic value.
5. **Control and planning:** distinguish reachability from optimization, then add dynamics and constraints. A robot configuration is not just a point in ordinary workspace; joints and obstacles change its configuration space.
6. **Topology and complex analysis:** winding connects loops to angle lifts and, with further hypotheses, contour integration. Multiple obstacles lead to noncommuting loop classes and braid-like phenomena.
7. **Computational complexity:** ask which quantities grow. A fixed 3x3 puzzle has finitely many states; hardness results for growing puzzle families require precise rules and reductions. Fast experiments on twelve nodes do not establish scalable algorithms.

These are continuations, not claims that this finite document exhausts the fields. The test for adding a subject is whether it clarifies a concrete question or exposes a useful connection.

## Research Trail

### Symmetry and Counting

[Keith Conrad, Group Actions](https://kconrad.math.uconn.edu/blurbs/grouptheory/gpaction.pdf), especially orbit-stabilizer and Theorem 3.29, provides the group-action framework. The four-bead experiment is worked independently here. Its double-counting argument explains why fixed-point averaging handles unequal orbit sizes. The notes also connect this counting to elementary number theory, suggesting a continuation beyond visual symmetry.

### Stochastic Operators and Spectra

[Eddie Seabrook and Laurenz Wiskott, A Tutorial on the Spectral Theory of Markov Chains](https://arxiv.org/abs/2207.02296), sections 2.3-2.6 and 4, develops the relation between transition matrices, graph structure, stationary behavior and eigenvalues. Our cycle examples explicitly compute those quantities. Their symmetric finite setting is narrower than the paper's general treatment; directed and nonreversible chains introduce additional complications.

[Catherine Greenhill, Making Markov Chains Less Lazy](https://arxiv.org/abs/1203.6668) is a research continuation: laziness is a convenient way to control negative eigenvalues, but not the only analytical route. Here the -1 mode supplies a concrete reason to care about the bottom of the spectrum, not just an eigenvalue close to +1. The document does not reproduce that paper's advanced mixing-time bounds.

### Information

[Claude Shannon, A Mathematical Theory of Communication (1948)](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf), Theorem 2 and the following entropy discussion, grounds the use of H=-sum p log p. The experiment computes base-two entropy of a finite distribution. It does not treat entropy as understanding, usefulness or meaning, and it does not claim randomness automatically produces independent samples.

### Optimization

[Stephen Boyd and Lieven Vandenberghe, Convex Optimization](https://stanford.edu/~boyd/cvxbook/), Chapter 9 and its [author-hosted lecture slides](https://stanford.edu/~boyd/cvxbook/bv_cvxslides.pdf), develops descent, conditioning and changes of variables. Our diagonal quadratic exposes those ideas through explicit recurrences rather than invoking a general convergence theorem without its assumptions. The exact-curvature option is intentionally favorable and is labeled accordingly.

### Topology

[Allen Hatcher, Algebraic Topology](https://pi.math.cornell.edu/~hatcher/AT/AT..pdf), Section 1.1, Theorem 1.7, establishes the fundamental group of the circle using lifted paths. Section 1.2 develops noncommuting loop structures. Our ellipse family illustrates winding and forbidden crossings; it is not an interactive proof of all the covering-space or fundamental-group results.

## What the Experiments Do and Do Not Establish

The finite permutations, quotient classes, graph paths, necklaces and sliding-puzzle component use exact discrete computations. The calculus, probability, spectral and optimization views use floating-point arithmetic alongside explicit symbolic derivations. The winding display uses the exact criterion for its specified ellipse family, not just a sampled angle sum.

Numerical checks catch implementation mistakes; they do not replace universal proofs. The saved cube and lattice labs contain the specialized source and optimality distinctions. Human speed-solving is not ranked here by an invented universal score, and no unmeasured advantage is claimed.

The durable standalone document contains the entire interactive explorer and this reading companion. Browser execution is local to the viewing surface; no personal data or external API is required. Reopening the file preserves the document. State restoration is supported by the host when available and by the standalone wrapper's local fallback; it is not a promise of cross-device synchronization.
