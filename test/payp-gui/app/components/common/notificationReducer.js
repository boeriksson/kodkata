import {
    ERROR_MESSAGE,
    CLEAR_MESSAGES,
    CLOSE_MESSAGE
} from './notificationActions';

function getNewMessageId(state) {
    let ix = 0;
    state.forEach((msg) => {
        ix = msg.id > ix ? msg.id : ix;
    });
    return ++ix;
}

export default function notificationReducer(state = [], {
    type,
    notClosable,
    titleKey,
    messageKey,
    message,
    id
}) {
    switch (type) {
        case ERROR_MESSAGE:
            return [
                // ...state, -> For now, there should be only one notification
                {
                    id: getNewMessageId(state),
                    type,
                    notClosable,
                    titleKey,
                    messageKey,
                    message
                }
            ];
        case CLEAR_MESSAGES:
            return [];
        case CLOSE_MESSAGE:
            return state.filter((msg) => msg.id !== id);
        default:
            return state;
    }
}
