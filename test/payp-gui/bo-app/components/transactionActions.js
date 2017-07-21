import webApi from '../utils/webApi';

export const GET_DEPOSIT_DETAILS_STARTED = 'GET_DEPOSIT_DETAILS_STARTED';
export const GET_DEPOSIT_DETAILS_COMPLETED = 'GET_DEPOSIT_DETAILS_COMPLETED';
export const GET_DEPOSIT_DETAILS_FAILED = 'GET_DEPOSIT_DETAILS_FAILED';
export const GET_WITHDRAWAL_DETAILS_STARTED = 'GET_WITHDRAWAL_DETAILS_STARTED';
export const GET_WITHDRAWAL_DETAILS_COMPLETED = 'GET_WITHDRAWAL_DETAILS_COMPLETED';
export const GET_WITHDRAWAL_DETAILS_FAILED = 'GET_WITHDRAWAL_DETAILS_FAILED';
export const GET_CUSTOMER_REQUESTS_STARTED = 'GET_CUSTOMER_REQUESTS_STARTED';
export const GET_CUSTOMER_REQUESTS_COMPLETED = 'GET_CUSTOMER_REQUESTS_COMPLETED';
export const GET_CUSTOMER_REQUESTS_FAILED = 'GET_CUSTOMER_REQUESTS_FAILED';

function getDepositDetailsStarted() {
    return {
        type: GET_DEPOSIT_DETAILS_STARTED
    };
}

function getDepositDetailsCompleted(deposit) {
    return {
        type: GET_DEPOSIT_DETAILS_COMPLETED,
        deposit
    };
}

function getDepositDetailsFailed(error) {
    return {
        type: GET_DEPOSIT_DETAILS_FAILED,
        error
    };
}

function getDepositDetails(reference) {
    return (dispatch) => {
        dispatch(getDepositDetailsStarted());
    
        webApi.getJSON(`/backoffice-proxy/${config.module}/internal-api/deposits/deposit-details/${reference}`)
            .then((data) => {
                dispatch(getDepositDetailsCompleted(data));
            })
            .catch((e) => {
                dispatch(getDepositDetailsFailed(e.message));
            });
    };
}

function getWithdrawalDetailsStarted() {
    return {
        type: GET_WITHDRAWAL_DETAILS_STARTED
    };
}

function getWithdrawalDetailsCompleted(withdrawal) {
    return {
        type: GET_WITHDRAWAL_DETAILS_COMPLETED,
        withdrawal
    };
}

function getWithdrawalDetailsFailed(error) {
    return {
        type: GET_WITHDRAWAL_DETAILS_FAILED,
        error
    };
}

function getWithdrawalDetails(reference) {
    return (dispatch) => {
        dispatch(getWithdrawalDetailsStarted());
    
        webApi.getJSON(`/backoffice-proxy/${config.module}/internal-api/withdrawals/withdrawal-details/${reference}`)
            .then((data) => {
                dispatch(getWithdrawalDetailsCompleted(data));
            })
            .catch((e) => {
                dispatch(getWithdrawalDetailsFailed(e.message));
            });
    };
}

function getCustomerDepositRequests(customerId, startDate) {
    return (dispatch) => {
        dispatch(getCustomerRequestsStarted());
    
        webApi.getJSON(`/backoffice-proxy/${config.module}/internal-api/deposits/deposit-for-customer/${customerId}/${startDate}`)  // eslint-disable-line
            .then((data) => {
                const ss = 'requestTrackingDepositRequestResources';
                dispatch(getCustomerRequestsCompleted(data[ss]));
            })
            .catch((e) => {
                dispatch(getCustomerRequestsFailed(e));
            });
    };
}

function getCustomerRequestsStarted() {
    return {
        type: GET_CUSTOMER_REQUESTS_STARTED
    };
}

function getCustomerRequestsCompleted(customerRequests) {
    return {
        type: GET_CUSTOMER_REQUESTS_COMPLETED,
        customerRequests
    };
}

function getCustomerRequestsFailed(error) {
    return {
        type: GET_CUSTOMER_REQUESTS_FAILED,
        error
    };
}

function getCustomerWithdrawalRequests(customerId, startDate) {
    return (dispatch) => {
        dispatch(getCustomerRequestsStarted());
    
        webApi.getJSON(`/backoffice-proxy/${config.module}/internal-api/withdrawals/withdrawal-for-customer/${customerId}/${startDate}`)  // eslint-disable-line
            .then((data) => {
                const ss = 'requestTrackingWithdrawalRequestResources';
                dispatch(getCustomerRequestsCompleted(data[ss]));
            })
            .catch((e) => {
                dispatch(getCustomerRequestsFailed(e));
            });
    };
}

export default {
    getDepositDetails,
    getWithdrawalDetails,
    getCustomerDepositRequests,
    getCustomerWithdrawalRequests
};
