import { amountIsValid, getAmountMessage } from '../depositHelper';
import amountFormatting from '../../../common/utils/amountFormatting';

describe('amountElementHelper', () => {
    let deposit;
    let customerProfile;
    beforeEach(() => {
        deposit = {
            amount: {
                amount: 0
            },
            settings: {
                minLimit: {
                    amount: 10
                },
                maxLimit: {
                    amount: 100
                }
            }
        };
        customerProfile = {};
        sinon.stub(amountFormatting, 'toString', (a) => a);
    });

    afterEach(() => {
        amountFormatting.toString.restore();
    });

    describe('#amountIsValid', () => {
        it('should return false if amount < min limit ', () => {
            deposit.amount.amount = 8;
            expect(amountIsValid(deposit, customerProfile)).equal(false);
        });

        it('should return true if amount is < max limit and min limit is undefined', () => {
            deposit.settings.minLimit.amount = undefined;
            deposit.amount.amount = 9;
            expect(amountIsValid(deposit, customerProfile)).equal(true);
        });

        it('should return true if amount < min limit and amount is 0', () => {
            expect(amountIsValid(deposit, customerProfile)).equal(true);
        });

        it('should return false if amount is > personal limit', () => {
            customerProfile.depositLimit = {
                maxAllowed: {
                    amount: 20
                }
            };
            deposit.amount.amount = 22;
            expect(amountIsValid(deposit, customerProfile)).equal(false);
        });

        it('should return true if amount is within max/min limit and there is no personal limit', () => {
            deposit.amount.amount = 22;
            expect(amountIsValid(deposit, customerProfile)).equal(true);
        });

        it('should return false if amount > max limit', () => {
            deposit.amount.amount = 200;
            expect(amountIsValid(deposit, customerProfile)).equal(false);
        });
    });

    describe('#getAmountMessage', () => {
        it('should return correct msg if amount < min limit ', () => {
            deposit.amount.amount = 8;
            expect(getAmountMessage(deposit, customerProfile)).to.equal('Minsta insättning 10');
        });
        it('should return correct msg if amount < max limit and min limit is undefined', () => {
            deposit.amount.amount = 9;
            expect(getAmountMessage(deposit, customerProfile)).to.equal('Minsta insättning 10');
        });
        it('should return correct msg if amount < min limit and amount is 0', () => {
            expect(getAmountMessage(deposit, customerProfile)).to.equal('Minsta insättning 10');
        });
        it('should return correct msg if amount is > personal limit', () => {
            customerProfile.depositLimit = {
                maxAllowed: {
                    amount: 20,
                    currency: 'SEK'
                },
                validUntil: '2017-07-20T14:35:09',
                limitDays: 1,
                limit: 200.00,
                requireDepositLimit: false
            };
            deposit.amount.amount = 22;
            expect(getAmountMessage(deposit, customerProfile))
                .to.equal('Your deposit limit allows you to deposit 20 by 2017-07-20 16:35.');
        });
        it('should return correct msg if amount is within max/min limit and there is no personal limit', () => {
            deposit.amount.amount = 22;
            expect(getAmountMessage(deposit, customerProfile)).to.equal('Minsta insättning 10');
        });
        it('should return correct msg if amount > max limit', () => {
            deposit.amount.amount = 200;
            expect(getAmountMessage(deposit, customerProfile)).to.equal('Högsta insättning 100');
        });
    });
});
