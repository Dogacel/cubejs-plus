import { Move, Rotation } from "./consts";
import { Cube } from "./cube";
import { parse } from "./utils";
export * from "./cube";

const cube = new Cube();

cube.print();
console.log(cube.isSolved());


const algorihtm = "R U R' U R U2 R' U L' U' L U' L' U2 L U' R U' R U R U R U' R' U' R2";
const moves = parse(algorihtm);
console.log(moves);
cube.apply(moves);

cube.print();
console.log(cube.isSolved());
