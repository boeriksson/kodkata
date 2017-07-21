/* global window */

import context from 'context';
import webApi from '../../common/utils/webApi';
import { notify } from '../../common/notificationActions';
import { translate } from '../../common/translationActions';
import log from '../../common/utils/log';
import { unrecoverableError } from '../../common/customerProfileActions';

export const GET_DEPOSIT_FORM_STARTED = 'GET_DEPOSIT_FORM_STARTED';
export const GET_DEPOSIT_FORM_COMPLETED = 'GET_DEPOSIT_FORM_COMPLETED';
export const SERVICE_IN_MAINTENANCE_MODE = 'SERVICE_IN_MAINTENANCE_MODE';
export const SELECT_BANK = 'SELECT_BANK';
export const SELECT_PAYER_BANK = 'SELECT_PAYER_BANK';
export const AMOUNT_INPUT = 'AMOUNT_INPUT';
export const SUBMIT_DEPOSIT_STARTED = 'SUBMIT_DEPOSIT_STARTED';
export const SUBMIT_DEPOSIT_COMPLETED = 'SUBMIT_DEPOSIT_COMPLETED';
export const SUBMIT_DEPOSIT_FAILED = 'SUBMIT_DEPOSIT_FAILED';
export const OPEN_POPUP = 'OPEN_POPUP';
export const CLOSE_POPUP = 'CLOSE_POPUP';
export const UPDATE_POPUP = 'UPDATE_POPUP';
export const UPDATE_IFRAME = 'UPDATE_IFRAME';
export const ACTIVATE_SPINNER = 'ACTIVATE_SPINNER';

const { module } = config; // eslint-disable-line no-undef
let initialPollFreq = 1500;
let pollFrequency = 5000;
let interactionTimeout = 45 * 60 * 1000; // 45 minutes
let transactionTimeout = 2 * 60 * 1000; // TWO MINUTES

const IS_TRUSTLY_DEPOSIT = context.methodKey === 'trustly-deposit';
export const IS_SIIRTO_DEPOSIT = context.methodKey === 'entercash-siirto-deposit';
export const DEPOSIT_KEY_PREFIX = context.methodKey + (IS_TRUSTLY_DEPOSIT ? '' : '.deposit') + '.';
const REDIRECT_TIMEOUT = 60000;

function getDepositReqFormUrl() { // This is due to entercash and siirto using the same bundle
    switch (context.methodKey) {
        case 'entercash-siirto-deposit':
            return `/${module}/external-api/entercash-siirto-deposit/deposit/deposit-request-form/`;
        case 'entercash':
            return `/${module}/external-api/entercash/deposit/deposit-request-form/`;
        default:
            return `/${module}/external-api/deposit/deposit-request-form/`;
    }
}

const depositReqUrl = `/${module}/external-api/deposit/deposit-request`;
const depositReqFormUrl = getDepositReqFormUrl();

let timer;
let timeoutStart; // Will hold the timestamp of when we start polling
let timeoutLength; // current timeout: interaction OR transaction above.
let inDeposit = false; // Will make sure only one deposit is done at a time

export function setConfig(iPollFreq, pollFreq, interactionT, transactionT) { // Used by unit-tests
    initialPollFreq = iPollFreq || initialPollFreq;
    pollFrequency = pollFreq || pollFrequency;
    interactionTimeout = interactionT || interactionTimeout;
    transactionTimeout = transactionT || transactionTimeout;
    clearTimeout(timer);
    inDeposit = false;
}

export function getTimer() {
    return timer;
}

function getRedirectContent() {
    const redirectContentData = {
        spinner: '/dist/images/ajax-loader.gif',
        message: translate('paycashierclient.common.bank.deposit.redirectingMessage'),
        subMessage: translate('paycashierclient.common.bank.deposit.redirectingSubMessage'),
        linkMessage: translate('paycashierclient.common.bank.deposit.redirectingLinkMessage')
    };
    
    if (context.themeName === 'maria' || context.themeName === 'maria2') {
        redirectContentData.spinner = '/dist/images/preloader.gif';
        redirectContentData.style = {backgroundColor: '#14121c', color: '#595b83'};
    } else if (context.themeName === 'highroller') {
        redirectContentData.style = {backgroundColor: '#303030', color: '#999999'};
    }
    return redirectContentData;
}

function openPopup(depositRef) {
    window.redirectContent = getRedirectContent;
    const pwindow = window.open(`/${config.module}/external-callback/prepare-redirect/${depositRef}`,
        depositRef, 'location=0,status=1,scrollbars=1,width=620,height=720');
    return {
        type: OPEN_POPUP,
        popup: {
            name: depositRef,
            window: pwindow
        },
        spinner: {
            active: true,
            key: `${DEPOSIT_KEY_PREFIX}finishPopUpFlow`
        }
    };
}

