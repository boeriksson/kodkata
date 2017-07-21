import {
    STATE_CHANGE
} from './stateLogAction';

export default function stateLogReducer(state = {}, { type, action }) {
    switch (type) {
        case STATE_CHANGE:
            return [
                ...state,
                action
            ];
        default:
            return state;
    }
}
