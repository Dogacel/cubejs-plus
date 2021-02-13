import { Color, Rotation, FaceIndices, Move, relations } from "./consts";
import { Face } from "./face";
import { permute, crossPermute, shift } from "./utils";

const { Wc, Gc, Rc, Yc, Bc, Oc } = Color;
const { X, X2, Xp, Y, Y2, Yp, Z, Z2, Zp } = Rotation;
const { Ui, Fi, Ri, Di, Bi, Li } = FaceIndices;
const {
    U, U2, Up, F, F2, Fp, R, R2, Rp,
    D, D2, Dp, B, B2, Bp, L, L2, Lp,
} = Move;

export class Cube {
    public faces: Array<Face>;

    constructor() {
        this.faces = new Array<Face>(6);
        this.faces[Ui] = Face.from(Array(9).fill(Wc));
        this.faces[Fi] = Face.from(Array(9).fill(Gc));
        this.faces[Ri] = Face.from(Array(9).fill(Rc));
        this.faces[Di] = Face.from(Array(9).fill(Yc));
        this.faces[Bi] = Face.from(Array(9).fill(Bc));
        this.faces[Li] = Face.from(Array(9).fill(Oc));
    }

    public isSolved(): boolean {
        return this.faces.reduce<boolean>((prev, curr) => prev && curr.isSolid(), true);
    }

    private handleRotation(faces: Array<FaceIndices>, excluded: Array<FaceIndices>, r: Rotation) {
        this.faces[excluded[0]].useRotator(r, false);
        this.faces[excluded[1]].useRotator(r, true);

        permute(this.faces, faces, shift(faces, (r % 3) + 1));
    }

    public rotate(r: Rotation) {
        switch (r) {
            case X: case X2: case Xp:
                this.handleRotation([Fi, Ui, Bi, Di], [Ri, Li], r);
                break;
            case Y: case Y2: case Yp:
                this.handleRotation([Fi, Li, Bi, Ri], [Ui, Di], r);
                break;
            case Z: case Z2: case Zp:
                this.handleRotation([Ui, Ri, Di, Li], [Fi, Bi], r);
                break;
        }
    }

    private relation(source: FaceIndices, target: FaceIndices): Array<number> {

        return relations[source][target];
    }

    private handleMove(face: FaceIndices, connections: Array<FaceIndices>, m: Move) {
        const repeats = (m % 3) + 1;
        connections = connections.reverse();
        for (var i = 0; i < repeats; i++)
            crossPermute(
                connections.map(c => this.faces[c].colors),
                connections.map(c => this.relation(face, c))
            );
        this.faces[face].useRotator(m % 3, false);
    }

    public apply(m: Array<Move>) {
        m.forEach(move => this.move(move));
    }

    public move(m: Move) {
        switch (m) {
            case U: case U2: case Up:
                this.handleMove(Ui, [Fi, Li, Bi, Ri], m);
                break;
            case F: case F2: case Fp:
                this.handleMove(Fi, [Ui, Li, Di, Ri], m);
                break;
            case R: case R2: case Rp:
                this.handleMove(Ri, [Ui, Bi, Di, Fi], m);
                break;
            case D: case D2: case Dp:
                this.handleMove(Di, [Fi, Ri, Bi, Li], m);
                break;
            case B: case B2: case Bp:
                this.handleMove(Bi, [Ui, Li, Di, Ri], m);
                break;
            case L: case L2: case Lp:
                this.handleMove(Li, [Fi, Di, Bi, Ui], m);
                break;
        }
    }

    public print() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 12; j++) {
                if (i < 3) {
                    if (j > 2 && j < 6) {
                        process.stdout.write(this.faces[Ui].colors[i * 3 + (j % 3)].toString());
                    } else {
                        process.stdout.write(" ")
                    }
                } else if (i < 6) {
                    if (j < 3) {
                        process.stdout.write(this.faces[Li].colors[(i - 3) * 3 + (j % 3)].toString())
                    } else if (j < 6) {
                        process.stdout.write(this.faces[Fi].colors[(i - 3) * 3 + (j % 3)].toString())
                    } else if (j < 9) {
                        process.stdout.write(this.faces[Ri].colors[(i - 3) * 3 + (j % 3)].toString())
                    } else {
                        process.stdout.write(this.faces[Bi].colors[(5 - i) * 3 + 2 - (j % 3)].toString())
                    }
                } else {
                    if (j > 2 && j < 6) {
                        process.stdout.write(this.faces[Di].colors[(i - 6) * 3 + (j % 3)].toString());
                    } else {
                        process.stdout.write(" ")
                    }
                }
            }
            process.stdout.write("\n");
        }
    }

}
