import {
    REQUEST_HIGH_SCORES_START,
    REQUEST_HIGH_SCORES_FINISH,
    RECEIVE_HIGH_SCORES,
    SWITCH_SECTION,
    START_GAME,
    FINISH_GAME,
    GAME_TICK,
    GAME_CORRECT_ANSWER,
    GAME_WRONG_ANSWER,
    GAME_CAN_SHARE
} from './actionTypes';

import { apiRequest } from './tools';

export function requestHighScoresStart() {
    return {
        type: REQUEST_HIGH_SCORES_START
    };
}

export function requestHighScoresFinish() {
    return {
        type: REQUEST_HIGH_SCORES_FINISH
    };
}

export function receiveHighScores(data) {
    return {
        type: RECEIVE_HIGH_SCORES,
        data
    };
}

export function requestHighScores(userData) {
    return dispatch => {
        dispatch(requestHighScoresStart());

        apiRequest('getGameHighScores', userData)
            .then(response => response.json())
            .then(
                data => {
                    dispatch(requestHighScoresFinish());
                    dispatch(receiveHighScores(data));
                },
                err => {
                    dispatch(requestHighScoresFinish());
                }
            );
    };
}

export function switchSection(name) {
    return {
        type: SWITCH_SECTION,
        name
    };
}

export function startGame() {
    return dispatch => {
        const id = setInterval(() => {
            dispatch(gameTick());
        }, 1000);

        dispatch(switchSection('game'));
        dispatch({ type: START_GAME, id });
    };
}

export function finishGame(id, score, userData) {
    return dispatch => {
        apiRequest('setScore', { ...userData, score }).then(
            ({ status }) => {
                if (status === 200) {
                    dispatch(gameCanShare(true));
                    dispatch(requestHighScores(userData));
                } else {
                    dispatch(gameCanShare(false));
                }
            },
            () => {
                dispatch(gameCanShare(false));
            }
        );

        clearInterval(id);
        dispatch({ type: FINISH_GAME });
        dispatch(switchSection('gameOver'));
    };
}

export function gameTick() {
    return {
        type: GAME_TICK
    };
}

export function gameCorrectAnswer() {
    return {
        type: GAME_CORRECT_ANSWER
    };
}

export function gameWrongAnswer() {
    return {
        type: GAME_WRONG_ANSWER
    };
}

export function gameCanShare(flag) {
    return {
        type: GAME_CAN_SHARE,
        flag
    };
}
