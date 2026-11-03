# States and Moves

A progressive interactive journey from rearranging three tokens to repeated steps, the order of actions, paths between states, impossible positions and chance.

Prepared 2026-10-28, trimmed to an elementary scope on 2026-11-03 and renamed States and Moves the same day. The examples, diagrams and derivations are built for this study and are meant to be worked through, not just read.

## The Organizing Question

**What can change, what must remain, and what becomes simpler when we change our description?**

A cube is a good place to hold these questions in your hands, but they reach well beyond it. A move rearranges positions; moves can be done one after another, and the order matters; the allowed moves join states into a map, called a graph; a graph has shortest routes, properties that no legal move can change, and random walks in which probability spreads out while its total stays fixed.

The order is deliberate. First explore an object, then notice a contrast, derive what explains it, and connect it to another setting. The reflection prompts are invitations, not tests or gates. You can stay with one visual and return later; nothing requires a single uninterrupted reading.

## Read Alongside the Interactive Journey

The opening **Visual sequences** view shows an action next to a diagram of what it does, with one shared timeline. Follow three coloured identities, a sliding grid, cube sticker cycles, two orders of the same triangle moves, and probability moving around a six-cycle. Play, step or scrub the same transition in both views; the reading below follows the selected subject. **Explore all fields** retains the full parameter-driven experiments.

The 1D, 2D and 3D scenes change the move rules as well as the shape; they do not compare dimensions alone. The fair comparison, with the same tokens on a line and on a grid, is in the Possibility Atlas. Cube rings show the five separate loops of stickers moved by the current face turn, not five independent legal moves. In-between frames are animation between exact states; they are not extra puzzle states or measured physical motion.

The numbered chapters match the interactive chapter selector. In the downloadable document, each chapter has a button that selects its corresponding experiment. All computations run in the document; no remote model or service is needed.

Begin with three tokens. By chapter 6, a single path has become many possible paths, each with a probability. Chapter 7 in the explorer is the connection map, not another prerequisite.

## Keep Four Meanings Apart

- **Object:** a token arrangement, a position on a clock, a board, a distribution.
- **Transformation:** a swap, a turn of the triangle, a tile slide, one random-walk step.
- **Invariant:** colour counts, parity, total probability.
- **Objective:** a shortest path, reaching a target, recognizing a class.

Swaps, turns and slides can be undone, so each one has a reverse move. A random-walk step usually cannot be undone: once probability has spread out, the step does not record where it came from. A visually similar arrow does not imply identical mathematics.

Three kinds of evidence are kept apart throughout: a **proof** shows something is always true; a **complete check** has a computer try every case of one fixed example; an **illustration** shows a case to build intuition. Decimal displays are rounded.

## Existing Companion Labs

- Possibility Atlas (`possibility-atlas/`): arrangements, choices, repeated colours and the 1D / 2D / 3D token experiments, with more counting derivations.
- Cube Permutation Study (`cube-permutation-study/`): a cube shown next to the rearrangement of its stickers, with sourced solve comparisons. A short solution is not called the shortest without a proof or a published exact result.

These remain separate labs. This document is the path that connects them.


## 01. What counts as different?

*Counting*

**Explore:** If two objects become indistinguishable, did the world change, or did your description change?

**Notice:** Switch from three identities to two colours. Six labelled arrangements collapse into three arrangements you can tell apart by looking. Each visible arrangement has two labelled versions.

**Essence:** A state is a choice of which differences we keep track of. Deciding that two things count as the same sorts the arrangements into groups, one group for each outcome we can actually see. Nothing is thrown away: each group still holds all of its labelled versions.

$$
\text{outcomes}=\frac{N!}{n_1!\times n_2!\times\cdots\times n_k!}
$$

### Derive

1. There are 3 choices for the first distinct token, then 2, then 1: 3! = 6 arrangements.

