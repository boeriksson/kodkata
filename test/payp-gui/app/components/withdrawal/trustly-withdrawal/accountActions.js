import withdrawalActions from '../common/withdrawalActions';
import webApi from '../../common/utils/webApi';
import { notify, clearMessages } from '../../common/notificationActions';
import log from '../../common/utils/log';

export const SELECT_ACCOUNT_STARTED = 'SELECT_ACCOUNT_STARTED';
export const STATUS_POLL_FAILED = 'STATUS_POLL_FAILED';
export const SET_SELECT_ACCOUNT_URL = 'SET_SELECT_ACCOUNT_URL';
export const WAITING_FOR_ACC = 'WAITING_FOR_ACC';
export const ACC_RECEIVED = 'ACC_RECEIVED';
export const CANCEL_REDIRECT = 'CANCEL_REDIRECT';

const { module } = config; // eslint-disable-line no-undef
const withdrawalReqUrl = `/${module}/external-api/withdrawal/withdrawal-request`;
let timer;
const pollFrequency = 3000;

function selectAccountStarted() {
    return {
        type: SELECT_ACCOUNT_STARTED
    };
}

function cancelRedirect() {
    return (dispatch) => {
        dispatch(notify({ messageKey: 'trustly-withdrawal.accountIntegration.aborted' }));
        dispatch({
            type: CANCEL_REDIRECT
        });
    };
}

function selectAccount() {
    return (dispatch) => {
        dispatch(clearMessages());
        dispatch(selectAccountStarted());
    };
}

function statusPollFailed(errorKey, dispatch) {
    dispatch(notify({ messageKey: errorKey }));
    return {
        type: STATUS_POLL_FAILED,
        reason: errorKey
    };
}

function accReceived() {
    return {
        type: ACC_RECEIVED
    };
}

function checkForAccount(data, withdrawalRef, dispatch) {
    console.log('checkForAccount data: ', data); // eslint-disable-line no-console
    if (data.bankAccount && data.accountId) {
        dispatch(accReceived());
        dispatch(withdrawalActions.addBankAccount(data.bankAccount, data.accountId, data.bankName));
    } else if (data.status === 'CANCELED') {
        dispatch(statusPollFailed(data.reasonKey || 'paycashierclient.common.generalError', dispatch));
    } else {
        if (timer) clearTimeout(timer);
        timer = window.setTimeout(() =>
            requestStatusPoll(withdrawalRef, dispatch), pollFrequency); // eslint-disable-line no-use-before-define
    }
}

function requestStatusPoll(withdrawalRef, dispatch) {
    webApi.getJSON(`${withdrawalReqUrl}/${withdrawalRef}`)
        .then((data) => {
            checkForAccount(data, withdrawalRef, dispatch);
        }, (err) => {
            log.error(`Requeststatuspoll failed while getting bankAccount: ${JSON.stringify(err)}`);
            dispatch(statusPollFailed('paycashierclient.common.generalError', dispatch));
        });
}

function waitingForAcc() {
    return {
        type: WAITING_FOR_ACC
    };
}

function redirectReturn() {
    return (dispatch, getState) => {
        dispatch(waitingForAcc());
        return requestStatusPoll(getState().withdrawal.withdrawalForm.withdrawalRef, dispatch);
    };
}

function setSelectAccountUrl(selectAccountUrl) {
    return {
        type: SET_SELECT_ACCOUNT_URL,
        selectAccountUrl
    };
}

function getSelectAccountUrl(withdrawal) {
    return (dispatch) => webApi.getJSON(
            `/${module}/external-api/withdrawal/select-account-url/${withdrawal.withdrawalForm.withdrawalRef}`)
            .then((data) => {
                if (data.href) {
                    dispatch(setSelectAccountUrl(data.href));
                } else {
                    log.error('select-account-url href property missing');
                    dispatch(notify({ messageKey: 'paycashierclient.common.generalError' }));
                }
            }, (err) => {
                log.error(`select-account-url error getting href: ${JSON.stringify(err)}`);
                dispatch(notify({ messageKey: 'paycashierclient.common.generalError' }));
            });
}

export default {
    selectAccount,
    getSelectAccountUrl,
    redirectReturn,
    cancelRedirect
};
