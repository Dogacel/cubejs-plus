import { Color, FaceIndices, Move, relations } from "./consts";
import { Face } from "./face";
import { permute, crossPermute, shift } from "./utils";

const { Wc, Gc, Rc, Yc, Bc, Oc } = Color;
const { Ui, Fi, Ri, Di, Bi, Li } = FaceIndices;
const {
    U, U2, Up, F, F2, Fp, R, R2, Rp,
    D, D2, Dp, B, B2, Bp, L, L2, Lp,
    M, M2, Mp, S, S2, Sp, E, E2, Ep,
    X, X2, Xp, Y, Y2, Yp, Z, Z2, Zp,
    Uw, Uw2, Uwp, Fw, Fw2, Fwp,
    Rw, Rw2, Rwp, Dw, Dw2, Dwp,
    Bw, Bw2, Bwp, Lw, Lw2, Lwp,
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

    private handleRotation(faces: Array<FaceIndices>, excluded: Array<FaceIndices>, r: Move) {
        this.faces[excluded[0]].useRotator(r, false);
        this.faces[excluded[1]].useRotator(r, true);

        if (r >= Y && r <= Yp) {
            if (r == Y) {
                this.faces[Li].r180();
                this.faces[Bi].r180();
            } else if (r == Y2) {
                this.faces[Bi].r180();
                this.faces[Fi].r180();
            } else {
                this.faces[Bi].r180();
                this.faces[Ri].r180();
            }
        } else if (r >= Z && r <= Zp) {
            if (r == Z) {
                this.faces[Li].r270();
                this.faces[Ui].r270();
                this.faces[Ri].r270();
                this.faces[Di].r270();
            } else if (r == Y2) {
                this.faces[Li].r180();
                this.faces[Ui].r180();
                this.faces[Ri].r180();
                this.faces[Di].r180();
            } else {
                this.faces[Li].r90();
                this.faces[Ui].r90();
                this.faces[Ri].r90();
                this.faces[Di].r90();
            }
        }


        permute(this.faces, faces, shift(faces, (r % 3) + 1));
    }


    private handleMove(face: FaceIndices, connections: Array<FaceIndices>, m: Move) {
        const repeats = (m % 3) + 1;
        connections = connections.reverse();
        for (var i = 0; i < repeats; i++)
            crossPermute(
                connections.map(c => this.faces[c].colors),
                connections.map(c => relations[face][c])
            );
        this.faces[face].useRotator(m % 3, false);
    }

    public apply(m: Array<Move>) {
        m.forEach(move => this.move(move));
    }

    public move(m: Move) {
        const o = (m % 3);
        switch (m) {
            case U: case U2: case Up:
                this.handleMove(Ui, [Fi, Li, Bi, Ri], m);
                break;
            case F: case F2: case Fp:
                this.handleMove(Fi, [Ui, Ri, Di, Li], m);
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
            case M: case M2: case Mp:
                this.apply([R + o, Lp - o, X + o]);
                break;
            case S: case S2: case Sp:
                this.apply([U + o, Dp - o, Y + o]);
                break;
            case E: case E2: case Ep:
                this.apply([F + o, Bp - o, Z + o]);
                break;
            case X: case X2: case Xp:
                this.handleRotation([Fi, Ui, Bi, Di], [Ri, Li], m);
                break;
            case Y: case Y2: case Yp:
                this.handleRotation([Fi, Li, Bi, Ri], [Ui, Di], m);
                break;
            case Z: case Z2: case Zp:
                this.handleRotation([Ui, Ri, Di, Li], [Fi, Bi], m);
                break;
            case Uw: case Uw2: case Uwp:
                this.apply([D + o, Y + o]);
                break;
            case Fw: case Fw2: case Fwp:
                this.apply([B + o, Z + o]);
                break;
            case Rw: case Rw2: case Rwp:
                this.apply([L + o, X + o]);
                break;
            case Dw: case Dw2: case Dwp:
                this.apply([U + o, Yp - o]);
                break;
            case Bw: case Bw2: case Bwp:
                this.apply([F + o, Zp - o]);
                break;
            case Lw: case Lw2: case Lwp:
                this.apply([R + o, Xp - o]);
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
