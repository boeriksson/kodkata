import {
    INIT_TRANSLATIONS,
    translate
} from './translationActions';

export default function translationReducer(state = { translate }, action) {
    switch (action.type) {
        case INIT_TRANSLATIONS: {
            const translations = action.translations;
            return {
                ...state,
                translations
            };
        }
        default:
            return state;
    }
}
