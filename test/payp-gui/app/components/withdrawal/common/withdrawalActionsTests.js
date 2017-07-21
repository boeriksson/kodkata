import {
    setConfig,
    getTimer,
    submit,
    setAmount,
    UPDATE_WITHDRAWAL_AMOUNT
} from './withdrawalActions';
import webApi from '../../common/utils/webApi';
import log from '../../common/utils/log';

describe('withdrawalActions', () => {
    let dispatch;
    let getState;
    let clock;
    let getResult;

    beforeEach(() => {
        dispatch = sinon.spy();
    });

    describe('#submitWithdrawal', () => {
        const postResult = { id: 'yyy' };
        const timeoutTime = 15 * 60 * 1000; // time used for timing out the withdrawal, i.e. 15 minutes.
        let withdrawalForm;
        let getStub;
        let postStub;
        let errorLogStub;

        beforeEach(() => {
            withdrawalForm = {
                withdrawalRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                amount: {
                    amount: 0,
                    currencyCode: 'SEK'
                },
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
            getState = () => ({
                iovation: {
                    data: 'iovationData'
                },
                withdrawal: {
                    status: 'LOADED'
                },
                customerProfile: {}
            });
            getResult = {
                withdrawalRef: 'ba473d59-970f-416e-95f8-f46c7bef5093'
            };

            getStub = sinon.stub(webApi, 'getJSON');
            getStub.returns({
                then: (cb) => Promise.resolve(cb(getResult))
            });

            postStub = sinon.stub(webApi, 'postJSON');
            postStub.returns({
                then: (cb) => Promise.resolve(cb(postResult))
            });
            dispatch = sinon.stub();
            clock = sinon.useFakeTimers();
            setConfig(50, timeoutTime);

            errorLogStub = sinon.stub(log, 'error');
        });

        afterEach(() => {
            clearTimeout(getTimer());
            webApi.getJSON.restore();
            webApi.postJSON.restore();
            clock.restore();
            getStub.restore();
            postStub.restore();
            errorLogStub.restore();
        });

        it('should call getJSON and postJSON within 20 ms', () => {
            const form = withdrawalForm;
            form.blackbox = 'iovationData';
            return submit(withdrawalForm)(dispatch, getState).then(() => {
                clock.tick(90);
                expect(webApi.postJSON).to.have.been.calledOnce();
                expect(webApi.postJSON).to.have.been.calledWith(
                    '/entercash-withdrawal/external-api/withdrawal/withdrawal-request',
                    form
                );
                expect(webApi.getJSON).to.have.been.calledOnce();
            });
        });

        it('should dispatch submitDepositFailed on getting status: failed', () => {
            getStub.onCall(0).returns({
                then: (cb) => Promise.resolve(cb({
                    withdrawalRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'FAILED',
                    reasonKey: 'somthing.went.wrong'
                }))
            });

            return submit(withdrawalForm)(dispatch, getState).then(() => {
                clock.tick(60);
                expect(dispatch.getCall(3).args[0]).to.eql({
                    type: 'SUBMIT_WITHDRAWAL_FAILED',
                    error: 'somthing.went.wrong'
                });
            });
        });

        it('should dispatch submitWithdrawalFailed when unknown status', () => {
            getStub.onCall(0).returns({
                then: (cb) => Promise.resolve(cb({
                    withdrawalRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'BLAHOPP'
                }))
            });

            return submit(withdrawalForm)(dispatch, getState).then(() => {
                clock.tick(60);
                expect(dispatch.getCall(3).args[0]).to.eql({
                    type: 'SUBMIT_WITHDRAWAL_FAILED',
                    error: 'unknown status'
                });
            });
        });

        it('should dispatch submitWithdrawalTimeout on timeout', () => {
            setConfig(50, 5); // Setting timeouts really low
            getResult.status = 'INITIATE';
            return submit(withdrawalForm)(dispatch, getState).then(() => {
                clock.tick(90);

                expect(dispatch.getCall(3).args[0]).to.eql({
                    type: 'SUBMIT_WITHDRAWAL_TIMEOUT'
                });
            });
        });

        it('should dispatch a submitWithdrawalCompleted if successful withdrawal', () => {
            getStub.onCall(0).returns({
                then: (cb) => Promise.resolve(cb({
                    withdrawalRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'INITIATE'
                }))
            });

            getStub.onCall(2).returns({
                then: (cb) => Promise.resolve(cb({
                    withdrawalRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'PROVIDER_SUCCESSFUL',
                    receipt: {
                        isAwesome: true
                    }
                }))
            });

            return submit(withdrawalForm)(dispatch, getState).then(() => {
                clock.tick(200);

                expect(dispatch.getCall(3).args[0]).to.eql({
                    type: 'SUBMIT_WITHDRAWAL_COMPLETED',
                    receipt: {
                        isAwesome: true
                    }
                });
            });
        });

        it('should dispatch submitWithdrawalFailed if initial post returns an error', () => {
            postStub.onCall(0).returns({
                then: () => Promise.reject({
                    reference: 'fludder',
                    messageKey: 'some.error.key'
                })
            });
            return submit(withdrawalForm)(dispatch, getState).then(() => {
                clock.tick(10);
                expect(dispatch.getCall(3).args[0]).to.eql({
                    type: 'SUBMIT_WITHDRAWAL_FAILED',
                    error: 'some.error.key'
                });
            });
        });
    });

    describe('#setAmount', () => {
        it('should create an action to add amount', () => {
            const amount = {
                amount: 10,
                currencyCode: 'SEK'
            };
            const retAction = setAmount(amount);
            expect(retAction.type).to.equal(UPDATE_WITHDRAWAL_AMOUNT);
            expect(retAction.amount).to.equal(amount);
        });
    });
});
