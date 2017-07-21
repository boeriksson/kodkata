import { notify, clearMessages } from '../../common/notificationActions';
import postToParent from '../../common/utils/postToParent';
import webApi from '../../common/utils/webApi';
import { unrecoverableError } from '../../common/customerProfileActions';
import { translate } from '../../common/translationActions';

export const GET_WITHDRAWAL_FORM_COMPLETED = 'GET_WITHDRAWAL_FORM_COMPLETED';
export const UPDATE_WITHDRAWAL_PROPERTY = 'UPDATE_WITHDRAWAL_PROPERTY';
export const UPDATE_WITHDRAWAL_AMOUNT = 'UPDATE_WITHDRAWAL_AMOUNT';
export const SUBMIT_WITHDRAWAL_STARTED = 'SUBMIT_WITHDRAWAL_STARTED';
export const SUBMIT_WITHDRAWAL_COMPLETED = 'SUBMIT_WITHDRAWAL_COMPLETED';
export const SUBMIT_WITHDRAWAL_STATUS_POLL = 'SUBMIT_WITHDRAWAL_STATUS_POLL';
export const SUBMIT_WITHDRAWAL_FAILED = 'SUBMIT_WITHDRAWAL_FAILED';
export const SUBMIT_WITHDRAWAL_STATUS = 'SUBMIT_WITHDRAWAL_STATUS';
export const SUBMIT_WITHDRAWAL_ABORTED = 'SUBMIT_WITHDRAWAL_ABORTED';
export const SUBMIT_WITHDRAWAL_TIMEOUT = 'SUBMIT_WITHDRAWAL_TIMEOUT';
export const SET_BANK_ACCOUNT = 'SET_BANK_ACCOUNT';
export const ADD_BANK_ACCOUNT = 'ADD_BANK_ACCOUNT';
export const SERVICE_IN_MAINTENANCE_MODE = 'SERVICE_IN_MAINTENANCE_MODE';

const WITHDRAWAL_KEY_PREFIX = context.methodKey + '.';

const {module} = config;  // eslint-disable-line

let timer; // this is poll timer
let timeoutTime = 15 * 60 * 1000; // time used for timing out the withdrawal, i.e. 15 minutes.
let pollFrequency = 1500;
let timerTimeout;
let inWithdrawal = false;  // Will make sure only one withdrawal is done at a time.

export function setConfig(pollFreq, timeoutT) { // Used by unit-tests
    pollFrequency = pollFreq || pollFrequency;
    timeoutTime = timeoutT || timeoutTime;
    clearTimeout(timer);
    clearTimeoutTimer();
    inWithdrawal = false;
}

export function getTimer() {
    return timer;
}

function getWithdrawalFormReceived(withdrawalForm) {
    return {
        type: GET_WITHDRAWAL_FORM_COMPLETED,
        withdrawalForm
    };
}

function clearTimeoutTimer() {
    if (timeoutTime) {
        window.clearTimeout(timerTimeout);
    }
}

function getWithdrawalForm() {
    return (dispatch) => {
        dispatch(checkServiceStatus(() =>
            webApi.getJSON(`/${module}/external-api/withdrawal/withdrawal-request-form/`)
                .then((data) => {
                    if (data.withdrawalRef) {
                        dispatch(getWithdrawalFormReceived(data));
                    } else {
                        unrecoverableError(dispatch, data);
                    }
                })
                .catch((errObj) => {
                    dispatch(notify(getError(errObj)));
                    if (errObj.message) {
                        console.error(errObj);
                    }
                })
        ));
    };
}

export function setAmount(amount) {
    return {
        type: UPDATE_WITHDRAWAL_AMOUNT,
        amount
    };
}

function setWithdrawalProperty(id, value) {
    return {
        type: UPDATE_WITHDRAWAL_PROPERTY,
        property: {
            id,
            value
        }
    };
}

function setBankAccount(bankAccount, accountId) {
    return {
        type: SET_BANK_ACCOUNT,
        bankAccount,
        accountId
    };
}

function addBankAccount(bankAccount, accountId, bankName) {
    return {
        type: ADD_BANK_ACCOUNT,
        bankAccount,
        accountId,
        bankName
    };
}

function submitStarted() {
    return {
        type: SUBMIT_WITHDRAWAL_STARTED
    };
}

function submitTimeout() {
    return {
        type: SUBMIT_WITHDRAWAL_TIMEOUT
    };
}

function submitFailed(error, dispatch) {
    clearTimeoutTimer();
    inWithdrawal = false;
    let reason;
    
    if (typeof error === 'string') {
        reason = error;
    } else {
        reason = error.messageKey;
    }
    dispatch(notify(error));
    
    return {
        type: SUBMIT_WITHDRAWAL_FAILED,
        error: reason
    };
}

function submitWithdrawalStatus(status) {
    return {
        type: SUBMIT_WITHDRAWAL_STATUS,
        status
    };
}

