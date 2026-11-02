# Mathematics of Change

A progressive interactive journey from rearranging three tokens to symmetry, number theory, algorithms, linear algebra, calculus, probability, information, spectral methods, optimization and topology.

Prepared 2026-10-28. The examples, diagrams and derivations are built for this study. Sources anchor the theory and the further-reading paths; they are not a substitute for working through the examples.

## The Organizing Question

**What can change, what must remain, and what becomes simpler when we change our description?**

A cube is a particularly tangible meeting point of these questions, not their boundary. A move becomes a permutation; permutations become a group; chosen moves make a graph; a graph supports paths and probability flows; operators reveal modes; continuous transformations lead to calculus; constraints on whole paths lead to topology.

The order is deliberate. First explore an object, then notice a contrast, derive what explains it, and connect it to another setting. The reflection prompts are invitations, not tests or gates. You can stay with one visual and return later; nothing requires a single uninterrupted reading.

## Read Alongside the Interactive Journey

The opening **Visual sequences** view links an action, its abstract representation and a chronological playhead. Follow three colored identities, a sliding grid, cube sticker cycles, noncommuting symmetries, information loss, probability flow, optimization paths and winding. Play, step or scrub the same transition in both views; the reading below follows the selected subject. **Explore all fields** retains the full parameter-driven experiments.

The 1D, 2D and 3D scenes change the move rules as well as geometry; they are not a dimension-only comparison. The controlled fixed-token comparison remains in the Possibility Atlas. Cube rings show the current face turn's five disjoint sticker cycles, not five independent legal moves. Intermediate frames illustrate transitions between exact states; they are not additional discrete puzzle states or measured physical dynamics.

The numbered chapters match the interactive chapter selector. In the downloadable document, each chapter has a button that selects its corresponding experiment. All computations run in the document; no remote model or service is needed.

Begin with three tokens. By chapter 12, even a *path* has become an object whose transformations can be studied. Chapter 13 in the explorer is the connection map, not another prerequisite.

## Keep Four Meanings Apart

- **Object:** a token arrangement, a vector, a distribution, a loop.
- **Transformation:** a swap, a linear map, one stochastic update, a deformation.
- **Invariant:** color counts, parity, a norm, total probability, winding.
- **Objective:** shortest path, accurate motion, mixing, minimum loss, recognition of a class.

Reversible maps can form a group. Projections and averaging usually cannot be reversed and instead belong to broader families of composable maps. A visually similar arrow does not imply identical mathematics.

Big-O applies to an **algorithm on a specified input family**, not to a mathematical subject. Each chapter names the varying quantities and the cost being counted. Exact finite enumeration, arithmetic-operation counts, numerical error and proof are kept distinct.

## Existing Companion Labs

- Possibility Atlas: arrangements, combinations, sequences, and dimension (`possibility-atlas/`) includes the 1D / 2D / 3D lattice experiments and deeper combinatorial derivations.
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

**Connect:** This is the first bridge to information: an observation can merge several physical possibilities. Later, a probability distribution will say how uncertain we are about those possibilities. A set of possibilities alone does not determine entropy.

**Complexity:** Explicitly writing all labeled arrangements costs Theta(N * N!) token outputs. Computing just the count is a different problem. Factorial uses O(N) multiplications, but exact integer arithmetic is not constant-cost as N grows.

**Contemplate:** What distinctions would you keep to solve the puzzle, and which would you forget to recognize a pattern?

Continue connections: 06. Count shapes, not labels; 09. From a path to many possible paths.

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

**Connect:** A cycle is a permutation with a compact arithmetic description. It leads to cyclic symmetry, periodic signals, Fourier modes, and eventually winding numbers. The same word "cycle" will mean different but related objects; the document keeps their definitions separate.

**Complexity:** Euclid computes gcd in O(log n) remainder steps. Enumerating the entire orbit costs Theta(n/g), and drawing all n positions costs Theta(n). A short formula does not remove the cost of displaying its output.

