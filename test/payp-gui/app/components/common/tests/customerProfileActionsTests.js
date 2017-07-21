import customerProfileActions, {
    CUSTOMER_PROFILE_FETCHING
} from '../customerProfileActions';
import webApi from '../utils/webApi';

describe('customerProfileActions', () => {
    let dispatch;
    let getStub;
    let getResult;
    
    beforeEach(() => {
        getResult = {
            userId: 'kalank',
            name: 'Kalle Anka',
            data: {
                currency: 'SEK'
            }
        };
        
        dispatch = sinon.spy();
        getStub = sinon.stub(webApi, 'getJSON');
        getStub.returns({
            then: (cb) => Promise.resolve(cb(getResult))
        });
    });
    
    afterEach(() => {
        webApi.getJSON.restore();
    });
    
    describe('#loadCustomerProfile', () => {
        it('should dispatch a CUSTOMER_PROFILE_FETCHING event', () => {
            customerProfileActions.loadCustomerProfile()(dispatch);

            expect(dispatch).to.have.been.called();
            expect(dispatch).to.have.been.calledWith({
                type: CUSTOMER_PROFILE_FETCHING
            });
            expect(webApi.getJSON).to.have.been.calledOnce();
            expect(webApi.getJSON).to.have.been.calledWith(
                '/paymentmethods/external-api/customer-profile'
            );
        });
    });
});
