import {
    IOVATION_LOAD
} from './iovationActions';

export default function iovationReducer(state = {}, { type, data }) {
    switch (type) {
        case IOVATION_LOAD: {
            return {
                ...state,
                data
            };
        }
        default:
            return state;
    }
}