function updatePopup(data, deposit) {
    const url = data.url;
    const depositRef = deposit.depositRef;
    
    if (deposit.status && deposit.status !== 'POPUP') {
        window.gotoLocation = data.url;
    
        setTimeout(() => {
            if (window.gotoLocation) {
                // This will be blocked by the popup blocker, but user most certainly will get a warning.
                window.open(url, depositRef, 'location=0,status=1,scrollbars=1,width=620,height=720');
            }
        }, REDIRECT_TIMEOUT);
    }
    
    return {
        type: UPDATE_POPUP,
        url,
        spinner: {
            active: true,
            key: 'paycashierclient.common.bank.deposit.connectingToProvider'
        }
    };
}

function updateIframe(data) {
    const url = data.url;

    return {
        type: UPDATE_IFRAME,
        url
    };
}

function closePopup() {
    return {
        type: CLOSE_POPUP
    };
}

function activateSpinner() {
    return {
        type: ACTIVATE_SPINNER
    };
}

function getDepositFormStarted() {
    return {
        type: GET_DEPOSIT_FORM_STARTED
    };
}

function getDepositFormReceived(depositForm) {
    return {
        type: GET_DEPOSIT_FORM_COMPLETED,
        depositForm
    };
}

function maintenanceMode() {
    return {
        type: SERVICE_IN_MAINTENANCE_MODE
    };
}

function getDepositForm() {
    return (dispatch) => {
        dispatch(checkServiceStatus(() => {
            dispatch(getDepositFormStarted());
            webApi.getJSON(depositReqFormUrl)
                .then((data) => {
                    if (data.depositRef) {
                        dispatch(getDepositFormReceived(data));
                    } else {
                        unrecoverableError(dispatch, data);
                    }
                })
                .catch((errObj) => {
                    dispatch(notify(getError(errObj)));
                    if (errObj.message) {
                        console.error(errObj);
                    }
                });
        }));
    };
}

function selectBank(selectedBankId) {
    return {
        type: SELECT_BANK,
        selectedBankId
    };
}

function selectPayerBank(selectedPayerBankId) {
    return {
        type: SELECT_PAYER_BANK,
        selectedPayerBankId
    };
}

function amountInput(amount, isQuickButtonClicked) {
    return {
        type: AMOUNT_INPUT,
        amount,
        isQuickButtonClicked
    };
}

function submitDepositStarted() {
    return {
        type: SUBMIT_DEPOSIT_STARTED,
        isSubmitting: true
    };
}

function submitDepositFailed(error, dispatch, iframe) {
    if (!iframe) {
        dispatch(closePopup());
    }
    inDeposit = false;
    let reason;
    
    if (typeof error === 'string') {
        reason = error;
    } else {
        reason = error.messageKey;
    }
    dispatch(notify(error));
    
    return {
        type: SUBMIT_DEPOSIT_FAILED,
        reason,
        isSubmitting: false
    };
}

function submitDepositCompleted(receipt, dispatch, iframe) {
    if (!iframe) {
        dispatch(closePopup());
    }
    inDeposit = false;
    return {
        type: SUBMIT_DEPOSIT_COMPLETED,
        receipt,
        isSubmitting: false
    };
}

function buildForm(depositForm, getState) {
    const form = {
        amount: depositForm.amount,
        selectedBankId: depositForm.selectedBankId,
        selectedPayerBankId: depositForm.selectedPayerBankId,
        depositRef: depositForm.depositRef,
        parentDomain: context.parentDomain,
        isMobileApp: getState().customerProfile.isMobileApp,
        methodKey: context.methodKey
    };
    if (getState().iovation.data) {
        form.blackbox = getState().iovation.data;
    }
    return form;
}

function setTimeoutTo(delay) {
    timeoutStart = new Date();
    timeoutLength = delay;
}

export function getTimeoutLength() {
    return timeoutLength;
}