2. If tokens A and B share one colour, swapping them is invisible. Every colour arrangement has exactly 2! = 2 labelled versions, so there are 3!/2! = 3 outcomes.

3. Take N objects where the first colour appears n1 times, the second n2 times, and so on up to the last colour, nk times. Each colour arrangement has n1! × n2! × ... × nk! labelled versions, so there are N!/(n1! × n2! × ... × nk!) outcomes. Dividing works only because every visible arrangement has the same number of labelled versions.

4. Example: the letters of BOOK. If the two Os are told apart, there are 4! = 24 orders. Each word appears twice, once with each O first, so there are 24/2 = 12 different words.

**Connect:** This is a first step toward information: one observation can cover several underlying possibilities. Later, probability will say how likely each possibility is. A list of possibilities alone does not say that.

**Contemplate:** What distinctions would you keep to solve the puzzle, and which would you forget to recognize a pattern?

Continue connections: 04. A solution is a path; 06. From a path to many possible paths.

## 02. Repetition becomes arithmetic

*Clock arithmetic*

**Explore:** Why can the same repeated step visit every position in one clock, but only some positions in another?

**Notice:** Choose n = 12 and step k = 4: the positions split into four separate loops of three. Change k to 5: a single loop visits all twelve positions.

**Essence:** What matters is not the circle on the screen but the rule "add k, and wrap around after n", which is arithmetic mod n. Repeating one step reveals which numbers divide which. The drawing makes the arithmetic visible.

$$
\text{loop length}=\frac{n}{\gcd(n,k)}
$$

### Derive

1. After t steps from position x, you are at x + t × k mod n. You are back where you started exactly when t × k is a multiple of n.

2. Let g be the greatest common divisor of n and k, written gcd(n, k). Then n = g × a and k = g × b, where a and b have no common factor except 1. So t × k is a multiple of n exactly when t is a multiple of a, and the first return happens after a = n/g steps.

3. So every loop has n/g positions, and the n positions split into n ÷ (n/g) = g separate loops. For k = 0, gcd(n, 0) = n, so each of the n positions is a loop on its own.

4. If gcd(n, k) = 1, a single loop visits every position; for n = 12 this happens for k = 1, 5, 7 and 11. Every other loop is the loop through 0 with each of its positions moved along by the same amount.

**Connect:** A loop like this is a rearrangement that a short calculation describes completely. The same idea returns when three turns bring the triangle back to where it started, and when parity counts mod 2. The word "cycle" will mean different but related things later; each chapter says which one it means.

**Contemplate:** Why does changing k from 4 to 5 have a more dramatic effect than making the drawing larger?

Continue connections: 03. Order is part of the meaning; 05. An impossibility can be visible.

## 03. Order is part of the meaning

*Order of actions*

**Explore:** Does doing the same two actions in the opposite order produce the same result?

**Notice:** Use r then s, and compare with s then r. Watch the coloured corners and the start-to-finish arrows together. Then try rrr and ss.

**Essence:** There are six ways to rotate or flip a triangle so that it lands on its own outline. Any two of them done one after the other give another of the six, doing nothing is one of them, and each can be undone by another. You may work out a long sequence in chunks without changing the result, as long as you keep the order. Whether two moves can trade places is a separate question, and here the answer is often no.

$$
rrr=ss=\text{do nothing},\qquad srs=rr
$$

### Derive

1. Number the corner positions of the triangle 0, 1 and 2. Let r move 0 to 1, 1 to 2 and 2 to 0 (a turn). Let s keep 0 in place and swap 1 and 2 (a flip).

2. Words are read in time order: "rs" means r first, then s. In both diagrams, each arrow starts at a corner's starting position and ends where that corner finishes after the whole word.

3. Check: rrr does nothing, and ss does nothing. But rs sends 0 to 2, while sr sends 0 to 1, so rs and sr are different. Also srs is the turn r done backwards, which is the same as rr.

