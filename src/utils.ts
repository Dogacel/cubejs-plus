import { assert } from "console";

export function permute(array: Array<any>, to: Array<number>, from: Array<number>) {
    assert(from.length === to.length);
    const memo = array.slice();
    for (let i = 0; i < array.length; i++) {
        array[to[i]] = memo[from[i]];
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
