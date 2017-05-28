import fetch from 'isomorphic-fetch';

export function apiRequest(method, body) {
    return fetch(`./${method}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomBool() {
    const num = randomInt(0, 1);

    if (num === 1) {
        return true;
    } else {
        return false;
    }
}
