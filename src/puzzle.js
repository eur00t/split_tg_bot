import { randomBool, randomInt } from './tools';
import { PUZZLE_SIZE, PUZZLE_DISRUPT_POWER } from './config';

function construct(size, getVal) {
    const m = [];

    for (let i = 0; i < size; i += 1) {
        let row = [];
        m.push(row);

        for (let j = 0; j < size; j += 1) {
            row.push(getVal(i, j));
        }
    }

    return m;
}

function makeMatrix(size) {
    return construct(size, () => randomBool());
}

function sum(m1, m2, size) {
    return construct(size, (i, j) => m1[i][j] || m2[i][j]);
}

function disruptSingle(m) {
    const i = randomInt(0, PUZZLE_SIZE - 1);
    const j = randomInt(0, PUZZLE_SIZE - 1);

    m[i][j] = !m[i][j];
}

function disrupt(m, num) {
    for (let i = 0; i < num; i += 1) {
        disruptSingle(m);
    }

    return m;
}

function generatePuzzle(isCorrect) {
    const m1 = makeMatrix(PUZZLE_SIZE);
    const m2 = makeMatrix(PUZZLE_SIZE);
    let res = sum(m1, m2, PUZZLE_SIZE);

    if (!isCorrect) {
        res = disrupt(res, PUZZLE_DISRUPT_POWER)
    }

    return {
        size: PUZZLE_SIZE,
        m1, m2, res
    };
}

export default function() {
    const isCorrect = randomBool();

    return {
        isCorrect,
        data: generatePuzzle(isCorrect)
    };
}
