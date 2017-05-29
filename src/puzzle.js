import { randomBool, randomInt, randomList } from './tools';
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

const ops = {
    union: function(m1, m2, size) {
        return construct(size, (i, j) => m1[i][j] || m2[i][j]);
    },

    intersection: function(m1, m2, size) {
        return construct(size, (i, j) => m1[i][j] && m2[i][j]);
    },

    difference: function(m1, m2, size) {
        return construct(size, (i, j) => m1[i][j] && !m2[i][j]);
    }
};

function disruptSingle(m, size) {
    const i = randomInt(0, size - 1);
    const j = randomInt(0, size - 1);

    m[i][j] = !m[i][j];
}

function disrupt(m, num, size) {
    for (let i = 0; i < num; i += 1) {
        disruptSingle(m, size);
    }

    return m;
}

function generatePuzzle(isCorrect) {
    const type = randomList(['union', 'intersection', 'difference']);
    const { min, max } = PUZZLE_SIZE[type];
    const size = randomInt(min, max);
    const disruptPower = PUZZLE_DISRUPT_POWER[size];
    const operation = ops[type];

    const m1 = makeMatrix(size);
    const m2 = makeMatrix(size);
    let res = operation(m1, m2, size);

    if (!isCorrect) {
        res = disrupt(res, disruptPower, size);
    }

    return {
        size,
        m1,
        m2,
        res,
        type
    };
}

export default function() {
    const isCorrect = randomBool();

    return {
        isCorrect,
        data: generatePuzzle(isCorrect)
    };
}
