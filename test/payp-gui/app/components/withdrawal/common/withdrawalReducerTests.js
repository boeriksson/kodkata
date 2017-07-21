import withdrawalReducer from './withdrawalReducer';
import { GET_WITHDRAWAL_FORM_COMPLETED } from './withdrawalActions';

function invoke(action = {}, state) {
    return withdrawalReducer(state, action);
}

let withdrawalForm;
beforeEach(() => {
    withdrawalForm = {
        _links: {
            'entercash-withdrawal:withdrawal-request': {
                href: 'http://localhost:8080/entercash-withdrawal/external-api/withdrawal/withdrawal-request'
            },
            self: {
                href: 'http://localhost:8080/entercash-withdrawal/external-api/withdrawal/withdrawal-request-form'
            },
            curies: [
                {
                    href: 'http://payment.unibet.com/rels/{rel}',
                    name: 'entercash-withdrawal',
                    templated: true
                }
            ]
        },
        withdrawalRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
        amount: {
            amount: 0,
            currencyCode: 'SEK'
        },
        accountId: null,
        customerBankId: '11',
        customerNameInBank: 'Gandalf The Whites',
        customerBankAccountNumber: '112233445566',
        settings: {
            fee: {
                fixedFee: 7
            },
            minLimit: {
                amount: 1,
                currencyCode: 'SEK'
            },
            maxLimit: {
                amount: 10000,
                currencyCode: 'SEK'
            },
            customerCountryCode: 'SE'
        }
    };
});

describe('withdrawalReducer', () => {
    describe('GET_WITHDRAWAL_FORM_COMPLETED', () => {
        it('should handle minLimit < fixedFee ', () => {
            expect(invoke({ type: GET_WITHDRAWAL_FORM_COMPLETED, withdrawalForm }).withdrawalForm).to.eql({
                ...withdrawalForm,
                settings: {
                    ...withdrawalForm.settings,
                    minLimit: {
                        ...withdrawalForm.settings.minLimit,
                        amount: withdrawalForm.settings.fee.fixedFee + 1
                    }
                }
            });
        });

        it('should handle minLimit > fixedFee ', () => {
            withdrawalForm.settings.minLimit.amount = 11;
            expect(invoke({ type: GET_WITHDRAWAL_FORM_COMPLETED, withdrawalForm }).withdrawalForm).to.eql({
                ...withdrawalForm
            });
        });

        it('should handle fixedFee and NO minLimit', () => {
            delete withdrawalForm.settings.minLimit;
            expect(invoke({ type: GET_WITHDRAWAL_FORM_COMPLETED, withdrawalForm }).withdrawalForm).to.eql({
                ...withdrawalForm,
                settings: {
                    ...withdrawalForm.settings,
                    minLimit: {
                        amount: withdrawalForm.settings.fee.fixedFee + 1
                    }
                }
            });
        });

        it('should handle NO fee', () => {
            delete withdrawalForm.settings.fee;
            expect(invoke({ type: GET_WITHDRAWAL_FORM_COMPLETED, withdrawalForm }).withdrawalForm).to.eql({
                ...withdrawalForm
            });
        });

        it('should handle NO fee AND NO minLimit', () => {
            delete withdrawalForm.settings.fee;
            delete withdrawalForm.settings.minLimit;
            expect(invoke({ type: GET_WITHDRAWAL_FORM_COMPLETED, withdrawalForm })
                .withdrawalForm.settings.minLimit).to.equal(null);
        });
    });
});
