import { assert } from "chai";
import { describe, it } from "mocha";
import { FaceIndices, Move } from "../consts";
import { Cube } from "../cube";
import { Face } from "../face";

const { Ui, Fi, Ri, Di, Bi, Li } = FaceIndices;

const createAndMove = (m: Move, rest: (oldFaces: Face[], newFaces: Face[]) => any) => {
    const cube = new Cube()
    const oldFaces = cube.faces.slice()
    cube.move(m)
    return () => rest(oldFaces, cube.faces);
}

describe('Solved rotates', () => {
    describe('X axis', () => {
        it('X rotates correctly', createAndMove(Move.X, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Ui])
            assert.notDeepEqual(oldFaces[Fi], newFaces[Fi])
        }));
        it('X\' rotates correctly', createAndMove(Move.Xp, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Di])
            assert.notDeepEqual(oldFaces[Fi], newFaces[Fi])
        }));
        it('X2 rotates correctly', createAndMove(Move.X2, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Bi])
            assert.notDeepEqual(oldFaces[Fi], newFaces[Fi])
        }));
    });

    describe('Y axis', () => {
        it('Y rotates correctly', createAndMove(Move.Y, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Li])
            assert.notDeepEqual(oldFaces[Fi], newFaces[Fi])
        }));
        it('Y\' rotates correctly', createAndMove(Move.Yp, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Ri])
            assert.notDeepEqual(oldFaces[Fi], newFaces[Fi])
        }));
        it('Y2 rotates correctly', createAndMove(Move.Y2, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Fi], newFaces[Bi])
            assert.notDeepEqual(oldFaces[Fi], newFaces[Fi])
        }));
    })

    describe('Z axis', () => {
        it('Z rotates correctly', createAndMove(Move.Z, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Ui], newFaces[Ri])
            assert.notDeepEqual(oldFaces[Ui], newFaces[Ui])
        }));
        it('Z\' rotates correctly', createAndMove(Move.Zp, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Ui], newFaces[Li])
            assert.notDeepEqual(oldFaces[Ui], newFaces[Ui])
        }));
        it('Z2 rotates correctly', createAndMove(Move.Z2, (oldFaces, newFaces) => {
            assert.deepEqual(oldFaces[Ui], newFaces[Di])
            assert.notDeepEqual(oldFaces[Ui], newFaces[Ui])
        }));
    });
});
