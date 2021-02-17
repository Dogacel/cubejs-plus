import { assert } from "console";
import { FaceIndices, Move } from "./consts";
import { Cube } from "./cube";
import { Face } from "./face";

const { Ui, Fi, Ri, Di, Bi, Li } = FaceIndices;

export function permute(array: Array<any>, to: Array<number>, from: Array<number>) {
    assert(from.length === to.length);
    const memo = array.slice();
    for (let i = 0; i < array.length; i++) {
        array[to[i]] = memo[from[i]];
    }
}

export function crossPermute(arrays: Array<Array<any>>, to: Array<Array<number>>) {
    const memo = arrays[0].slice();
    for (var i = 0; i < arrays.length - 1; i++) {
        for (var j = 0; j < to[i].length; j++) {
            arrays[i][to[i][j]] = arrays[i + 1][to[i + 1][j]];
        }
    }
    for (var i = 0; i < to[arrays.length - 1].length; i++) {
        arrays[arrays.length - 1][to[arrays.length - 1][i]] = memo[to[0][i]];
    }
}

export function shift(array: Array<any>, amount: number) {
    amount = -amount;
    if (amount < 0) amount = array.length + amount;
    amount = amount % array.length;


    const lhalf = array.slice(0, amount);
    const rhalf = array.slice(amount, array.length);
    return rhalf.concat(lhalf);
}

export function intersect<T>(arrays: Array<Array<T>>): Array<T> {
    return arrays.reduce((prev, curr) => prev.filter(x => curr.includes(x)), arrays[0]);
}

export function parse(moveString: string): Array<Move> {
    moveString = moveString.toUpperCase();
    moveString = moveString.split("W").join("w");
    moveString = moveString.split("'").join("p");
    return moveString.split(" ").map(substr => Move[substr as keyof typeof Move]);
}

export function reconstruct(scramble: string, solution: string) {
    const cube = Cube.solved();
    const scrambleMoves = parse(scramble);
    const solutionMoves = parse(solution);
    const solutionSplit = solution.split(" ");

    const reconstruction = [] as string[][];
    var lastState = 0;
    var cross;

    cube.apply(scrambleMoves);
    for (var currentState = 0; currentState < solutionMoves.length; currentState++) {
        if (cube.solvedCrosses().length > 0 && reconstruction.length === 0) {
            reconstruction.push(solutionSplit.slice(lastState, currentState));
            lastState = currentState;
            cross = cube.solvedCrosses()[0];
        }

        if (cube.solvedCrosses().length > 0) {
            while (cube.solvedPairs([cross]).length >= reconstruction.length) {
                reconstruction.push(solutionSplit.slice(lastState, currentState));
                lastState = currentState;
            }
        }

        if (cross && cube.solvedPairs([cross]).length === 4) {
            if (!cube.isSolved()) {
                const crossFace = FaceIndices[cross + 'i'];
                if (cube.opposite(crossFace).isSolid() && reconstruction.length === 5) {
                    reconstruction.push(solutionSplit.slice(lastState, currentState));
                    lastState = currentState;
                }
            }
        }
        cube.move(solutionMoves[currentState]);
    }
    cube.print();
    reconstruction.push(solutionSplit.slice(lastState));
    return reconstruction;
}

export function print(cube: Cube) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 12; j++) {
            if (i < 3) {
                if (j > 2 && j < 6) {
                    process.stdout.write(cube.faces[Ui].colors[i * 3 + (j % 3)].toString());
                } else {
                    process.stdout.write(" ")
                }
            } else if (i < 6) {
                if (j < 3) {
                    process.stdout.write(cube.faces[Li].colors[(i - 3) * 3 + (j % 3)].toString())
                } else if (j < 6) {
                    process.stdout.write(cube.faces[Fi].colors[(i - 3) * 3 + (j % 3)].toString())
                } else if (j < 9) {
                    process.stdout.write(cube.faces[Ri].colors[(i - 3) * 3 + (j % 3)].toString())
                } else {
                    process.stdout.write(cube.faces[Bi].colors[(5 - i) * 3 + 2 - (j % 3)].toString())
                }
            } else {
                if (j > 2 && j < 6) {
                    process.stdout.write(cube.faces[Di].colors[(i - 6) * 3 + (j % 3)].toString());
                } else {
                    process.stdout.write(" ")
                }
            }
        }
        process.stdout.write("\n");
    }
}