4. Every word simplifies to one of six: do nothing, r, rr, s, rs or rrs. These are the six ways to rotate or flip the triangle. They are all different, and three corners can be rearranged in only 3! = 6 ways, so every rearrangement of the corners is one of them.

**Connect:** In robotics, turning and then driving forward ends somewhere different from driving forward and then turning. In a computer program, the order of some updates matters. On a cube, useful sequences rely on doing moves in a carefully chosen order and then undoing them, rather than moving every sticker on its own.

**Contemplate:** What remains the same when the triangle turns, and what changes when its labels move?

Continue connections: 04. A solution is a path; 05. An impossibility can be visible.

## 04. A solution is a path

*Shortest routes*

**Explore:** Can the shortest solution change even though the set of states has not changed?

**Notice:** Select state 210. With neighbour swaps it is three moves from 012; if any two tokens may swap, it is one. The diagram has the same six arrangements but different connecting lines.

**Essence:** Arrangements become dots, and allowed moves become lines between them. The shortest route depends on which moves are allowed and what each one costs. "Shortest" is incomplete until you say what counts as a move and what you are trying to make small.

$$
\text{distance}(x,y)=\text{fewest moves from }x\text{ to }y
$$

### Derive

1. Draw all six arrangements as dots. Join two dots when one allowed swap turns one arrangement into the other. Neighbour swaps join the six dots into a single loop. Allowing any two tokens to swap adds three more lines, each joining two arrangements that were three steps apart on the loop.

2. To find shortest routes, start at the target, mark every arrangement one move away, then every unmarked arrangement one move further, and so on, layer by layer. This is called breadth-first search. The first time an arrangement is reached gives a shortest route: any shorter route would have reached it in an earlier layer.

3. Adding moves while keeping all the old ones can never make a shortest route longer. Replacing the moves with a different set gives no such guarantee.

4. If moves have different costs, counting layers is not enough; you have to add up the costs along each route, as Dijkstra's method does. For a person, time also depends on spotting the next move and how comfortable it is to make, so the fewest moves need not be the fastest.

**Connect:** The same picture is used to plan routes on maps, send messages across networks and move robots. The cube study in this repository keeps proven shortest solutions, published limits and human solves apart; it does not call a short solution the shortest without proof.

**Contemplate:** Which would you make as small as possible: moves, time, memory, energy, or the effort of recognizing the next step?

Continue connections: 05. An impossibility can be visible; 06. From a path to many possible paths.

## 05. An impossibility can be visible

*Things that never change*

**Explore:** Can a state look almost solved and still be impossible to solve using the allowed moves?

**Notice:** Slide tiles into the blank: the number of out-of-order pairs stays even. Now press "Exchange 1 and 2", which deliberately breaks the rules: the count becomes odd.

**Essence:** An invariant is something that no legal move can change. It can prove that a position is unreachable without trying every route. It does not always tell the whole story: a position that passes the test may still need a separate argument to show it can be reached.

$$
\text{inversions after a legal move}\equiv\text{inversions before}\pmod 2
$$

### Derive

1. Read the numbered tiles row by row, skipping the blank. An inversion is a pair of tiles in the wrong order: a larger number before a smaller one. The solved board has no inversions.

2. Sliding a tile left or right does not change the reading order at all. Sliding a tile up or down on a board three tiles wide moves it past exactly two other tiles in the reading order. Each of those two pairs switches between right and wrong order, so the number of inversions goes down by 2, stays the same or goes up by 2. Its parity, meaning whether it is even or odd, never changes.

3. So every sequence of legal moves keeps the parity. Exchanging two numbered tiles by hand changes the parity, so that board cannot be reached from the solved board.

4. On boards with an odd width, such as 3 × 3, every board with an even number of inversions can in fact be reached. For the 3 × 3 board, this chapter checks that with a computer by visiting all 181,440 reachable boards; the parity argument alone proves only that the odd boards are impossible. Boards with an even width need an extra rule involving the row of the blank.

