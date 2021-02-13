export enum Color {
    Wc = 0, Gc, Rc, Yc, Bc, Oc
}

export enum FaceIndices {
    Ui = 0, Fi, Ri, Di, Bi, Li
}

export enum Move {
    U = 0, U2, Up,
    F, F2, Fp,
    R, R2, Rp,
    D, D2, Dp,
    B, B2, Bp,
    L, L2, Lp,
    M, M2, Mp,
    S, S2, Sp,
    E, E2, Ep,
    X, X2, Xp,
    Y, Y2, Yp,
    Z, Z2, Zp,

}

export const relations = [
    [ // U
        [],
        [0, 1, 2],
        [0, 1, 2],
        [],
        [8, 7, 6],
        [0, 1, 2]
    ],
    [ // F
        [6, 7, 8],
        [],
        [0, 3, 6],
        [2, 1, 0],
        [],
        [8, 5, 2]
    ],
    [ // R
        [2, 5, 8],
        [2, 5, 8],
        [],
        [2, 5, 8],
        [2, 5, 8],
        []],
    [ // D
        [],
        [6, 7, 8],
        [6, 7, 8],
        [],
        [2, 1, 0],
        [6, 7, 8]
    ],
    [ // B
        [0, 1, 2],
        [],
        [2, 5, 8],
        [8, 7, 6],
        [],
        [6, 3, 0]
    ],
    [ // L
        [0, 3, 6],
        [0, 3, 6],
        [],
        [0, 3, 6],
        [0, 3, 6],
        []
    ]
];
