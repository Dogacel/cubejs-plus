import { Cube } from "./cube";
import { parse } from "./utils";
export * from "./cube";

const cube = new Cube();

cube.print();
console.log(cube.isSolved());


const algorihtm = "U2 B2 F2 U' L2 D U2 F2 U' F2 U' R' F R' F' L2 F' U' B' y L U R' U R' F2 U' L U L2 U' L U' L U L' U' L U L' U2 R' U R U' R U R' y2 F R U R' U' R U R' U' F'"
const moves = parse(algorihtm);
console.log(moves);
cube.apply(moves);

cube.print();
console.log(cube.isSolved());