**Contemplate:** Why does changing k from 4 to 5 have a more dramatic effect than making the drawing larger?

Continue connections: 03. Order is part of the meaning; 10. Find the patterns that do not change shape; 12. A loop remembers a hole.

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

Continue connections: 04. A solution is a path; 06. Count shapes, not labels; 07. Represent a move as an operator; 12. A loop remembers a hole.

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

Continue connections: 05. An impossibility can be visible; 09. From a path to many possible paths; 11. Learning as controlled contraction.

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

Continue connections: 04. A solution is a path; 12. A loop remembers a hole.

## 06. Count shapes, not labels

*Group actions, combinatorics*

**Explore:** Why is dividing by the number of rotations sometimes wrong?

**Notice:** Compare 0000, 0101 and 0001. Their orbits have sizes 1, 2 and 4. A symmetric pattern has fewer distinct rotated appearances.

**Essence:** Symmetry creates stabilizers: transformations that leave an object unchanged. Orbit size times stabilizer size equals group size. Counting modulo symmetry must accommodate these unequal orbit sizes.

$$
|X/G|=\frac1{|G|}\sum_{g\in G}|\operatorname{Fix}(g)|
$$

### Derive

1. For four binary positions there are 2^4 = 16 strings. We identify rotations, but not reflections. There are four possible rotations.

2. A rotation by k fixes a string exactly when the string is constant on each cycle of that rotation. The position permutation has gcd(4,k) cycles, so it fixes 2^gcd(4,k) strings.

3. The fixed counts for k=0,1,2,3 are 16,2,4,2. Burnside averaging gives (16+2+4+2)/4 = 6 necklaces, not 16/4.

4. Why averaging works: count pairs (rotation, string) for which the rotation fixes the string. Within one orbit, the sum of stabilizer sizes is exactly 4. Thus dividing the total pair count by 4 counts each orbit once.

**Connect:** This generalizes to molecular arrangements, board colorings, and reducing duplicate search states. A geometric symmetry can simplify a problem only if it also preserves the rules, costs and observations that matter.

**Complexity:** Naive enumeration of q-color necklaces of length n inspects q^n strings and may compare n rotations of length n: O(q^n n^2). Burnside needs n gcd and exponent computations for the count alone; O(n log n) arithmetic steps with fast powering, with bit costs excluded. Listing all representatives still has an output-size lower bound.

**Contemplate:** Which patterns resist change under the most rotations, and why do those make naive division fail?

Continue connections: 01. What counts as different?; 02. Repetition becomes arithmetic; 03. Order is part of the meaning.

## 07. Represent a move as an operator

*Linear algebra, geometry, representations*

**Explore:** What can two transformed basis vectors tell you about every other point?

**Notice:** Change between rotation, shear, scaling and projection. The basis arrows and transformed unit square are linked. A shear changes shape while keeping area; a projection destroys one direction.

**Essence:** Linearity lets a transformation of infinitely many vectors be specified by its action on a finite basis. A representation translates abstract composition into matrix multiplication. It need not preserve every distinction unless it is faithful.

$$
A(xe_1+ye_2)=xAe_1+yAe_2
$$

### Derive

1. Every vector in the plane is x e1 + y e2. For a linear map A, A(x e1+y e2)=x A(e1)+y A(e2). The columns of its matrix are precisely those two images.

2. For A=[[a,b],[c,d]], the signed area of the transformed unit square is ad-bc. Determinant zero means the columns are dependent and the map loses dimension. A nonzero determinant guarantees a linear inverse.

3. For a permutation p, define P e_i = e_p(i). Then P is orthogonal, P inverse = P transpose, and det(P)=+1 or -1 according to parity. Not every orthogonal matrix is a permutation matrix.

4. Our two-dimensional examples use a fixed coordinate basis. The "dimension" of the ambient plane is not the number of possible states, nor the number of parameters in a family of maps. A circle sits in two coordinates but is intrinsically one-dimensional.

