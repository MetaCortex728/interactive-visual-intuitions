# From Three Colours to a Space of Arrangements

Prepared 2026-10-28; plain-language pass 2026-11-03. Companion to **The shape of possibility**. The finite examples and derivations below are our own model and analysis; the cube section points to published results for the facts it does not prove.

## Start With a Precise Puzzle

There are three colours, A, B and C. Positions are numbered. A legal move swaps the tokens at two neighbouring positions. There is no empty square, no sliding and no rule against a token passing another by swapping. Tokens of the same colour look identical. These choices define a **coloured-token swapping puzzle**, not a sliding puzzle or a Rubik's Cube.

The progression keeps the side length at three and the same number of tokens of each colour:

| Shape | Positions N | Tokens per colour | Neighbouring pairs E | Colour arrangements S |
|---|---:|---:|---:|---:|
| 1D line of length 3 | 3 | 1 | 2 | 6 |
| 2D 3 by 3 grid | 9 | 3 | 12 | 1,680 |
| 3D 3 by 3 by 3 block | 27 | 9 | 54 | 227,873,431,500 |

In the target, x = 0 holds A, x = 1 holds B and x = 2 holds C. The 3D view shows three linked 2D slices. Selecting a position highlights its neighbours, including neighbours in another slice, so the extra direction can be inspected without hiding tokens behind a drawn cube.

The important question is not simply "Does a higher dimension mean harder?" It is **what changed: the number of positions, which positions are neighbours, which tokens can be told apart, the move rules, or what we are trying to make small?**

## Two Maps, Not One

The **position map** has one dot per position and a line for each pair of neighbours that may swap. The **arrangement map** has one dot per complete colour arrangement and a line for each swap that changes the arrangement.

A 3 by 3 board has 9 dots in its position map but 1,680 dots in its arrangement map. A line between two board positions is not a line between two complete arrangements.

For D dimensions and side length three, the counts follow directly:

$$
N=3^D,\qquad E=D\times 2\times3^{D-1}.
$$

To count E, choose a direction (D ways), one of the two gaps between neighbours along that direction (2 ways), and the values of the other D - 1 coordinates (3^(D-1) ways). Each neighbouring pair is counted exactly once. A corner position has D neighbours and the centre has 2D. Opposite corners are 2D steps apart, because they differ by two steps in every direction.

The number of independent loops in the position map is E - N + 1: 0, 4 and 28 for the three shapes. These are **loops of neighbouring positions**, not the cycles that describe where a rearrangement sends each token. Extra routes may help move tokens around, but tokens getting in each other's way decides how many swaps an arrangement really needs.

## Counting Without Confusing Colour and Identity

For a moment, give all N tokens different names. There are N! ways to place them. Each visible colour arrangement is counted (N/3)! times, once for every way to shuffle the names of the A tokens among themselves, and likewise for B and C. Therefore:

$$
S=\frac{N!}{((N/3)!)^3}.
$$

Every one of these arrangements can be reached when every position can be reached from every other through neighbouring pairs: swapping neighbours can put named tokens in any order at all, and forgetting the names keeps every colour arrangement reachable.

The count grows very quickly: 6, then 1,680, then about 228 billion. Most of that growth comes from the number of positions itself growing, from 3 to 9 to 27. It is not evidence that drawing the same kind of puzzle in three dimensions makes it harder in some deeper way.

If every token were distinguishable, the count would be N! instead. If the colours had different numbers of tokens, the bottom of the fraction would multiply their separate factorials. Adding empty squares or turning whole layers at once would change the move rules again.

## Hold Size Fixed to Expose Connectivity

The two **Same 9** controls load the same starting colours, `CCCBBBAAA`, and the same target, `ABCABCABC`. Only the pairs of positions that may swap change.

| Which pairs may swap | Arrangements | Fewest swaps in this example |
|---|---:|---:|
| Nine positions in a line | 1,680 | 18 |
| 3 by 3 grid, positions numbered row by row | 1,680 | 8 |

