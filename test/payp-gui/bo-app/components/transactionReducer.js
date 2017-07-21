import {
    GET_DEPOSIT_DETAILS_STARTED,
    GET_DEPOSIT_DETAILS_COMPLETED,
    GET_DEPOSIT_DETAILS_FAILED,
    GET_WITHDRAWAL_DETAILS_STARTED,
    GET_WITHDRAWAL_DETAILS_COMPLETED,
    GET_WITHDRAWAL_DETAILS_FAILED,
    GET_CUSTOMER_REQUESTS_STARTED,
    GET_CUSTOMER_REQUESTS_COMPLETED,
    GET_CUSTOMER_REQUESTS_FAILED
} from './transactionActions';

export default function transactionReducer(state = {
    failed: false
}, {
    type,
    deposit,
    withdrawal,
    customerRequests,
    error
}) {
    switch (type) {
        case GET_DEPOSIT_DETAILS_STARTED:
        case GET_WITHDRAWAL_DETAILS_STARTED:
        case GET_CUSTOMER_REQUESTS_STARTED:
            return {
                ...state,
                isSubmitting: true
            };
        case GET_DEPOSIT_DETAILS_COMPLETED:
            return {
                ...state,
                deposit,
                notFound: false,
                isSubmitting: false
            };
        case GET_DEPOSIT_DETAILS_FAILED:
            return {
                ...state,
                failed: true,
                notFound: true,
                isSubmitting: false,
                error
            };
        case GET_WITHDRAWAL_DETAILS_COMPLETED:
            return {
                ...state,
                withdrawal,
                notFound: false,
                isSubmitting: false
            };
        case GET_WITHDRAWAL_DETAILS_FAILED:
            return {
                ...state,
                failed: true,
                notFound: true,
                isSubmitting: false,
                error
            };
        case GET_CUSTOMER_REQUESTS_COMPLETED:
            return {
                ...state,
                customerRequests: customerRequests || [],
                isSubmitting: false
            };
        case GET_CUSTOMER_REQUESTS_FAILED:
            return {
                ...state,
                failed: true,
                isSubmitting: false,
                error
            };
        default:
            return state;
    }
}
