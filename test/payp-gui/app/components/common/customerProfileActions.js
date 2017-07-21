import UAParser from 'ua-parser-js';
import webApi from './utils/webApi';
import { getFormatsByCustomerProfile, formatDate } from './utils/formats';
import { notify } from './notificationActions';
import { translate } from './translationActions';
import iovationActions from './iovationActions';

import amountFormatting from './utils/amountFormatting';
import log from './utils/log';

export const CUSTOMER_PROFILE_FETCHING = 'CUSTOMER_PROFILE_FETCHING';
export const CUSTOMER_PROFILE_RECEIVED = 'CUSTOMER_PROFILE_RECEIVED';
export const USER_CHANGED_FUNDS_PROTECTION = 'USER_CHANGED_FUNDS_PROTECTION';
export const UNRECOVERABLE_ERROR = 'UNRECOVERABLE_ERROR';

function fetching() {
    return {
        type: CUSTOMER_PROFILE_FETCHING
    };
}

function checkIfMobileApp() {
    const parser = new UAParser();
    const osName = parser.getOS().name;
    const browserName = parser.getBrowser().name;

    return isIOSApp(osName, browserName) || isAndroidApp(osName, browserName);
}

function isIOSApp(osName, browserName) {
    return osName === 'iOS' && browserName.toLowerCase().indexOf('safari') < 0;
}

function isAndroidApp(osName, browserName) {
    const WEB_VIEW_BROWSER_NAME = 'Chrome WebView';
    const ANDROID_BROWSER_NAME = 'Android Browser';  // To detect old WebView versions.
    
    return osName === 'Android' && (browserName === WEB_VIEW_BROWSER_NAME || browserName === ANDROID_BROWSER_NAME);
}

function customerProfileReceived(cProfile) {
    const customerProfile = cProfile;
    customerProfile.format = getFormatsByCustomerProfile(customerProfile);
    customerProfile.isMobileApp = checkIfMobileApp();
    return {
        type: CUSTOMER_PROFILE_RECEIVED,
        customerProfile
    };
}

function loadCustomerProfile() {
    return (dispatch) => {
        dispatch(fetching());
        return webApi.getJSON('/paymentmethods/external-api/customer-profile')
            .then((customerProfile) => {
                dispatch(customerProfileReceived(customerProfile));
                dispatch(iovationActions.loadIovationScript(customerProfile));
            })
            .catch((errorObj) => {
                dispatch(notify(errorObj));
                if (errorObj.message) {
                    console.error(errorObj);
                }
            });
    };
}

function userChangeFundsProtection(acceptedFundsProtection) {
    return {
        type: USER_CHANGED_FUNDS_PROTECTION,
        acceptedFundsProtection
    };
}

export function unrecoverableError(dispatch, error) {
    let errorJson = 'n/a';
    const messageKey = error.messageKey || 'paycashierclient.common.generalError';
    try {
        errorJson = JSON.stringify(error);
    } catch (e) { } // eslint-disable-line no-empty
    log.error(`Error in withdrawal-/depositActions: ${errorJson}`);
    dispatch(notify({ messageKey }));
    dispatch({
        type: UNRECOVERABLE_ERROR
    });
}

export const getRGDepositLimitMessage = (customerProfile) => {
    let { limitDays, validUntil } = customerProfile.depositLimit;
    const { limit } = customerProfile.depositLimit;
    
    validUntil = formatDate(validUntil);
    limitDays = limitDays === 1
        ? `24 ${translate('paycashierclient.date.hours')}`
        : `${limitDays} ${translate('paycashierclient.date.days')}`;
    
    return translate('paycashierclient.depositLimitBlock', {
        amount: amountFormatting.toString(limit),
        validUntil,
        period: limitDays
    });
};

export default {
    loadCustomerProfile,
    userChangeFundsProtection
};
