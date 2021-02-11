import { assert } from "console";

export enum Color {
    Wc = 0, Gc, Rc, Yc, Bc, Oc
}

export enum Rotation {
    X = 0, X2, Xp, Y, Y2, Yp, Z, Z2, Zp
}

export enum FaceIndices {
    Ui = 0, Fi, Ri, Di, Bi, Li
}

export enum Move {
    U, U2, Up,
    F, F2, Fp,
    R, R2, Rp,
    D, D2, Dp,
    B, B2, Bp,
    L, L2, Lp,
    M, M2, Mp,
    S, S2, Sp,
    E, E2, Ep
}

const { Wc, Gc, Rc, Yc, Bc, Oc } = Color;
const { X, X2, Xp, Y, Y2, Yp, Z, Z2, Zp } = Rotation;
const { Ui, Fi, Ri, Di, Bi, Li } = FaceIndices;

function permute(array: Array<any>, to: Array<number>, from: Array<number>) {
    assert(from.length === to.length);
    const memo = array.slice();
    for (let i = 0; i < array.length; i++) {
        array[to[i]] = memo[from[i]];
    }
}

class Face {
    public colors: Array<Color>

    public static from(colors: Array<Color>): Face {
        const face = new Face();
        face.colors = colors.slice();
        return face;
    }

    public r90() {
        permute(this.colors, [0, 1, 2, 3, 4, 5, 6, 7, 8], [6, 3, 0, 7, 4, 1, 8, 5, 2]);
    }

    public r180() {
        permute(this.colors, [0, 1, 2, 3, 4, 5, 6, 7, 8], [8, 7, 6, 5, 4, 3, 2, 1, 0]);
    }

    public r270() {
        permute(this.colors, [0, 1, 2, 3, 4, 5, 6, 7, 8], [2, 5, 8, 1, 4, 7, 0, 3, 6]);
    }
}


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

    public rotate(r: Rotation) {
        switch (r) {
            case X:
                this.faces[Ri].r90();
                this.faces[Li].r270();
                permute(this.faces, [Fi, Ui, Bi, Di], [Di, Fi, Ui, Bi]);
                break;
            case X2:
                this.faces[Ri].r180();
                this.faces[Li].r180();
                permute(this.faces, [Fi, Ui, Bi, Di], [Bi, Di, Fi, Ui]);
                break;
            case Xp:
                this.faces[Ri].r270();
                this.faces[Li].r90();
                permute(this.faces, [Fi, Ui, Bi, Di], [Ui, Bi, Di, Fi]);
                break;
            case Y:
                this.faces[Ui].r90();
                this.faces[Di].r270();
                permute(this.faces, [Fi, Ri, Bi, Li], [Ri, Bi, Li, Fi]);
                break;
            case Y2:
                this.faces[Ui].r180();
                this.faces[Di].r180();
                permute(this.faces, [Fi, Ri, Bi, Li], [Bi, Li, Fi, Ri]);
                break;
            case Yp:
                this.faces[Ui].r270();
                this.faces[Di].r90();
                permute(this.faces, [Fi, Ri, Bi, Li], [Li, Fi, Ri, Bi]);
                break;
            case Z:
                this.faces[Fi].r90();
                this.faces[Bi].r270();
                permute(this.faces, [Ui, Ri, Di, Li], [Li, Ui, Ri, Di]);
                break;
            case Z2:
                this.faces[Fi].r180();
                this.faces[Bi].r180();
                permute(this.faces, [Ui, Ri, Di, Li], [Di, Li, Ui, Ri]);
                break;
            case Zp:
                this.faces[Fi].r270();
                this.faces[Bi].r90();
                permute(this.faces, [Ui, Ri, Di, Li], [Ri, Di, Li, Ui]);
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
                        process.stdout.write(this.faces[Bi].colors[(i - 3) * 3 + (j % 3)].toString())
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
