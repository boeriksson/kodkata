import { translate } from '../../common/translationActions';
import amountFormatting from '../../common/utils/amountFormatting';
import validateFundsProtection from '../../common/utils/validators/fundsProtection';
import {formatDate} from '../../common/utils/formats';

const claims = {
    minLimit: {
        isValid: false,
        key: 'paycashierclient.deposit.amount.min',
        getAmount: (limit) => limit.min,
        getValidUntil: () => ''
    },
    personalLimit: {
        isValid: false,
        key: 'paycashierclient.depositLimitInfo',
        getAmount: (limit) => limit.personal,
        getValidUntil: (customerProfile) => customerProfile.depositLimit.validUntil
    },
    maxLimit: {
        isValid: false,
        key: 'paycashierclient.deposit.amount.max',
        getAmount: (limit) => limit.max,
        getValidUntil: () => ''
    },
    valid: {
        isValid: true,
        key: 'paycashierclient.deposit.amount.min',
        getAmount: (limit) => limit.min,
        getValidUntil: () => ''
    }
};

function getLimit(deposit, customerProfile) {
    const limit = {
        min: deposit.settings.minLimit.amount,
        max: deposit.settings.maxLimit.amount
    };
    const { depositLimit } = customerProfile;
    if (depositLimit && depositLimit.maxAllowed) {
        const maxAllowedAmount = depositLimit.maxAllowed.amount;
        limit.personal = typeof maxAllowedAmount !== 'number' ? parseFloat(maxAllowedAmount) : maxAllowedAmount;
    }
    return limit;
}

function limitCheck(deposit, customerProfile, disregardNull) {
    const amount = deposit.amount.amount;
    const limit = getLimit(deposit, customerProfile);

    if (limit.min
        && amount < limit.min
        && (disregardNull ? true : amount !== 0)) {
        return claims.minLimit;
    } else if (limit.personal && amount > limit.personal) {
        return claims.personalLimit;
    } else if (limit.max && amount > limit.max) {
        return claims.maxLimit;
    }
    return claims.valid;
}

export function amountIsValid(deposit, customerProfile) {
    return limitCheck(deposit, customerProfile, false).isValid;
}

const doValidateFundsProtection = (customerProfile) => {
    const editAccepted = customerProfile.acceptedFundsProtection;
    const {notificationNeedsApproval, acceptedVersion, notificationVersion} =
        customerProfile.customerNotificationResource;
    return validateFundsProtection(notificationNeedsApproval, acceptedVersion, notificationVersion, editAccepted);
};

export function disableButton(deposit, customerProfile) {
    const { showFundsProtection } = customerProfile.customerNotificationResource;
    
    return !limitCheck(deposit, customerProfile, true).isValid
        || (showFundsProtection && !doValidateFundsProtection(customerProfile));
}

export function getAmountMessage(deposit, customerProfile) {
    const claim = limitCheck(deposit, customerProfile);
    return translate(claim.key, {
        amount: amountFormatting.toString(
            claim.getAmount(
                getLimit(deposit, customerProfile))),
        validUntil: formatDate(claim.getValidUntil(customerProfile))
    });
}

export const isRGLimitReached = (deposit, customerProfile) => {
    const limit = getLimit(deposit, customerProfile);
    return limit.min && limit.personal !== undefined && limit.min > limit.personal;
};
