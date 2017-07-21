import translations from 'translations';
import context from 'context';

import log from './utils/log';

export const INIT_TRANSLATIONS = 'INIT_TRANSLATIONS';

export const replaceKeyWithSubst = (str, key, subst) =>
    str.replace(new RegExp('{\\s*' + key + '\\s*}', 'i'), subst); // eslint-disable-line

/**
 *  variables: An object with key/values to use for replacing occurances in they translated string
 */
export function translate(key, variables) {
    if (!key) {
        const msg = `TranslationKey is missing (${key})`;
        log.error(msg);
        return '';
    }
    
    const path = key.split('.');
    let hasKey = true;
    let subTree = translations;
    let result = path[path.length - 1];
    for (let i = 0; i < path.length; i++) {
        if (!subTree[path[i]]) {
            hasKey = false;
            break;
        }
        subTree = subTree[path[i]];
    }
    if (hasKey) {
        result = subTree.replace(/\\/g, '\\u005c');
    } else {
        result = `${key}`;
        log.error(`TranslationKey: ${key} not found, locale: ${context.locale}`);
    }

    if (variables) {
        Object.keys(variables).forEach((prop) => result = replaceKeyWithSubst(result, prop, variables[prop])); // eslint-disable-line no-return-assign, max-len
    }

    return result;
}

function getValueByPath(path, subTree) {
    const nodeValue = subTree[path[0]];
    if (!nodeValue) return false;
    return path.length > 1 ? getValueByPath(path.slice(1), nodeValue) : nodeValue;
}

export function keyExists(key) {
    return key ? typeof getValueByPath(key.split('.'), translations) === 'string' : false;
}

export default {
    initTranslations() {
        return {
            type: INIT_TRANSLATIONS,
            translations
        };
    }
};
