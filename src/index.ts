import { Cube } from "./cube";
import { parse } from "./utils";
export * from "./cube";

const cube = new Cube();

cube.print();
console.log(cube.isSolved());


// "U2 B2 F2 U' L2 D U2 F2 U' F2 U' R' F R' F' L2 F' U' B' y L U R' U R' F2 U' L U L2 U' L U' L U L' U' L U L' U2 R' U R U' R U R' y2 F R U R' U' R U R' U' F'"
const algorihtm = "U2 L2 F2 U2 L B2 D2 R' U2 R U2 L2 F' D L' B' D' B' U2 F R y R' U2 R2 B' R' B U L' U Rw D Rw' B' L U2 R U' R2 F R U2 F' U2 L' U L"
const moves = parse(algorihtm);
console.log(moves);
cube.apply(moves);

cube.print();
console.log(cube.isSolved());

console.log(cube.solvedEdges());
console.log(cube.solvedCorners());
console.log(cube.solvedCrosses());
console.log(cube.solvedPairs());
