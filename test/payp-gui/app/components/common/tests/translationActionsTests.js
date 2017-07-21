import { replaceKeyWithSubst, translate, keyExists } from '../translationActions';

const subst = '10 kr';
const string1 = 'Minsta insättning {amount}';
const string1tran = 'Minsta insättning 10 kr';
const string2 = '{amount} i bidrag';
const string2tran = '10 kr i bidrag';
const string3 = 'Lite mer än {amount} i bidrag';
const string3tran = 'Lite mer än 10 kr i bidrag';
const string4 = 'testar { amount } med spaces';
const string4tran = 'testar 10 kr med spaces';

describe('translationActions', () => {
    describe('#replaceWithSubst', () => {
        it('should replace occurances of key in str correctly', () => {
            expect(replaceKeyWithSubst(string1, 'amount', subst)).to.equal(string1tran);
            expect(replaceKeyWithSubst(string2, 'amount', subst)).to.equal(string2tran);
            expect(replaceKeyWithSubst(string3, 'amount', subst)).to.equal(string3tran);
            expect(replaceKeyWithSubst(string4, 'amount', subst)).to.equal(string4tran);
        });
    });

    describe('#translate', () => {
        it('should translate', () => {
            expect(translate('paycashierclient.common.bank.deposit.connectingToProvider'))
                .to.equal('Ansluter till leverantör. Detta kan ta en stund!');
        });
    });

    describe('#keyExists', () => {
        it('should return true if a given key exists in translations', () => {
            expect(keyExists('paycashierclient.common.bank.deposit.connectingToProvider')).to.equal(true);
        });

        it('should return false if a given key do not exist in translations', () => {
            expect(keyExists('mofasa.kefir.ablurg')).to.equal(false);
        });

        it('should return false if given key exist, but is not a leaf', () => {
            expect(keyExists('entercash.deposit')).to.equal(false);
        });
    });
});
