import { randomBool } from './tools';

function generatePuzzle(isCorrect) {}

export default function () {
    const isCorrect = randomBool();

    return {
        isCorrect,
        data: generatePuzzle(isCorrect)
    };
}
