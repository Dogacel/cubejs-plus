import { assert } from "chai";
import { describe, it } from "mocha";
import { FaceIndices, Move } from "../consts";
import { Cube } from "../cube";
import { Face } from "../face";

const { Ui, Fi, Ri, Di, Bi, Li } = FaceIndices;

const createAndMove = (m: Move, rest: (oldFaces: Face[], newFaces: Face[]) => any) => {
    const cube = Cube.allDifferent();
    const oldFaces = cube.faces.slice()
    cube.move(m)
    return () => rest(oldFaces, cube.faces);
}

describe('Solved rotates', () => {
    describe('X axis', () => {
        it('X rotates correctly', createAndMove(Move.X, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Ui])
            assert.deepEqual(oldFaces[Ui], newFaces[Bi])
            assert.deepEqual(oldFaces[Bi], newFaces[Di])
            assert.deepEqual(oldFaces[Di], newFaces[Fi])
            assert.deepEqual(oldFaces[Ri], newFaces[Ri])
            assert.deepEqual(oldFaces[Li], newFaces[Li])
        }));
        it('X\' rotates correctly', createAndMove(Move.Xp, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Di])
            assert.deepEqual(oldFaces[Di], newFaces[Bi])
            assert.deepEqual(oldFaces[Bi], newFaces[Ui])
            assert.deepEqual(oldFaces[Ui], newFaces[Fi])
            assert.deepEqual(oldFaces[Ri], newFaces[Ri])
            assert.deepEqual(oldFaces[Li], newFaces[Li])
        }));
        it('X2 rotates correctly', createAndMove(Move.X2, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Bi])
            assert.deepEqual(oldFaces[Bi], newFaces[Fi])
            assert.deepEqual(oldFaces[Ui], newFaces[Di])
            assert.deepEqual(oldFaces[Di], newFaces[Ui])
            assert.deepEqual(oldFaces[Ri], newFaces[Ri])
            assert.deepEqual(oldFaces[Li], newFaces[Li])
        }));
    });

    describe('Y axis', () => {
        it('Y rotates correctly', createAndMove(Move.Y, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Li])
            assert.deepEqual(oldFaces[Li], newFaces[Bi])
            assert.deepEqual(oldFaces[Bi], newFaces[Ri])
            assert.deepEqual(oldFaces[Ri], newFaces[Fi])
            assert.deepEqual(oldFaces[Ui], newFaces[Ui])
            assert.deepEqual(oldFaces[Di], newFaces[Di])
        }));
        it('Y\' rotates correctly', createAndMove(Move.Yp, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Ri])
            assert.deepEqual(oldFaces[Ri], newFaces[Bi])
            assert.deepEqual(oldFaces[Bi], newFaces[Li])
            assert.deepEqual(oldFaces[Li], newFaces[Fi])
            assert.deepEqual(oldFaces[Ui], newFaces[Ui])
            assert.deepEqual(oldFaces[Di], newFaces[Di])
        }));
        it('Y2 rotates correctly', createAndMove(Move.Y2, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Bi])
            assert.deepEqual(oldFaces[Bi], newFaces[Fi])
            assert.deepEqual(oldFaces[Ri], newFaces[Li])
            assert.deepEqual(oldFaces[Li], newFaces[Ri])
            assert.deepEqual(oldFaces[Ui], newFaces[Ui])
            assert.deepEqual(oldFaces[Di], newFaces[Di])
        }));
    })

    describe('Z axis', () => {
        it('Z rotates correctly', createAndMove(Move.Z, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Ui], newFaces[Ri])
            assert.deepEqual(oldFaces[Ri], newFaces[Di])
            assert.deepEqual(oldFaces[Di], newFaces[Li])
            assert.deepEqual(oldFaces[Li], newFaces[Ui])
            assert.deepEqual(oldFaces[Fi], newFaces[Fi])
            assert.deepEqual(oldFaces[Bi], newFaces[Bi])
        }));
        it('Z\' rotates correctly', createAndMove(Move.Zp, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Ui], newFaces[Li])
            assert.deepEqual(oldFaces[Li], newFaces[Di])
            assert.deepEqual(oldFaces[Di], newFaces[Ri])
            assert.deepEqual(oldFaces[Ri], newFaces[Ui])
            assert.deepEqual(oldFaces[Fi], newFaces[Fi])
            assert.deepEqual(oldFaces[Bi], newFaces[Bi])
        }));
        it('Z2 rotates correctly', createAndMove(Move.Z2, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Ui], newFaces[Di])
            assert.deepEqual(oldFaces[Di], newFaces[Ui])
            assert.deepEqual(oldFaces[Ri], newFaces[Li])
            assert.deepEqual(oldFaces[Li], newFaces[Ri])
            assert.deepEqual(oldFaces[Fi], newFaces[Fi])
            assert.deepEqual(oldFaces[Bi], newFaces[Bi])
        }));
    });
});
