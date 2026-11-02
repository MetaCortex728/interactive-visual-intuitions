# From Three Colors to Configuration Spaces

Prepared 2026-10-28. Companion to **The shape of possibility**. The finite examples and derivations below are our model and analysis; the research section distinguishes published results and their scope.

## Start With a Precise Puzzle

There are three colors, A, B and C. Positions are labeled. A legal move exchanges the tokens at two neighboring positions. There is no empty square, no continuous motion and no prohibition on passing through other tokens by swapping. Same-colored tokens are indistinguishable. These choices define a **colored-token swapping puzzle**, not a sliding puzzle or a Rubik's Cube.

The progression keeps side length three and equal color populations:

| Geometry | Positions N | Tokens per color | Allowed neighbor pairs E | Color arrangements S |
|---|---:|---:|---:|---:|
| 1D line of length 3 | 3 | 1 | 2 | 6 |
| 2D 3 by 3 grid | 9 | 3 | 12 | 1,680 |
| 3D 3 by 3 by 3 lattice | 27 | 9 | 54 | 227,873,431,500 |

In the target, x=0 holds A, x=1 holds B and x=2 holds C. The 3D view uses three linked 2D slices. Selecting a position reveals its legal neighbors, including neighbors in another slice. This makes the extra direction inspectable without hiding tokens behind a rendered cube.

The important question is not simply "Does higher dimension mean harder?" It is **what changed: number of positions, connectivity, distinguishability, move rules, or the optimization objective?**

## Two Graphs, Not One

The **position graph** has one vertex per location and an edge for each legal exchange. The **configuration graph** has one vertex per complete color arrangement and an edge for each exchange that changes the arrangement.

A 3 by 3 board has nine position vertices but 1,680 configuration vertices. A curve drawn between two board positions is not a search-tree branch between two complete arrangements.

For D dimensions and side length three, the position graph is the Cartesian product of D three-vertex paths. Its counts follow directly:

$$
N=3^D,\qquad E=D\cdot 2\cdot3^{D-1}.
$$

To count E, choose an axis (D choices), one of two gaps along that axis, then the other D-1 coordinates. Each undirected edge is counted once. The average degree is 2E/N=4D/3; the maximum degree is 2D at the center. The position-graph diameter is 2D, because opposite corners differ by two steps on each axis.

The number of independent graph cycles is E-N+1: 0, 4 and 28 for these three connected graphs. These are **cycles in a graph**, not the cycles in a permutation's disjoint-cycle decomposition. Additional routes may help move tokens, but interactions between tokens determine the configuration distance.

## Counting Without Confusing Color and Identity

Temporarily give all N tokens distinct names. There are N! assignments. Every visible arrangement is counted (N/3)! times for the names of its A tokens, independently for B and C. Therefore:

$$
S=\frac{N!}{((N/3)!)^3}.
$$

All these arrangements are reachable on a connected position graph: edge transpositions generate every permutation of labeled tokens; forgetting labels preserves reachability of color arrangements. This is a quotient **set** under within-color relabeling, not automatically a quotient group.

Using Stirling's approximation gives a useful scale estimate derived here:

$$
S\sim\frac{\sqrt{2\pi N}(N/e)^N}{(\sqrt{2\pi N/3}(N/(3e))^{N/3})^3}
=\frac{3^{3/2}}{2\pi N}\,3^N.
$$

Thus S is Theta(3^N/N) for three balanced colors. Substituting N=3^D gives Theta(3^(3^D)/3^D). The double exponential in D is largely because **the number of positions itself grows exponentially with D**. It is not evidence that drawing the same puzzle in three dimensions intrinsically makes it double-exponentially harder.

If every token were distinguishable, the count would instead be N!. If color multiplicities differed, the denominator would be the product of their factorials. If empty slots or simultaneous layer rotations were introduced, the move model would change again.

## Hold Size Fixed to Expose Connectivity

The two **Same 9** controls load the identical initial color sequence `CCCBBBAAA` and identical target `ABCABCABC`. Only the allowed position pairs change.

| Movement graph | States | Exact minimum swaps in this example |
|---|---:|---:|
| Nine-position line | 1,680 | 18 |
| 3 by 3 grid, row-major positions | 1,680 | 8 |

These distances were computed with exhaustive breadth-first search from the target. Every non-target state in each explored graph has a neighbor with distance one smaller. **Optimal next swap** follows those distances, so the displayed 1D/2D route is certified shortest under unit-cost adjacent swaps.

This example does not say every grid arrangement is closer than its line counterpart. The row-major line and grid edge sets are not nested. The general monotonicity theorem is narrower: if edges are added while retaining all old edges, every old route remains available, so the shortest distance cannot increase.

## What the 3D Bounds Mean

Enumerating all 227.9 billion color states is not attempted. Instead, the display reports a lower and an upper bound.

Let H be the sum, over tokens, of the absolute difference between the token's current x coordinate and its target color-plane coordinate. An x exchange moves two tokens by one x unit each, reducing H by at most two. A y or z exchange cannot reduce H. Therefore at least ceil(H/2) swaps are necessary.