**Connect:** This makes the next leap possible: instead of tracking each object, track a vector of positions, probabilities, amplitudes or features and apply an operator. Interpretation matters: a probability vector and a physical displacement obey different constraints.

**Complexity:** A dense N by N matrix-vector product costs Theta(N^2); with E nonzeros it costs O(E+N). Applying a permutation stored as an index map costs Theta(N), so materializing its dense matrix is wasteful. The 2 by 2 illustrations are constant-sized.

**Contemplate:** Which operations can be undone, and what exactly is lost when the determinant becomes zero?

Continue connections: 03. Order is part of the meaning; 08. Tiny moves become a flow; 10. Find the patterns that do not change shape; 11. Learning as controlled contraction.

## 08. Tiny moves become a flow

*Calculus, differential equations, complex numbers*

**Explore:** If each tiny step follows the correct tangent, must the numerical path stay on the correct circle?

**Notice:** Compare the exact rotation with Euler and the midpoint/Cayley update. Raise the time step. Euler spirals out; midpoint keeps the radius but accumulates phase error.

**Essence:** A derivative describes an infinitesimal rule. Integrating it builds a finite transformation. Discretization chooses a different finite rule, and can preserve or break the structure of the original system.

$$
e^{tJ}=\cos(t)I+\sin(t)J
$$

### Derive

1. Let J=[[0,-1],[1,0]]. The ODE z prime = Jz turns the velocity perpendicular to position. The derivative of x^2+y^2 is 2x(-y)+2y(x)=0, so the exact radius is constant.

2. Because J^2=-I, the power series for exp(tJ) separates into cos(t)I+sin(t)J. This is rotation. Identifying (x,y) with x+iy turns J into multiplication by i.

3. Euler uses z_next=(I+hJ)z. Its squared norm becomes (1+h^2) times the old squared norm. After m steps the radius is (1+h^2)^(m/2). The outward drift is a numerical artifact, not physical energy gain.

4. Implicit midpoint solves z_next=z+(h/2)J(z+z_next), giving C=(I-hJ/2)^(-1)(I+hJ/2). C is exactly orthogonal for this J, but rotates by 2 arctan(h/2) rather than h. Preserving one invariant does not make an approximation exact.

**Connect:** The same local-versus-global issue appears in physics engines, robotics and optimization. It also revisits group theory: exact rotations compose by adding angles; a good integrator can respect some of that geometry.

**Complexity:** m steps of a fixed two-dimensional recurrence cost Theta(m) time; saving the entire trail costs Theta(m), keeping only the current state costs O(1). In variable dimension, multiply by the cost of the vector field or linear solve. Smaller step size usually means more steps for the same simulated time.

**Contemplate:** Which error would you notice first: wrong radius, wrong angle, or both? What would an energy-only test miss?

Continue connections: 07. Represent a move as an operator; 11. Learning as controlled contraction; 12. A loop remembers a hole.

## 09. From a path to many possible paths

*Probability, Markov chains, information theory*

**Explore:** Why can a random walk keep moving forever without settling to its stationary distribution?

**Notice:** Start all probability at vertex 0 of a six-cycle. Without staying put, mass alternates between even and odd vertices. With a one-half chance of staying, the distribution approaches uniform.

**Essence:** A stochastic operator evolves a distribution, not one realized trajectory. Randomness does not automatically erase structure. Connectivity, periodicity and the observable you measure all matter.

$$
H(p)=-\sum_j p_j\log_2 p_j
$$

### Derive

1. Each step keeps alpha of the mass at its vertex and sends (1-alpha)/2 to each neighbor. Thus p_next[j]=alpha p[j]+(1-alpha)(p[j-1]+p[j+1])/2, with indices modulo n.

2. Total mass remains one because every contribution is redistributed with weights summing to one. Uniform mass is stationary on this regular symmetric graph.