function timePoll(form, dispatch, status) {
    timer = setTimeout(() => {
        requestStatusPoll(form, dispatch); // eslint-disable-line no-use-before-define
    }, pollFrequency);

    if (status) {
        dispatch(submitWithdrawalStatus(status));
    }
}

function submitCompleted(receipt) {
    clearTimeoutTimer();
    return {
        type: SUBMIT_WITHDRAWAL_COMPLETED,
        receipt
    };
}

function requestStatusPoll(form, dispatch) {
    clearTimeout(timer);
    
    webApi.getJSON(`/${module}/external-api/withdrawal/withdrawal-request/${form.withdrawalRef}`)
        .then((data) => {
            if (data.status) {
                switch (data.status) {
                    case 'FAILED':
                        // Signal failed
                        dispatch(submitFailed(
                            {
                                titleKey: WITHDRAWAL_KEY_PREFIX + 'error.title',
                                messageKey: data.reasonKey || 'paycashierclient.common.generalError'
                            }, dispatch));
                        break;
                    case 'INITIATE':
                    case 'VALIDATE':
                    case 'CREATE_WITHDRAWAL':
                    case 'RESERVE_FUNDS':
                    case 'AWAIT_FUNDS':
                        timePoll(form, dispatch, data.status);
                        break;
                    case 'AWAIT_APPROVAL':
                    case 'PAYOUT':
                    case 'CREATE_ORDER':
                    case 'APPROVE':
                    case 'PENDING_PROVIDER':
                    case 'FINALIZE':
                    case 'WITHDRAWAL_SUCCESSFUL':
                    case 'PROVIDER_SUCCESSFUL':
                        if (data.receipt) {
                            dispatch(submitCompleted(data.receipt));
                        } else {
                            timePoll(form, dispatch, data.status);
                        }
                        break;
                    case 'REVERSE':
                    case 'REVERSAL_SUCCESSFUL':
                        dispatch(submitFailed(
                            {
                                titleKey: WITHDRAWAL_KEY_PREFIX + 'error.title',
                                messageKey: data.reasonKey
                            }, dispatch));
                        break;
                    default:
                        dispatch(submitFailed('unknown status', dispatch));
                }
            } else {
                timePoll(form, dispatch);
            }
        }, (error) => {
            handleError(error, dispatch);
        })
        .catch((error) => {
            handleError(error, dispatch);
        });
}

export function submit(withdrawalForm) {
    if (inWithdrawal) {
        return {};
    }
    inWithdrawal = true;
    
    return (dispatch, getState) => {
        dispatch(clearMessages());
        dispatch(submitStarted());
        
        timerTimeout = setTimeout(() => {
            dispatch(notify({ messageKey: `${module}.error.timeout` }));
            dispatch(submitTimeout());
        }, timeoutTime);

        const form = getState().iovation.data ? {
            ...withdrawalForm,
            blackbox: getState().iovation.data
        } : withdrawalForm;
    
        return webApi.postJSON(`/${module}/external-api/withdrawal/withdrawal-request`, form)
            .then(() => {
                inWithdrawal = false;
                timePoll(form, dispatch);
            })
            .catch((error) => {
                handleError(error, dispatch);
            });
    };
}

function handleError(error, dispatch) {
    let errorObj = error;
    if (error.body) {
        errorObj = JSON.parse(error.body);
    }
    dispatch(submitFailed(getError(errorObj), dispatch));
    if (errorObj.message) {
        console.error(errorObj);
    }
}

function getError(error) {
    if (error.messageKey && error.messageKey.trim().length > 0) {
        // Delete any possible pre-translated properties.
        const errObj = error;
        delete errObj.title;
        delete errObj.message;
        return errObj;
    }
    return error.message || error;
}

function postWithdrawalCompleted(withdrawal) {
    const message = {
        type: 'withdrawalCompleted',
        status: 'Requested',
        amount: withdrawal.withdrawalForm.amount.amount,
        currency: withdrawal.withdrawalForm.amount.currencyCode,
        paymentTransactionId: withdrawal.receipt.transactionId,
        transferTransactionId: null
    };
    postToParent(message);
}

function checkServiceStatus(okCallback) {
    return (dispatch) => {
        webApi.getJSON(`/paymentmethods/external-api/get-withdrawal-method/${module}/`)
            .then((data) => {
                if (data.serviceStatus && data.serviceStatus.status === 'MAINTENANCE') {
                    dispatch(notify(translate('paycashierclient.listWithdrawalMethods.maintenance')));
                    dispatch(maintenanceMode());
                } else if (okCallback) {
                    okCallback();
                }
            })
            .catch((errObj) => {
                dispatch(notify(getError(errObj)));
            });
    };
}

function maintenanceMode() {
    return {
        type: SERVICE_IN_MAINTENANCE_MODE
    };
}

export default {
    getWithdrawalForm,
    setWithdrawalProperty,
    setAmount,
    submit,
    postWithdrawalCompleted,
    setBankAccount,
    addBankAccount
};
