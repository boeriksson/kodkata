import translations from 'translations';
import { notify, ERROR_MESSAGE } from '../notificationActions';
import log from '../utils/log';

describe('notificationActions', () => {
    let errorLogMock;

    beforeEach(() => {
        errorLogMock = sinon.stub(log, 'error');
    });

    afterEach(() => {
        errorLogMock.restore();
    });

    describe('#notify', () => {
        it('should return a plain text msg', () => {
            const msg = 'ett meddelande';
            expect(notify(msg)).to.eql({
                type: ERROR_MESSAGE,
                notClosable: false,
                titleKey: undefined,
                messageKey: undefined,
                message: msg
            });
        });

        it('should return a single key error message', () => {
            const messageKey = 'entercash.error.aboveMaxDepositLimit';
            expect(notify({ messageKey })).to.eql({
                type: ERROR_MESSAGE,
                notClosable: false,
                titleKey: undefined,
                messageKey
            });
        });

        it('should return a message when a translation with key + ".title"/".text" is found', () => {
            const messageKey = 'entercash.error.testerror1';
            expect(notify({ messageKey })).to.eql({
                type: ERROR_MESSAGE,
                notClosable: false,
                titleKey: 'entercash.error.testerror1.title',
                messageKey: 'entercash.error.testerror1.text'
            });
        });

        it('should return a message when a translation with key + ".text" is found', () => {
            const messageKey = 'entercash.error.testerror2';
            expect(notify({ messageKey })).to.eql({
                type: ERROR_MESSAGE,
                notClosable: false,
                titleKey: undefined,
                messageKey: 'entercash.error.testerror2.text'
            });
        });

        it('should return a generic messagekey if key is not found', () => {
            const messageKey = 'entercash.error.gurgelMefBront';
            expect(notify({ messageKey })).to.eql({
                type: ERROR_MESSAGE,
                notClosable: false,
                titleKey: undefined,
                messageKey: 'paycashierclient.common.error.genericException'
            });
        });

        it('should return a generic message if key, and a generic translation is not found', () => {
            const genericMessageKey = 'paycashierclient.common.error.genericException';
            delete translations['entercash-withdrawal']; // eslint-disable-line no-undef
            const messageKey = 'entercash.error.gurgelMefBront1';
            expect(notify({ messageKey })).to.eql({
                type: ERROR_MESSAGE,
                notClosable: false,
                titleKey: undefined,
                messageKey: genericMessageKey
            });
        });

        it('should log a message if key, and a generic translation is not found', () => {
            delete translations['entercash-withdrawal']; // eslint-disable-line no-undef
            const messageKey = 'entercash.error.gurgelMefBront';

            notify({ messageKey });
            expect(errorLogMock).to.have.been.calledOnce();
            log.error.restore();
        });
    });
});
