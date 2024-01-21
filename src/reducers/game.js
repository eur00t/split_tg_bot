import {
    START_GAME,
    FINISH_GAME,
    GAME_TICK,
    GAME_CORRECT_ANSWER,
    GAME_WRONG_ANSWER,
    GAME_CAN_SHARE
} from '../actionTypes';
import { MAX_COUNTDOWN } from '../config';

import getPuzzle from '../puzzle';

const INITIAL_GAME_STATE = {
    userData:
        TelegramGameProxy.initParams.data !== undefined
            ? JSON.parse(atob(TelegramGameProxy.initParams.data))
            : {},
    active: false,
    countdown: 0,
    score: 0,
    puzzle: null,
    id: null,
    canShare: false,
    wrongAnswers: []
};

export default (state = INITIAL_GAME_STATE, action) => {
    let countdown;

    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                active: true,
                countdown: MAX_COUNTDOWN,
                score: 0,
                puzzle: getPuzzle(),
                id: action.id,
                canShare: false,
                wrongAnswers: []
            };

        case GAME_TICK:
            if (!state.active) {
                return state;
            }

            countdown = Math.max(state.countdown - 1, 0);

            return {
                ...state,
                puzzle: countdown === 0 ? null : state.puzzle,
                countdown
            };

        case GAME_CORRECT_ANSWER:
            if (!state.active) {
                return state;
            }

            return {
                ...state,
                score: state.score + 1,
                puzzle: getPuzzle(),
                countdown: Math.min(state.countdown + 3, MAX_COUNTDOWN)
            };

        case GAME_WRONG_ANSWER:
            if (!state.active) {
                return state;
            }

            countdown = Math.max(state.countdown - 5, 0);

            return {
                ...state,
                wrongAnswers: [...state.wrongAnswers, state.puzzle],
                puzzle: countdown === 0 ? null : getPuzzle(),
                countdown
            };

        case FINISH_GAME:
            return {
                ...state,
                active: false
            };

        case GAME_CAN_SHARE:
            return {
                ...state,
                canShare: action.flag
            };

        default:
            return state;
    }
};
