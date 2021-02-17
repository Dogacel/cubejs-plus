# Cubejs+ ![Node.js Package](https://github.com/Dogacel/cubejs-plus/workflows/Node.js%20Package/badge.svg)

**Cubejs+** is an extensive JavaScript / TypeScript library for representing and controlling a 3x3x3 Rubik's Cube. The aim of **Cubejs+** is to create an open-source universal API for parsing the information collected from a bluetooth enabled speedcube for analysis. This library is inspired from [cube.js](https://github.com/ldez/cubejs) and [cubing.js](https://github.com/cubing/cubing.js).

## Features

- Make moves and rotations on a cube.
- Detect if cube is solved.
- Detecting solved edges, corners, crosses, F2L pairs, layers.
- Detecting steps of a CFOP solve.

## Sample Code

```typescript
const cube = Cube.solved();

cube.isSolved(); // true

cube.move(Move.R);

const test_scramble = parse("U L' U2 R' L");
cube.apply(test_scramble);

cube.solvedEdges(); // ['UR', 'FD', 'RD', 'RB', 'DB', 'DL', 'BL']
cube.solvedCorners(); // ['URB', 'RDB', 'DBL']
cube.solvedCrosses(); // ['D']
cube.solvedPairs(); // ['RDB', 'DBL']

const scramble = "L R2 B U2 R2 F D2 L2 F R' F2 D' F U F2 R' B L F'";
const solution =
  "x2 U2 Rw' U Rw L F2 R D y' U2 L' U L U' L' U L U' y' U' R' U R2 U' R' U2 L' U L U2 L' U L U' L U' L' y U' y' R U2 R' U R U' R' U2 Rw U R' U R U2 Rw' M' U M2 U M2 U M' U2 M2 U'";

reconstruct(scramble, solution);
/*
    x2 U2 Rw' U Rw L F2 R D // Cross
    y' U2 L' U L U' L' U L U' y' U' R' U R2 U' R' // F2L1
    U2 L' U L U2 L' U L // F2L2
    U' L U' L' // F2L3
    y U' y' R U2 R' U R U' R' // F2L4
    U2 Rw U R' U R U2 Rw' // OLL
    M' U M2 U M2 U M' U2 M2 U' // PLL
*/
```

## Roadmap

- [ ] Tidy up string and enum mixture in `solved...()` methods.
- [ ] Write extensive unit tests:
  - [ ] Check if every move is working correctly.
  - [ ] Check if parser can parse correctly.
  - [ ] Check reconstruction is working on edge cases (Skips, xcrosses)
- [ ] Predict rotations without user input.
- [ ] Add timing between moves support for analysis.
- [ ] Show detailed analysis of move timings.
- [ ] Add direct bluetooth support.

## Contribution

Please feel free to open issues. This project is still underdevelopment and is open to new suggestions.
