import customerProfileReducer from '../customerProfileReducer';
import { CUSTOMER_PROFILE_FETCHING, CUSTOMER_PROFILE_RECEIVED } from '../customerProfileActions';

function invoke(action = {}, state) {
    return customerProfileReducer(state, action);
}

describe('customerProfileReducer', () => {
    it('should handle CUSTOMER_PROFILE_FETCHING action', () => {
        let state;
        expect(customerProfileReducer(state, { type: CUSTOMER_PROFILE_FETCHING })).to.eql({
            acceptedFundsProtection: false,
            notLoaded: true
        });
    });

    it('should handle CUSTOMER_PROFILE_RECEIVED action', () => {
        const customerProfile = { userId: 'Ola', userName: 'Yoda' };
        expect(invoke({ type: CUSTOMER_PROFILE_RECEIVED, customerProfile })).to.eql({
            ...customerProfile,
            acceptedFundsProtection: false,
            notLoaded: false
        });
    });
});
