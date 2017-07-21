import {
    SELECT_ACCOUNT_STARTED,
    SET_SELECT_ACCOUNT_URL,
    STATUS_POLL_FAILED,
    WAITING_FOR_ACC,
    ACC_RECEIVED,
    CANCEL_REDIRECT
} from './accountActions';

export default function withdrawalReducer(state = {
    status: 'DEFAULT'
}, {
    type,
    selectAccountUrl
}) {
    switch (type) {
        case SELECT_ACCOUNT_STARTED:
            return {
                ...state,
                status: 'IFRAME'
            };
        case SET_SELECT_ACCOUNT_URL:
            return {
                ...state,
                selectAccountUrl
            };
        case WAITING_FOR_ACC:
            return {
                ...state,
                status: 'SPINNER'
            };
        case ACC_RECEIVED:
            return {
                ...state,
                status: 'DEFAULT'
            };
        case CANCEL_REDIRECT:
            return {
                ...state,
                status: 'DEFAULT'
            };
        case STATUS_POLL_FAILED:
            return {
                status: 'DEFAULT'
            };
        default:
            return state;
    }
}
