import { Color, FaceIndices, Move, relations } from "./consts";
import { Face } from "./face";
import { permute, crossPermute, shift, intersect, print } from "./utils";

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

    public static solved(): Cube {
        const cube = new Cube();
        cube.faces = new Array<Face>(6);
        cube.faces[Ui] = Face.from(Array(9).fill(Wc));
        cube.faces[Fi] = Face.from(Array(9).fill(Gc));
        cube.faces[Ri] = Face.from(Array(9).fill(Rc));
        cube.faces[Di] = Face.from(Array(9).fill(Yc));
        cube.faces[Bi] = Face.from(Array(9).fill(Bc));
        cube.faces[Li] = Face.from(Array(9).fill(Oc));
        return cube;
    }

    public static allDifferent(): Cube {
        const cube = new Cube();
        cube.faces = new Array<Face>(6);
        cube.faces[Ui] = Face.from(Array(9).fill(0).map((v, i) => v + i));
        cube.faces[Fi] = Face.from(Array(9).fill(9).map((v, i) => v + i));
        cube.faces[Ri] = Face.from(Array(9).fill(18).map((v, i) => v + i));
        cube.faces[Di] = Face.from(Array(9).fill(27).map((v, i) => v + i));
        cube.faces[Bi] = Face.from(Array(9).fill(36).map((v, i) => v + i));
        cube.faces[Li] = Face.from(Array(9).fill(45).map((v, i) => v + i));
        return cube;
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
                this.apply([Rp - o, L + o, X + o]);
                break;
            case S: case S2: case Sp:
                this.apply([Up - o, D + o, Y + o]);
                break;
            case E: case E2: case Ep:
                this.apply([Fp - o, B + o, Z + o]);
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

    public solvedEdges() {
        const values = Object.values(FaceIndices).splice(0, 6) as number[];
        const edges = [] as string[];
        for (var f1 = 0; f1 < 6; f1++) {
            for (var f2 = f1 + 1; f2 < 6; f2++) {
                if (relations[f2][f1].length === 0)
                    continue;
                const c1 = this.faces[f1].colors[relations[f2][f1][1]];
                const c2 = this.faces[f2].colors[relations[f1][f2][1]];
                if (c1 === this.faces[f1].center() && c2 === this.faces[f2].center()) {
                    edges.push(values[f1][0] + values[f2][0]);
                }
            }
        }
        return edges;
    }

    public solvedCorners() {
        const values = Object.values(FaceIndices).splice(0, 6) as number[];
        const corners = [] as string[];
        for (var f1 = 0; f1 < 6; f1++) {
            for (var f2 = f1 + 1; f2 < 6; f2++) {
                for (var f3 = f2 + 1; f3 < 6; f3++) {
                    if (relations[f2][f1].length === 0 || relations[f3][f1].length === 0 || relations[f2][f1].length === 0)
                        continue;
                    const f1i = intersect([relations[f2][f1], relations[f3][f1]])[0];
                    const f2i = intersect([relations[f1][f2], relations[f3][f2]])[0];
                    const f3i = intersect([relations[f1][f3], relations[f2][f3]])[0];

                    if (this.faces[f1].colors[f1i] === this.faces[f1].center() &&
                        this.faces[f2].colors[f2i] === this.faces[f2].center() &&
                        this.faces[f3].colors[f3i] === this.faces[f3].center())
                        corners.push(values[f1][0] + values[f2][0] + values[f3][0]);
                }
            }
        }
        return corners;
    }

    public solvedCrosses() {
        const values = Object.values(FaceIndices).splice(0, 6) as number[];
        const edges = this.solvedEdges().join('');
        const crosses = [] as string[];
        for (var f1 = 0; f1 < 6; f1++) {
            if (edges.split(values[f1][0]).length - 1 === 4)
                crosses.push(values[f1][0]);
        }
        return crosses;
    }

    public solvedPairs(crosses: string[] = []) {
        if (crosses.length === 0)
            crosses = this.solvedCrosses();

        const edges = this.solvedEdges();
        const corners = this.solvedCorners();
        const pairs = [] as string[][];
        crosses.forEach(cross => {
            pairs.push([]);
            corners.forEach(corner => {
                if (corner.split(cross).length - 1 === 0)
                    return;
                const others = corner.split(cross).join("");
                edges.filter(edge => edge === others).map(() => pairs[pairs.length - 1].push(corner));
            });
        });
        return pairs.reduce((prev, curr) => prev.concat(curr), [] as string[]);
    }

    public opposite(face: FaceIndices): Face {
        return this.faces[(face + 3) % 6];
    }

    public print() {
        print(this);
    }

}
