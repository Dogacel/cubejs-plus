import { assert } from "console";
import { Move } from "./consts";

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

export function parse(moveString: string): Array<Move> {
    moveString = moveString.toUpperCase();
    moveString = moveString.split("'").join("p");
    return moveString.split(" ").map(substr => Move[substr as keyof typeof Move]);
}

export function intersect<T>(arrays: Array<Array<T>>): Array<T> {
    return arrays.reduce((prev, curr) => prev.filter(x => curr.includes(x)), arrays[0]);
}
