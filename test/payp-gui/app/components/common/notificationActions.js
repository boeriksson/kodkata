import context from 'context';
import {keyExists} from './translationActions';
import log from './utils/log';

export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';
export const GENERIC_ERROR_MESSAGE_KEY = 'paycashierclient.common.error.genericException';

function getTranslationKeys(msg) { // Todo: simplify when translations have been reworked
    let titleKey;
    let messageKey;
    
    if (msg.titleKey) {
        if (keyExists(msg.titleKey)) {
            titleKey = msg.titleKey;
        } else {
            log.error(`Title key provided but does not exist: ${msg.titleKey}`);
        }
    }
    
    if (msg.messageKey) {
        if (keyExists(msg.messageKey)) {
            messageKey = msg.messageKey;
        } else if (keyExists(`${msg.messageKey}.text`)) {
            messageKey = `${msg.messageKey}.text`;
            if (!titleKey && keyExists(`${msg.messageKey}.title`)) {
                titleKey = `${msg.messageKey}.title`;
            }
        }
    }
    if (!messageKey) {
        if (keyExists(`${context.methodKey}.error.genericException.text`)) {
            messageKey = `${context.methodKey}.error.genericException.text`;
            if (keyExists(`${context.methodKey}.error.genericException.title`)) {
                titleKey = `${context.methodKey}.error.genericException.title`;
            }
        } else if (keyExists(`${context.methodKey}.error.genericException`)) {
            messageKey = `${context.methodKey}.error.genericException`;
        } else {
            messageKey = GENERIC_ERROR_MESSAGE_KEY;
        }
        log.error(`Message key does not exist: ${msg.messageKey}, will go for ${messageKey}`);
    }
    
    if (!keyExists(messageKey)) {
        log.error(`Translation for message key not found: ${messageKey}`);
        messageKey = undefined;
    }
    
    return {
        titleKey,
        messageKey
    };
}

export function notify(msg, notClosable) {
    let stringMsg = msg;
    if (typeof msg !== 'string') {
        const {titleKey, messageKey} = getTranslationKeys(msg);
        
        if (messageKey) {
            return {
                type: ERROR_MESSAGE,
                notClosable: msg.notClosable || notClosable || false,
                titleKey,
                messageKey
            };
        }
        stringMsg = `${msg.messageKey} (no translation found)`;
    }
    
    // Just a string, no translation.. (ugly fix mode)
    return {
        type: ERROR_MESSAGE,
        notClosable: notClosable || false,
        titleKey: undefined,
        messageKey: undefined,
        message: stringMsg
    };
}

export function closeMessage(id) {
    return {
        type: CLOSE_MESSAGE,
        id
    };
}

export function clearMessages() {
    return {
        type: CLEAR_MESSAGES
    };
}

export default {
    notify,
    closeMessage,
    clearMessages
};