Every example is produced from the target by a recorded legal sequence. Reversing that sequence always solves it, giving an upper bound equal to the recorded length. Neither bound is claimed to be tight. Selecting **Reverse one recorded swap** demonstrates the certificate of reachability, not an optimal solver.

## The Different Visual Languages

| Object | Visual method | What it makes visible |
|---|---|---|
| A permutation | Colored trajectories, directed cycles, permutation matrix | Where each identity goes; the same map in three representations |
| An unordered subset | Choose/skip lattice paths and ordered representatives | Which information is removed by forgetting order |
| Repeated colors | Color words and within-color label groups | Why visually identical tokens reduce counts |
| Nonnegative allocations | Stars and bars paired with box totals | A bijection between separator positions and count vectors |
| A move sequence | Word tree paired with the six-state S3 graph | Different words can end at the same state |
| Legal cube states | Orientation edits and parity tracks | Why arbitrary sticker arrangements are not legal cube states |
| Search | Expanding frontiers from one or two ends | Search depth, branching and memory are different from state counts |
| Dimensional progression | Movable colored tokens and linked lattice slices | Extra positions versus extra routes and changed move rules |

The abstract trajectory colors identify tokens, not Rubik face colors. Actual R, U and R U R' U' cubie position permutations are generated using cubejs. The cycle view omits cubie orientations, so its permutation order alone does not establish the full cube algorithm's order.

## Counting and Big O, Derived

Big O needs a growing family and a specified operation. A single fixed 3 by 3 puzzle has no asymptotically increasing size. Below, n is the number of objects, k the chosen length, q the number of colors or boxes, b the branching factor, and d the word length or search depth. Auxiliary space excludes stored output. Bounds for arithmetic operations are not bit-complexity bounds for arbitrarily large integers.

| Objects / task | Count | Explicit enumeration time | Generator auxiliary space |
|---|---|---|---|
| Permutations of n distinct objects | n! | Theta(max(1,n) times n!) | O(n) |
| Ordered k-selections, no replacement | n!/(n-k)! | Theta(max(1,k) times count) | O(n) using a used-item array |
| Unordered k-subsets | C(n,k) | Theta(max(1,k) times count) | O(k) |
| Words of length d over b moves | b^d | Theta(max(1,d) times b^d) | O(d) |
| Multiset words, multiplicities m_i | n! / product(m_i!) | Theta(max(1,n) times count), efficient generator | O(n+q) |
| Allocations of k identical items to q labeled boxes | C(k+q-1,q-1) | Theta(q times count) | O(q) |

The common derivation is **number of outputs multiplied by entries written per output**. A stream that emits only a swap or a delta has a different output contract, so do not transfer these bounds to it unchanged. The browser uses small bounded enumerators and sometimes stores all outputs; the table describes suitable generators, not measured browser performance.

For permutations, choices shrink n, n-1, ..., 1. For ordered k-selections, stop after k factors. Each k-subset appears in exactly k! orders, so dividing gives C(n,k). Splitting on whether the last object is selected gives Pascal's recurrence. Summing over every k yields 2^n.

For stars and bars, encode a count vector x_1+...+x_q=k using k stars and q-1 separators. Choosing separator positions establishes a bijection with C(k+q-1,q-1) possibilities. Consecutive bars allow empty boxes.

Computing a count is not enumerating its objects. A factorial takes O(n) multiplications under a unit-cost arithmetic model; C(n,k) can be computed with O(min(k,n-k)) multiplicative steps. Exact integers grow in bit length, so wall-clock cost is not constant per multiplication for unbounded n.

### Applying and Analyzing One Permutation

Applying a permutation to n entries takes Theta(n). Cycle decomposition visits each index once with an O(n) visited array. If the cycle lengths are l_1,...,l_r, the position permutation's order is lcm(l_1,...,l_r).

If any pair can be exchanged, a cycle of length l can be resolved in l-1 swaps. Summing gives n-r. Conversely, one transposition can increase the number of cycles by at most one, so n-r is also a lower bound. This proves optimality for **unrestricted pair swaps**, not neighboring swaps or Rubik turns.