**Connect:** Parity works like a simple check digit: it catches some impossible edits but not every mistake. On a cube, corner twists, edge flips and swap parity are similar rules, counted mod 3 and mod 2. Conservation of energy in physics uses the same strategy: find something that never changes.

**Contemplate:** What would an invariant fail to tell you about a board with an even number of inversions?

Continue connections: 02. Repetition becomes arithmetic; 04. A solution is a path.

## 06. From a path to many possible paths

*Chance*

**Explore:** If you cannot say exactly where a walker is, what can you still say for certain?

**Notice:** Start all probability at vertex 0 of a six-cycle and take steps. Each vertex passes its probability to its neighbours, or keeps half of it with the half-stay rule. The individual numbers change at every step; their total stays 1.

**Essence:** A random walk can be described by a distribution: one probability for each state. A step does not create or destroy probability. It only moves it along the edges of the graph, so the total stays the same even when the walker itself is uncertain.

$$
\text{total after a step}=\text{total before}=1
$$

### Derive

1. Call the fraction that stays put a: a = 0 for "always move" and a = 1/2 for "half stay". Each step keeps the fraction a of the probability at its vertex and sends (1 - a)/2 to each of its two neighbours, counting positions mod n.

2. Follow the probability at one vertex: the fraction a stays, and two shares of (1 - a)/2 leave. These parts add up to a + (1 - a) = 1, so all of it lands somewhere. Adding over all vertices, the new total equals the old total, which started at 1.

3. Every new value is a sum of shares of old values, none of them negative, so no probability becomes negative. Together with the total, this means the numbers always form a valid distribution.

4. If every vertex holds 1/6, each vertex receives a/6 from itself and (1 - a)/12 from each of its two neighbours, which adds up to 1/6 again. On this evenly shaped cycle, the even spread is left unchanged by a step.

**Connect:** The six-state puzzle graph also supports a random walk, but finding the shortest solution and asking where a random walker is likely to be are different goals. Board games with dice, shuffling cards and the spreading of a drop of ink use the same bookkeeping: probabilities move between states, and the total stays 1.

**Contemplate:** Can you become less sure where the walker is while still being completely sure of the total? What would watching a single moving dot hide?

Continue connections: 01. What counts as different?; 04. A solution is a path.

## Dimension Is Not One Number

The earlier 1D-to-3D experiment changed both the number of positions and which positions are neighbours. For a grid three positions wide in D dimensions, there are N = 3^D positions and E = 2 × D × 3^(D-1) neighbouring pairs. With N/3 tokens of each of three colours, the number of arrangements is N!/((N/3)!)^3:

- 1D: N=3, E=2, 6 colour arrangements.
- 2D: N=9, E=12, 1,680 colour arrangements.
- 3D: N=27, E=54, 227,873,431,500 colour arrangements.

These are puzzles where neighbouring colours swap, not Rubik's Cubes. A cube turn moves several pieces together and adds twist and flip rules. Replacing one move rule with the other changes the problem.

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
These are continuations, not claims that this short document covers those fields. The test for adding a subject is whether it clarifies a concrete question or exposes a useful connection.

## What the Experiments Do and Do Not Establish

The token arrangements, colour groups, clock loops, triangle move sequences, shortest routes and the sliding-puzzle check use exact whole-number computations. The random-walk view uses floating-point arithmetic alongside an explicit derivation that the total stays 1; displayed probabilities are rounded.

Computer checks catch programming mistakes; they do not replace proofs that cover every case. The cube study and the Possibility Atlas keep the detailed sources and the line between proven shortest routes and merely short ones. Human speed-solving is not ranked here by an invented universal score, and no unmeasured advantage is claimed.

The durable standalone document contains the entire interactive explorer and this reading companion. Browser execution is local to the viewing surface; no personal data or external API is required. Reopening the file preserves the document. Your place is saved in this browser's local storage when it is available; it is not a promise of cross-device synchronization.
