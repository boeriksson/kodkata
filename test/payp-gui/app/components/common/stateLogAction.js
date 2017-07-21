import { logError } from './utils/ErrorLogger';

export const STATE_CHANGE = 'STATE_CHANGE';

export function logState(action) {
    const saveAction = action;
    if (action.type === 'INIT_TRANSLATIONS') { // Translations are too much data to save..
        saveAction.translations = {};
    }
    return {
        type: STATE_CHANGE,
        action: saveAction
    };
}

export function logErrorWithState(msg, url, line, col) {
    return (dispatch, getState) => {
        const trimmedState = getState();
        delete trimmedState.translations;
        logError(msg, url, line, col, JSON.stringify(trimmedState));
    };
}