3. On the even cycle with alpha=0, every move changes parity. At even times all mass is on even vertices, at odd times on odd vertices. The distribution cannot converge to uniform. With 0<alpha<1, self-loops break this period and the connected finite chain converges.

4. Entropy H=-sum p log2(p) measures uncertainty in bits. Total variation is half the sum of |p-1/n|. Entropy can be high while the distribution still misses half the vertices: at long times in the non-lazy case, H approaches log2(3), not log2(6).

**Connect:** The six-state puzzle graph also supports a random walk, but finding the shortest solution and sampling states are different goals. Diffusion, randomized algorithms and statistical mechanics study related operators, with assumptions that must be checked rather than imported by analogy.

**Complexity:** On an n-cycle, one update costs Theta(n); t updates cost Theta(tn) and O(n) working memory. A general sparse graph update costs O(E+V). This cost per update is distinct from how many steps are needed to mix within an error tolerance.

**Contemplate:** Can uncertainty increase while a rigid constraint survives? What would looking at a single moving dot conceal?

Continue connections: 04. A solution is a path; 10. Find the patterns that do not change shape.

## 10. Find the patterns that do not change shape

*Fourier analysis, spectral graph theory*

**Explore:** Can a complicated evolution become simple by changing the coordinates in which you describe it?

**Notice:** Choose a cosine mode on the eight-cycle. Repeated averaging scales it by lambda^t. With no staying, the highest-frequency mode flips sign forever; with half staying, it disappears in one step.

**Essence:** An eigenvector keeps its shape under a linear operator, changing only its scale. Fourier analysis supplies such coordinates for translation-symmetric systems. A general signal is decomposed into modes that evolve independently.

$$
P^t v_k=\lambda_k^t v_k
$$

### Derive

1. Take the complex mode v_k(j)=exp(2 pi i k j/n). Shifting j by +1 or -1 multiplies it by exp(+/-2 pi i k/n).

2. Applying the averaging operator therefore gives lambda_k v_k, where lambda_k=alpha+(1-alpha)cos(2 pi k/n). Its real and imaginary parts are cosine and sine modes with the same eigenvalue.

3. After t applications, each mode is multiplied by lambda_k^t. k=0 has lambda=1 and preserves the constant component. For n even, k=n/2 has lambda=2 alpha-1: -1 causes alternation, 0 erases it.

4. Let L=I-P. Continuous diffusion exp(-tL) scales a mode by exp(-t(1-lambda)). This connects random walks to a heat equation on a graph. There is no claim that every graph has ordinary sine-wave eigenvectors.

**Connect:** The central move is changing the basis to reveal independent behaviors. It reappears in vibration modes, image filtering, compression, control and the curvature directions of optimization. Fourier coefficients describe a signal; a probability distribution is a special kind of signal with nonnegative entries summing to one.

**Complexity:** A direct DFT of n samples uses O(n^2) arithmetic operations; FFT factorizations reduce this to O(n log n) for supported lengths. Repeated local averaging costs O(tn). A spectral method for arbitrary signals adds transform costs; this widget starts with a single mode, so its closed form is not an FFT benchmark.

**Contemplate:** Why is the constant component preserved while fine alternation disappears? Is smoothing always desirable?

Continue connections: 07. Represent a move as an operator; 08. Tiny moves become a flow; 09. From a path to many possible paths; 11. Learning as controlled contraction.

## 11. Learning as controlled contraction

*Optimization, numerical conditioning, machine learning*

**Explore:** Why can taking a steeper step slow you down or make an algorithm diverge?

**Notice:** Increase curvature imbalance kappa. Gradient descent zigzags or progresses slowly. Raise eta L past 2 to see divergence. Switch to curvature-scaled steps to remove the imbalance in this known quadratic.

**Essence:** Optimization is not just following a downward arrow. It is designing a stable iterative map. Different directions can demand different step sizes; the hardest direction constrains a shared step.

