import { Cube, Rotation } from "./cube";
export * from "./cube";

const cube = new Cube();

cube.print();
console.log();

cube.rotate(Rotation.X);

cube.print();
console.log();

cube.rotate(Rotation.X2);

cube.print();
console.log();

cube.rotate(Rotation.Xp);

cube.print();
console.log();

cube.rotate(Rotation.Y);

cube.print();
console.log();

cube.rotate(Rotation.Y2);

cube.print();
console.log();

cube.rotate(Rotation.Yp);

cube.print();
console.log();

cube.rotate(Rotation.Z);

cube.print();
console.log();

cube.rotate(Rotation.Z2);

cube.print();
console.log();

cube.rotate(Rotation.Zp);

cube.print();
console.log();
