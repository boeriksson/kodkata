import {
    setConfig,
    getTimer,
    getTimeoutLength,
    submit
} from './depositActions';
import webApi from '../../common/utils/webApi';
import log from '../../common/utils/log';

describe('depositActions', () => {
    let dispatch;
    let getState;
    let clock;
    let getResult;

    describe('#submitDeposit', () => {
        const postResult = { id: 'yyy' };
        const interactionTimeout = 45 * 60 * 1000; // 45 minutes
        const transactionTimeout = 2 * 60 * 1000; // TWO MINUTES
        let depositForm;
        let getStub;
        let postStub;
        let errorLogStub;

        beforeEach(() => {
            depositForm = {
                amount: 10,
                selectedBankId: 2222,
                selectedPayerBankId: 'fupp',
                depositRef: 1111,
                parentDomain: 'http://localhost:8080',
                isMobileApp: undefined,
                methodKey: 'providerxxx'
            };
            getState = () => ({
                iovation: {
                    data: 'iovationData'
                },
                deposit: {
                    status: 'LOADED'
                },
                customerProfile: {}
            });
            getResult = {
                depositRef: 'ba473d59-970f-416e-95f8-f46c7bef5093'
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
            setConfig(10, 50, interactionTimeout, transactionTimeout);

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
            const form = depositForm;
            form.blackbox = 'iovationData';
            return submit(depositForm)(dispatch, getState).then(() => {
                clock.tick(100);
                expect(webApi.getJSON).to.have.been.calledOnce();
                expect(webApi.postJSON).to.have.been.calledOnce();
                expect(webApi.postJSON).to.have.been.calledWith(
                    '/entercash-withdrawal/external-api/deposit/deposit-request',
                    form
                );
            });
        });

        it('should dispatch submitDepositFailed on timeout', () => {
            setConfig(10, 50, 5, 5); // Setting timeouts really low
            getResult.status = 'PENDING_EC';
            return submit(depositForm)(dispatch, getState).then(() => {
                clock.tick(60);

                expect(dispatch.getCall(4).args[0]).to.eql({
                    type: 'SUBMIT_DEPOSIT_FAILED',
                    isSubmitting: false,
                    reason: 'paycashierclient.thirdparty.timeout.message'
                });
            });
        });

        it('should dispatch submitDepositFailed on getting status: failed', () => {
            getStub.onCall(0).returns({
                then: (cb) => Promise.resolve(cb({
                    depositRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'FAILED',
                    reasonKey: 'somthing.went.wrong'
                }))
            });

            return submit(depositForm)(dispatch, getState).then(() => {
                clock.tick(60);
                expect(dispatch.getCall(4).args[0]).to.eql({
                    type: 'SUBMIT_DEPOSIT_FAILED',
                    isSubmitting: false,
                    reason: 'somthing.went.wrong'
                });
            });
        });

        it('should  dispatch a submitDepositCompleted if a receipt property is returned', () => {
            getStub.onCall(0).returns({
                then: (cb) => Promise.resolve(cb({
                    depositRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'PENDING_EC'
                }))
            });

            getStub.onCall(1).returns({
                then: (cb) => Promise.resolve(cb({
                    depositRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    receipt: {}
                }))
            });

            return submit(depositForm)(dispatch, getState).then(() => {
                clock.tick(60);
                expect(dispatch.getCall(4).args[0]).to.eql({
                    type: 'SUBMIT_DEPOSIT_COMPLETED',
                    receipt: {
                        ongoing: false
                    },
                    isSubmitting: false
                });
            });
        });

        it('should  dispatch a submitDepositCompleted with receipt.ongoing == true on delayed response', () => {
            getStub.onCall(0).returns({
                then: (cb) => Promise.resolve(cb({
                    depositRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'PENDING_EC'
                }))
            });

            getStub.onCall(1).returns({
                then: (cb) => Promise.resolve(cb({
                    depositRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'PENDING_TRANSACTION_RESPONSE_DELAYED',
                    receipt: {}
                }))
            });

            return submit(depositForm)(dispatch, getState).then(() => {
                clock.tick(60);
                expect(dispatch.getCall(4).args[0]).to.eql({
                    type: 'SUBMIT_DEPOSIT_COMPLETED',
                    receipt: {
                        ongoing: true
                    },
                    isSubmitting: false
                });
            });
        });
    
        it('should  dispatch a submitDepositCompleted with receipt.ongoing == true on pending provider', () => {
            getStub.onCall(0).returns({
                then: (cb) => Promise.resolve(cb({
                    depositRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'PENDING_EC'
                }))
            });
        
            getStub.onCall(1).returns({
                then: (cb) => Promise.resolve(cb({
                    depositRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'PENDING_PROVIDER_APPROVAL',
                    receipt: {}
                }))
            });
        
            return submit(depositForm)(dispatch, getState).then(() => {
                clock.tick(60);
                expect(dispatch.getCall(4).args[0]).to.eql({
                    type: 'SUBMIT_DEPOSIT_COMPLETED',
                    receipt: {
                        ongoing: true
                    },
                    isSubmitting: false
                });
            });
        });

        it('should change transactionTimeout on PENDING_TRANSACTION_ACCEPTANCE', () => {
            getStub.onCall(0).returns({
                then: (cb) => Promise.resolve(cb({
                    depositRef: 'ba473d59-970f-416e-95f8-f46c7bef5093',
                    status: 'PENDING_TRANSACTION_ACCEPTANCE'
                }))
            });

            return submit(depositForm)(dispatch, getState).then(() => {
                clock.tick(60);
                expect(getTimeoutLength()).to.equal(transactionTimeout);
            });
        });

        it('should dispatch submitDepositFailed if initial post returns an error', () => {
            postStub.onCall(0).returns({
                then: () => Promise.reject({
                    reference: 'fludder',
                    messageKey: 'some.error.key'
                })
            });
            return submit(depositForm)(dispatch, getState).then(() => {
                clock.tick(10);
                expect(dispatch.getCall(4).args[0]).to.eql({
                    type: 'SUBMIT_DEPOSIT_FAILED',
                    isSubmitting: false,
                    reason: 'some.error.key'
                });
            });
        });

        it.skip('should dispatch submitDepositFailed if requestStatusPoll returns an error', () => {
            // Todo: dispatch gets called 3 times, but only the first is visible?? Somthing with the timeout?!?
            getStub.onCall(0).returns({
                then: () => Promise.reject({
                    reference: 'fludder2',
                    messageKey: 'some.error.key2'
                })
            });

            return submit(depositForm)(dispatch, getState).then(() => {
                clock.tick(60);
                expect(dispatch.thirdCall.args[0]).to.be.calledWith({
                    type: 'SUBMIT_DEPOSIT_FAILED',
                    isSubmitting: false,
                    reason: 'some.error.key2'
                });
            });
        });
    });
});
