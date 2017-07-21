import {
    GET_WITHDRAWAL_FORM_COMPLETED,
    UPDATE_WITHDRAWAL_PROPERTY,
    UPDATE_WITHDRAWAL_AMOUNT,
    SUBMIT_WITHDRAWAL_STARTED,
    SUBMIT_WITHDRAWAL_COMPLETED,
    SUBMIT_WITHDRAWAL_FAILED,
    SUBMIT_WITHDRAWAL_STATUS,
    SUBMIT_WITHDRAWAL_ABORTED,
    SUBMIT_WITHDRAWAL_TIMEOUT,
    SELECT_ACCOUNT_STARTED,
    SET_BANK_ACCOUNT,
    ADD_BANK_ACCOUNT,
    SERVICE_IN_MAINTENANCE_MODE
} from './withdrawalActions';

function getAmountWithFee(state, amount) {
    let feeAmount = 0;
    if (state.withdrawalForm.settings && state.withdrawalForm.settings.fee) {
        const { fee } = state.withdrawalForm.settings;
        if (fee.hasOwnProperty('percentageFee')) {
            const percentage = fee.percentageFee / 100;
            feeAmount = percentage * amount;
        } else if (fee.hasOwnProperty('fixedFee')) {
            feeAmount = fee.fixedFee;
        }
    }
    return amount - feeAmount;
}

function getMinLimit(withdrawalForm) {
    // If min limit is set to less than a fixed fee = wrong config
    // gui sets minlimit to the fixed fee + 1, automagically
    if (withdrawalForm.settings.fee && withdrawalForm.settings.fee.fixedFee) {
        if (withdrawalForm.settings.minLimit) {
            if (withdrawalForm.settings.minLimit.amount < withdrawalForm.settings.fee.fixedFee) {
                return { ...withdrawalForm.settings.minLimit, amount: withdrawalForm.settings.fee.fixedFee + 1 };
                    // minLimit < fixedFee -> set minLimit to fixedFee + 1
            }
            return { ...withdrawalForm.settings.minLimit, amount: withdrawalForm.settings.minLimit.amount };
                    // minLimit > fixedFee - keep minlimit
        }
        return { amount: withdrawalForm.settings.fee.fixedFee + 1 };
            // fixedFee, but no minLimit -> set minLimit to fixedFee + 1
    }
    return withdrawalForm.settings.minLimit || null;
}

export default function withdrawalReducer(state = {
    status: 'INIT',
    withdrawalForm: {
        withdrawalRef: '',
        amount: {
            amount: 0,
            currencyCode: ''
        },
        settings: {
            minLimit: {
                amount: 0
            }
        },
        customerBankId: '',
        customerNameInBank: '',
        customerBankAccountNumber: '',
        bankAccounts: []
    },
    amountWithFee: 0
}, {
    type,
    withdrawalForm,
    property,
    amount,
    error,
    receipt,
    status,
    bankAccount,
    accountId,
    bankName
}) {
    switch (type) {
        case GET_WITHDRAWAL_FORM_COMPLETED: {
            return {
                ...state,
                withdrawalForm: {
                    ...withdrawalForm,
                    amount: {
                        amount: state.withdrawalForm.amount.amount || withdrawalForm.amount.amount,
                        currencyCode: state.withdrawalForm.amount.currencyCode || withdrawalForm.amount.currencyCode
                    },
                    customerNameInBank: state.withdrawalForm.customerNameInBank || withdrawalForm.customerNameInBank,
                    customerBankId: state.withdrawalForm.customerBankId || withdrawalForm.customerBankId,
                    customerBankAccountNumber: state.withdrawalForm.customerBankAccountNumber
                        || withdrawalForm.customerBankAccountNumber,
                    accountId: (withdrawalForm.bankAccounts && withdrawalForm.bankAccounts.length) > 0 ?
                        withdrawalForm.bankAccounts[0].accountId : null,
                    settings: {
                        ...withdrawalForm.settings,
                        minLimit: getMinLimit(withdrawalForm)
                    }
                },
                status: type
            };
        }
        case UPDATE_WITHDRAWAL_PROPERTY: {
            const prop = {};
            prop[property.id] = property.value;
            return {
                ...state,
                withdrawalForm: {
                    ...state.withdrawalForm,
                    ...prop
                },
                status: type
            };
        }
        case UPDATE_WITHDRAWAL_AMOUNT: {
            const amountWithFee = getAmountWithFee(state, amount);
            return {
                ...state,
                withdrawalForm: {
                    ...state.withdrawalForm,
                    amount: {
                        currencyCode: state.withdrawalForm.amount.currencyCode,
                        amount
                    }
                },
                amountWithFee,
                status: type
            };
        }
        case SUBMIT_WITHDRAWAL_STARTED:
            return {
                ...state,
                status: type
            };
        case SUBMIT_WITHDRAWAL_COMPLETED:
            return {
                ...state,
                status: type,
                receipt
            };
        case SUBMIT_WITHDRAWAL_FAILED:
            return {
                ...state,
                status: type,
                error
            };
        case SUBMIT_WITHDRAWAL_STATUS:
            return {
                ...state,
                status
            };
        case SUBMIT_WITHDRAWAL_ABORTED:
            return {
                ...state,
                status
            };

        case SUBMIT_WITHDRAWAL_TIMEOUT:
            return {
                ...state,
                status: type
            };
        case SELECT_ACCOUNT_STARTED:
            return {
                ...state,
                status: type
            };
        case SET_BANK_ACCOUNT: {
            return {
                ...state,
                withdrawalForm: {
                    ...state.withdrawalForm,
                    bankAccount,
                    accountId
                },
                status: type
            };
        }
        case ADD_BANK_ACCOUNT: {
            const bankAccounts = state.withdrawalForm.bankAccounts || [];
            if (bankAccounts.filter((account) => account.accountId === accountId).length > 0) {
                return state; // In case of trying to add existing account...
            }
            return {
                ...state,
                withdrawalForm: {
                    ...state.withdrawalForm,
                    bankAccounts: [
                        {
                            accountId,
                            bankName,
                            bankAccount
                        },
                        ...bankAccounts
                    ],
                    accountId,
                    bankAccount
                },
                status: type
            };
        }
        case SERVICE_IN_MAINTENANCE_MODE:
            return {
                ...state,
                status: 'MAINTENANCE'
            };
        default:
            return state;
    }
}