On a line, with distinct labels ordered by target position, the minimum adjacent swaps equals the inversion count. An adjacent exchange changes that count by one; exchanging an adjacent inversion decreases it until zero. The count can be computed in O(n log n), but outputting a worst-case sequence still requires Theta(n^2) swaps. [Swapping Labeled Tokens on Graphs, FUN 2014](https://erikdemaine.org/papers/TokenReconfiguration_FUN2014/paper.pdf) connects this path case to token swapping and gives general-graph and tree approximation results.

### Words, States and Search

Two generators a=(12), b=(23) give 2^d words of length d, but only six possible labeled arrangements in S3. Relations such as aa=identity and aba=bab merge word endpoints. With fixed-length words, parity further limits the endpoints.

For ordinary cube half-turn metric, there are 18 choices at each step. Removing consecutive turns of the same face reduces the word count to 18 times 15^(d-1), for d>=1. Other relations still produce duplicate endpoints; this is not a distinct-state count.

A regular b-branching tree through depth d has (b^(d+1)-1)/(b-1) nodes, hence O(b^d) for b>=2. Bidirectional search replaces depth d by about d/2 at each end, giving O(b^ceil(d/2)) idealized time and frontier storage. It needs a known goal, reversible transitions, meeting detection and correct stopping logic. DFS with on-demand successors uses O(d) path memory but is not automatically shortest-path search.

For our finite token model, let S be the number of configurations and E the number of position-graph edges. BFS examines at most S times E candidate exchanges. This implementation copies and serializes an N-entry state per exchange, giving O(NES) time and O(NS) storage under expected constant-time table access after key construction. Generic O(V+E) BFS notation refers instead to an explicitly represented configuration graph with unit-cost operations.

## What the Papers Add

### Colored Token Swapping: Constraints Matter More Than the Drawing

[Yamanaka et al., Swapping Colored Tokens on Graphs (2018)](https://arxiv.org/html/1803.06816), particularly Sections 3 and 4, closely matches the toy model. Three-color optimization is NP-complete even on connected planar bipartite graphs of maximum degree three. Two colors admit a polynomial algorithm on general graphs, using minimum-weight matching; on trees the distance can be counted from edge-cut imbalances in linear time. On paths, same-color tokens can be matched to target occurrences in order, avoiding unnecessary crossings. The important lesson is sensitivity to colors, topology and allowed exchanges, not simply to rendered dimension. These results concern growing graph families. They do not prove that our fixed 3 by 3 grid, or fixed 27-position lattice, is NP-hard. The linear tree result concerns computing distance; explicitly emitting a long solution has an additional output cost.

### Generalized Cubes: Why a Logarithm Appears

[Demaine et al., Algorithms for Solving Rubik's Cubes (ESA 2011)](https://arxiv.org/html/1106.5736), Sections 3 and 4, establishes configuration-space diameter Theta(n^2/log n) for its generalized square/cube move models. For the lower bound, exponentially many independent cluster configurations, exp(Omega(n^2)), must fit inside at most O(n)^k move words. Taking logarithms forces k=Omega(n^2/log n). For the upper bound, common cluster patterns are corrected in batches. Grouping O(log n) columns controls the number of patterns while letting row/column sequences service multiple clusters. The matching order bound concerns worst-case solution length, not an exact shortest solver for every input. It also uses slice moves, so its metric must not be silently substituted for ordinary 3 by 3 outer-face HTM. This shows why coupled moves can exploit structure that independent-token counting misses.

### Optimality: A Short Certificate Can Be Hard to Find

[Demaine, Eisenstat and Rudoy, Solving the Rubik's Cube Optimally is NP-complete (STACS 2018)](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.STACS.2018.24), with [full proof](https://arxiv.org/html/1706.06708), studies variable-size puzzles and asks whether a solution of at most k moves exists. Section 4.2 explains the reduction: commuting, conjugated operations may be reordered, but extensive cancellation depends on choosing an order encoding a Hamiltonian path. The cube proof then enforces the required move structure. This separates efficiently checking a proposed sequence from efficiently finding the shortest one. It is not a statement that the fixed 3 by 3 puzzle is an asymptotic NP-complete problem, nor a result about our neighbor-swap grid.

## Returning to Rubik's Cube and Human Solving

The ordinary fixed-center 3 by 3 cube is not 27 freely exchangeable tokens. Its eight corners and twelve edges have separate position sets, corner twists and edge flips. The legal count is:

$$
8!\cdot12!\cdot3^7\cdot2^{11}/2
=43,252,003,274,489,856,000.
$$

Seven corner twists determine the last; eleven edge flips determine the last; corner and edge permutation parities must match. [Kociemba's cubie-level explanation](https://www.kociemba.org/math/cubielevel.htm) supplies the representation. [Cube20](https://cube20.org/) establishes the 20-move maximum in HTM. Neither result means every scramble takes 20 moves.

The earlier cube case explorer remains the companion for sourced human sequences and cube animation. A shortest-move route minimizes unit move count. A human speedsolve may instead minimize recognition delays, regrips and execution time using practiced chunks. No elapsed-time prediction or new world-record claim is made in this dimensional study.

## Verification and Limits

Exact arithmetic, small state spaces and legal transitions are executable, not illustrative guesses. The model tests exhaust the 1D and nine-position configurations and check shortest-distance consistency, combinatorial counts, cycle parity and sequence identities. Browser checks exercise all eight views at desktop and narrow widths with external network requests blocked.

The 27-position view is a bounded interactive model, not an exhaustive optimal solver. Search-frontier figures are analytical budgets, not benchmark measurements. The paper implications above are scoped interpretations, not new complexity theorems. The saved export is the same interactive source with a standalone wrapper.
