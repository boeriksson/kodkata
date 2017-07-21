import amountFormatting from '../../common/utils/amountFormatting';
import {
    GET_DEPOSIT_FORM_STARTED,
    GET_DEPOSIT_FORM_COMPLETED,
    SERVICE_IN_MAINTENANCE_MODE,
    SELECT_BANK,
    SELECT_PAYER_BANK,
    AMOUNT_INPUT,
    SUBMIT_DEPOSIT_STARTED,
    SUBMIT_DEPOSIT_COMPLETED,
    SUBMIT_DEPOSIT_FAILED,
    OPEN_POPUP,
    CLOSE_POPUP,
    UPDATE_POPUP,
    UPDATE_IFRAME,
    ACTIVATE_SPINNER
} from './depositActions';

function parseFee(fee, amount) {
    let feeString = null;
    let feeAmount = null;

    if (fee) {
        if (fee.fixedFee) {
            feeString = `(${amountFormatting.toString(fee.fixedFee)})`;
            feeAmount = fee.fixedFee;
        }
        if (fee.percentageFee) {
            const maxFee = fee.maxFeeAmount;
            feeString = `(${fee.percentageFee}%)`;
            feeAmount = amount * (fee.percentageFee / 100);
    
            if (maxFee) {
                feeAmount = Math.min(maxFee, feeAmount);
            }
        }
    }
    return { feeString, feeAmount };
}

export default function depositReducer(state = {
    status: 'INIT',
    amount: {
        amount: 0
    },
    settings: {},
    spinner: {
        active: false,
        key: 'paycashierclient.common.bank.deposit.loading'
    },
    isSubmitting: false
}, {
    type,
    depositForm,
    selectedBankId,
    selectedPayerBankId,
    amount,
    isSubmitting,
    reason,
    receipt,
    popup,
    spinner,
    key,
    url,
    isQuickButtonClicked
}) {
    switch (type) {
        case GET_DEPOSIT_FORM_STARTED:
            return {
                ...state,
                status: 'INIT'
            };
        case GET_DEPOSIT_FORM_COMPLETED:
            return {
                ...state,
                ...depositForm,
                settings: {
                    ...depositForm.settings,
                    fee: {
                        ...depositForm.settings.fee,
                        ...parseFee(depositForm.settings.fee, 0)
                    }
                },
                status: 'LOADED'
            };
        case SERVICE_IN_MAINTENANCE_MODE:
            return {
                ...state,
                status: 'MAINTENANCE'
            };
        case SELECT_BANK:
            return {
                ...state,
                selectedBankId
            };
        case SELECT_PAYER_BANK:
            return {
                ...state,
                selectedPayerBankId
            };
        case AMOUNT_INPUT:
            return {
                ...state,
                amount: {
                    amount
                },
                settings: {
                    ...state.settings,
                    fee: {
                        ...state.settings.fee,
                        ...parseFee(state.settings.fee, amount)
                    }
                },
                isQuickButtonClicked
            };
        case SUBMIT_DEPOSIT_STARTED:
            return {
                ...state,
                spinner: {
                    active: state.spinner.active,
                    key: 'paycashierclient.common.bank.deposit.connectingToProvider'
                },
                isSubmitting
            };
        case SUBMIT_DEPOSIT_FAILED:
            return {
                ...state,
                isSubmitting,
                reason,
                status: 'RELOAD_FORM',
    
                // Reset amount and spinner
                amount: {
                    amount: 0
                },
                spinner: {
                    active: false,
                    key: 'paycashierclient.common.bank.deposit.loading'
                }
            };
        case SUBMIT_DEPOSIT_COMPLETED:
            return {
                ...state,
                receipt,
                isSubmitting,
                status: 'RECEIPT',
    
                // Reset spinner
                spinner: {
                    active: false,
                    key: 'paycashierclient.common.bank.deposit.loading'
                }
            };
        case OPEN_POPUP:
            return {
                ...state,
                popup,
                spinner,
                key
            };
        case CLOSE_POPUP: {
            if (state.popup && state.popup.window) {
                state.popup.window.close();
            }
            return {
                ...state,
                url: null,
                popup: null,
                spinner: {
                    active: false,
                    key: null
                },
                status: 'LOADED'
            };
        }
        case UPDATE_POPUP:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    url
                },
                spinner,
                status: 'POPUP'
            };
        case UPDATE_IFRAME:
            return {
                ...state,
                iframe: {
                    url
                },
                spinner: {
                    active: state.spinner.active,
                    key: 'paycashierclient.common.bank.deposit.connectingToProvider'
                },
                status: 'IFRAME'
            };
        case ACTIVATE_SPINNER:
            return {
                ...state,
                spinner: {
                    active: true,
                    key: state.spinner.key
                }
            };
        default:
            return state;
    }
}