$$
0<\eta<\frac{2}{L}
$$

### Derive

1. Use f(x,y)=(x^2+kappa y^2)/2 with kappa>=1. Its gradient is (x,kappa y), and its curvature eigenvalues are 1 and kappa.

2. Gradient descent gives x_next=(1-eta)x and y_next=(1-eta kappa)y. Convergence from every starting point requires both multipliers to have magnitude less than one: 0<eta<2/kappa.

3. The interface uses q=eta L with L=kappa. At q=2 the stiff component flips sign without shrinking; for q>2 it grows. For large kappa and a stable q, the x component can still shrink very slowly.

4. Scaling by the exact inverse curvature diag(1,1/kappa) makes both multipliers 1-q. Here q is a dimensionless gain, and q=1 reaches the minimum in one step. This benefit depends on knowing the quadratic curvature; it is not a promise for arbitrary neural networks.

**Connect:** This is the same spectral logic as smoothing: inspect what each mode is multiplied by. Gradient flow is a continuous limit, and gradient descent is its Euler discretization. Big-O alone does not describe conditioning, accuracy targets, data movement or useful progress per iteration.

**Complexity:** For an n-dimensional diagonal quadratic, a step is O(n); for a dense quadratic, O(n^2). If the error contracts by rho<1, O(log(1/epsilon)/(-log rho)) iterations reach relative error epsilon. This bound depends on rho and the error norm; nonconvex models need separate analysis.

**Contemplate:** What is the difference between a cheap iteration and an efficient method? Which directions are controlling your step size?

Continue connections: 08. Tiny moves become a flow; 10. Find the patterns that do not change shape.

## 12. A loop remembers a hole

*Topology, homotopy, winding*

**Explore:** What can remain unchanged even when every length and angle is allowed to change?

**Notice:** Stretch the loop into an ellipse, or move its center. Its winding number remains fixed until the loop touches the forbidden origin. Compare the punctured plane with the full plane.

**Essence:** Topology studies what survives continuous deformation under stated constraints. In the punctured plane, loops have an integer winding class. In the full plane, the same loop can contract through the origin. The allowed space, not the drawing alone, determines the obstruction.

$$
\pi_1(\mathbb R^2\setminus\{0\})\cong\mathbb Z
$$

### Derive

1. The displayed curve is (c+r cos(2 pi w t), a r sin(2 pi w t)), with r>0, a>0 and 0<=t<=1. w is the number and orientation of traversals; w=0 is a constant loop.

2. For w nonzero and |c|<r, it winds w times around the origin. For |c|>r, it winds zero times. When |c|=r, it passes through the origin, so winding about that point is undefined.

3. Radially projecting a loop that avoids the origin onto the unit circle keeps its winding class. Lifting its angle to a continuous real-valued angle leaves an endpoint difference of 2 pi times an integer. That integer cannot change continuously while remaining an integer.

4. Based loop classes around one puncture form the group Z under concatenation. Our center/shape controls illustrate winding, not a fixed-basepoint homotopy construction. With two holes, loop order can matter and the fundamental group is noncommutative. A single winding number then loses information.

**Connect:** The route closes without ending: modular cycles led to rotations, rotations to flows, and now whole paths are the objects being transformed. Configuration spaces in robotics, braids, covering spaces, complex integration and topological data analysis all grow from related questions, but each adds new hypotheses.

**Complexity:** For a sampled polygon with m segments avoiding the origin, angle-increment summation is O(m). Floating-point sampling is not a certified test for every continuous curve or near-singular crossing. This widget uses an exact analytic classification for its bounded ellipse family, checked numerically away from crossings.

**Contemplate:** What was preserved: position, distance, angle, or only the possibility of continuously undoing the path?

Continue connections: 02. Repetition becomes arithmetic; 03. Order is part of the meaning; 05. An impossibility can be visible; 08. Tiny moves become a flow.

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
