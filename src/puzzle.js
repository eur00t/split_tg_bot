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

function disruptSingle(disruptions, m, size) {
    let i, j;

    do {
        i = randomInt(0, size - 1);
        j = randomInt(0, size - 1);
    } while (disruptions[`${i}-${j}`]);

    m[i][j] = !m[i][j];

    return [i, j];
}

function disrupt(m, num, size) {
    const disruptions = {};
    for (let i = 0; i < num; i += 1) {
        const [i_, j] = disruptSingle(disruptions, m, size);
        disruptions[`${i_}-${j}`] = true;
    }

    return { res: m, disruptions };
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
    let disruptions = [];

    if (!isCorrect) {
        ({ res, disruptions } = disrupt(res, disruptPower, size));
    }

    return {
        size,
        m1,
        m2,
        res,
        type,
        disruptions
    };
}

export default function() {
    const isCorrect = randomBool();

    return {
        isCorrect,
        data: generatePuzzle(isCorrect)
    };
}
