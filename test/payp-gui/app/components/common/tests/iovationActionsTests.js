import iovationActions, { IOVATION_LOAD } from '../iovationActions';

describe('iovationActions', () => {
    let customerProfileMock;
    let dispatch;
    beforeEach(() => {
        customerProfileMock = {
            userId: 'dontru',
            name: 'Donald Trump',
            data: {
                currency: 'SEK'
            },
            deviceTest: true
        };
        dispatch = sinon.spy();
    });

    it('should return a "false" promise if customerProfile has deviceTest==true', () => {
        customerProfileMock.deviceTest = false;
        expect(iovationActions.loadIovationScript(customerProfileMock))
            .to.eql({
                type: IOVATION_LOAD,
                data: false
            });
    });

    it('should return a "false" if iovationUpdate has not been called after timeout sec',
        () => iovationActions.loadIovationScript(customerProfileMock, 300)(dispatch)
            .catch(() => {
                expect(dispatch).to.have.been.calledWith({
                    type: IOVATION_LOAD,
                    data: false
                });
            })
    );

    it('should populate data with bb via iovationUpdate', () => {
        iovationActions.loadIovationScript(customerProfileMock)(dispatch)
            .then(() => {
                expect(dispatch).to.have.been.calledWith({
                    type: IOVATION_LOAD,
                    data: { bb: true }
                });
            });
        iovationActions.iovationUpdate({ bb: true }, true);
    });
});
