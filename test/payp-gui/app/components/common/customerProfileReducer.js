import {
    CUSTOMER_PROFILE_FETCHING,
    CUSTOMER_PROFILE_RECEIVED,
    USER_CHANGED_FUNDS_PROTECTION,
    UNRECOVERABLE_ERROR
} from './customerProfileActions';

export default function customerProfileReducer(state = {
    acceptedFundsProtection: false
}, {
    type,
    customerProfile,
    acceptedFundsProtection
}) {
    switch (type) {
        case CUSTOMER_PROFILE_FETCHING:
            return {
                ...state,
                notLoaded: true
            };
        case CUSTOMER_PROFILE_RECEIVED:
            return {
                ...state,
                ...customerProfile,
                notLoaded: false
            };
        case USER_CHANGED_FUNDS_PROTECTION:
            return {
                ...state,
                acceptedFundsProtection
            };
        case UNRECOVERABLE_ERROR:
            return {
                ...state,
                unrecoverableError: true
            };
        default:
            return state;
    }
}