function handleError(error, dispatch, iframe) {
    let errorObj = error;
    if (error.body) {
        errorObj = JSON.parse(error.body);
    }
    dispatch(submitDepositFailed(getError(errorObj), dispatch, iframe));
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

function handleStatus(data, depositRef, dispatch, getState, bounceBack, iframe) {
    switch (data.status) {
        case 'FAILED':
        case 'FAILED_FRONTEND_PENDING_EC':
            dispatch(submitDepositFailed(
                {
                    titleKey: 'paycashierclient.common.bank.deposit.error.title',
                    messageKey: data.reasonKey || 'paycashierclient.common.generalError'
                }, dispatch, iframe));
            break;
        case 'EXECUTE':
        case 'PENDING_EC_APPROVAL':
        case 'PENDING_TRANSACTION_ACCEPTANCE':
        case 'PENDING_TRANSACTION_RESPONSE_DELAYED':
            setTimeoutTo(transactionTimeout);
        case 'VALIDATE':
        case 'CREATE_ORDER':
        case 'PENDING_EC':
        case 'PENDING_PROVIDER':
            if ((Date.now() - timeoutStart.getTime()) > timeoutLength) {
                dispatch(submitDepositFailed(
                    {
                        titleKey: 'paycashierclient.thirdparty.timeout.title',
                        messageKey: 'paycashierclient.thirdparty.timeout.message'
                    }, dispatch, iframe));
            } else {
                const { deposit, customerProfile: { isMobileApp } } = getState();
                if (isMobileApp && !bounceBack && data.url && !iframe) {
                    top.location.href = `${data.url}?openOnWebView=true`;
                } else if (iframe) {
                    dispatch(updateIframe(data));
                } else {
                    dispatch(updatePopup(data, deposit));
                }

                if (timer) clearTimeout(timer);
                timer = window.setTimeout(() => {
                    requestStatusPoll( // eslint-disable-line no-use-before-define
                        { depositRef, iframe }, dispatch, getState, false);
                }, pollFrequency);
            }
            break;
        default:
            log.error(`Unknown status: ${data.status} when polling`);
            throw new Error(`Unknown status: ${data.status} when polling`);
    }
}

function handleSuccess(data, dispatch, iframe) {
    const ONGOING_STATUSES = [
        'PENDING_TRANSACTION_RESPONSE_DELAYED',
        'PENDING_EC_APPROVAL',
        'PENDING_PROVIDER_APPROVAL'
    ];
    const { receipt } = data;
    
    receipt.ongoing = ONGOING_STATUSES.indexOf(data.status) > -1;
    dispatch(submitDepositCompleted(receipt, dispatch, iframe));
}

function requestStatusPoll(depositForm, dispatch, getState, bounceBack = false) {
    const { depositRef, iframe } = depositForm;
    webApi.getJSON(`${depositReqUrl}/${depositRef}`)
        .then((data) => {
            if (data.receipt) {
                handleSuccess(data, dispatch, iframe);
            } else if (data.status) {
                handleStatus(data, depositRef, dispatch, getState, bounceBack, iframe);
            }
        }, (err) => {
            handleError(err, dispatch, iframe);
        });
}

function topWindowBouncedBack(depositRef) {
    setTimeoutTo(interactionTimeout);
    return (dispatch, getState) => {
        requestStatusPoll({ depositRef, iframe: false }, dispatch, getState, true);
    };
}

export function submit(depositForm) {
    if (inDeposit) {
        return {};
    }
    inDeposit = true;
    setTimeoutTo(interactionTimeout);
    return (dispatch, getState) => {
        dispatch(submitDepositStarted());
        
        if (!getState().customerProfile.isMobileApp && !depositForm.iframe) {
            dispatch(openPopup(depositForm.depositRef));
        }
        
        return webApi.postJSON(depositReqUrl, buildForm(depositForm, getState))
            .then(() => setTimeout(() =>
                requestStatusPoll(depositForm, dispatch, getState), initialPollFreq)
            )
            .catch((err) => handleError(err, dispatch));
    };
}

function redirectReturn(depositRef) {
    setTimeoutTo(interactionTimeout);
    return (dispatch, getState) => {
        dispatch(activateSpinner());
        
        requestStatusPoll({ depositRef, iframe: true }, dispatch, getState, false);
    };
}

export function acceptFundsAndProtection(acceptedVersion, cb) {
    if (inDeposit) {
        return {};
    }
    inDeposit = true;
    return (dispatch) => {
        const postBody = {
            'notificationVersion': acceptedVersion,
            'methodKey': context.methodKey
        };
        
        return webApi.postJSON('/paymentmethods/external-api/accept-notification', postBody)
            .then(() => {
                inDeposit = false;
                cb();
            }, (error) => {
                log.error('Submit deposit failed (acceptFundsAndProtection failed)!');
                handleError(error, dispatch);
            })
            .catch((error) => {
                handleError(error, dispatch);
            });
    };
}

function checkServiceStatus(okCallback) {
    return (dispatch) => {
        webApi.getJSON(`/paymentmethods/external-api/get-deposit-method/${context.methodKey}`)
            .then((data) => {
                if (data.serviceStatus && data.serviceStatus.status === 'MAINTENANCE') {
                    dispatch(notify(translate('paycashierclient.listDepositMethods.maintenance')));
                    dispatch(maintenanceMode());
                } else if (okCallback) {
                    okCallback();
                }
            })
            .catch((errObj) => {
                dispatch(notify(getError(errObj)));
                dispatch(maintenanceMode());
            });
    };
}

export default {
    getDepositForm,
    selectBank,
    selectPayerBank,
    amountInput,
    submit,
    topWindowBouncedBack,
    redirectReturn,
    acceptFundsAndProtection,
    activateSpinner
};