These distances were found by a computer working outward from the target layer by layer (breadth-first search) until it had reached every arrangement. Every arrangement other than the target has a neighbour exactly one swap closer. **Optimal next swap** follows those distances, so the route shown for 1D and 2D is a proven shortest route when every neighbour swap counts as one move.

This example does not say every grid arrangement is closer to its target than the matching line arrangement. The line and the grid are two separate sets of allowed swaps; neither contains the other. The general rule is narrower: if you add swaps while keeping all the old ones, every old route is still available, so the shortest route can never get longer.

## What the 3D Bounds Mean

Visiting all 227.9 billion colour arrangements is not attempted. Instead, the display reports a lowest and a highest possible number of swaps.

Add up, over all tokens, how far each token's x coordinate is from the x coordinate of its colour's target layer; call this total H. A swap in the x direction moves two tokens by one step each, so it lowers H by at most 2. A swap in the y or z direction does not change H. So at least H/2 swaps, rounded up, are needed.

Every example is produced from the target by a recorded sequence of legal swaps. Undoing that sequence in reverse order always solves it, so the recorded length is an upper limit. Neither limit is claimed to be the exact answer. **Reverse one recorded swap** demonstrates that the example can be solved; it is not a shortest-route solver.

## The Different Visual Languages

| Object | How it is drawn | What it makes visible |
|---|---|---|
| A rearrangement | Coloured trajectories, cycles with arrows, a grid of start and finish | Where each token goes; the same rearrangement in three pictures |
| A choice of items, order ignored | Choose-or-skip paths and the orders that collapse to one choice | What is lost by forgetting order |
| Repeated colours | Colour words and groups of labels within each colour | Why identical-looking tokens reduce the count |
| Sharing identical items among boxes | Stars and bars next to the box totals | A one-to-one match between bar positions and box counts |
| A sequence of moves | A tree of move words next to the map of six arrangements of three tokens | Different words can end in the same arrangement |
| Legal cube positions | Twist and flip edits and parity tracks | Why arbitrary sticker arrangements are not legal cube positions |
| Changing dimension | Movable coloured tokens and linked slices | More positions versus more routes and changed move rules |

The trajectory colours identify tokens, not Rubik face colours. The real R, U and R U R' U' rearrangements of cube pieces are generated with cubejs. The cycle view leaves out how each piece is twisted or flipped, so its repeat count alone does not give the repeat count of the full cube sequence.

## Returning to Rubik's Cube and Human Solving

The ordinary 3 by 3 cube, with its centres fixed, is not 27 freely swappable tokens. Its eight corners and twelve edges stay in separate groups of positions, and corners can twist and edges can flip. The number of legal positions is:

$$
8!\times12!\times3^7\times2^{11}/2
=43,252,003,274,489,856,000.
$$

Seven corner twists decide the eighth; eleven edge flips decide the twelfth; and the corner and edge swaps must both be even or both be odd. [Kociemba's cubie-level explanation](https://www.kociemba.org/math/cubielevel.htm) describes the pieces this way. [Cube20](https://cube20.org/) reports that every position can be solved in at most 20 moves when a half turn counts as one move. That does not mean every scramble takes 20 moves.

The cube study in this repository remains the place for sourced human solves and cube animation. A shortest route makes the number of moves as small as possible. A human speed-solver may instead aim to spend less time recognizing patterns, changing grip and executing moves, using practised sequences. This dimensional study makes no timing prediction and no world-record claim.

## Verification and Limits

Exact arithmetic, small sets of arrangements and legal moves are computed, not guessed. The model tests visit every 1D and nine-position arrangement and check the shortest distances, the counting formulas, cycle parity and the move-word examples. The browser test script is written to exercise all seven views at desktop and narrow widths with external network requests blocked. It needs Playwright, which the repository does not install yet, and it has not been run since the search view was removed.

The 27-position view is a limited interactive model, not a solver that finds shortest routes. The saved export is the same interactive source with a standalone wrapper.
