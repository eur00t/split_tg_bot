import { SWITCH_SECTION } from '../actionTypes';

const INITIAL_UI_STATE = {
    section: 'highScores'
};

export default (state = INITIAL_UI_STATE, action) => {
    switch (action.type) {
        case SWITCH_SECTION:
            return {
                ...state,
                section: action.name
            };
        default:
            return state;
    }
};
