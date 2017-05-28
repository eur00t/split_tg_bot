import {
    REQUEST_HIGH_SCORES_START,
    REQUEST_HIGH_SCORES_FINISH,
    RECEIVE_HIGH_SCORES
} from '../actionTypes';

const INITIAL_HIGH_SCORES_STATE = {
    data: [],
    loading: false
};

export default (state = INITIAL_HIGH_SCORES_STATE, action) => {
    switch (action.type) {
        case REQUEST_HIGH_SCORES_START:
            return {
                ...state,
                loading: true
            };

        case REQUEST_HIGH_SCORES_FINISH:
            return {
                ...state,
                loading: false
            };

        case RECEIVE_HIGH_SCORES:
            return {
                ...state,
                data: action.data
            };

        default:
            return state;
    }
};
