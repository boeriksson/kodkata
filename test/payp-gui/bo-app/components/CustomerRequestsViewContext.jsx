import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import postToParent from '../utils/postToParent';
import testResize from '../utils/resize';

import transactionActions from './transactionActions';

const States = require('./states/MODULE/States').default;

class CustomerRequestViewContext extends React.Component {
    componentWillMount = () => {
        const { params, dispatch } = this.props;
        const { customerId, period } = params;

        if (config.archetype === 'deposit') {
            dispatch(transactionActions.getCustomerDepositRequests(customerId, period));
        } else if (config.archetype === 'withdrawal') {
            dispatch(transactionActions.getCustomerWithdrawalRequests(customerId, period));
        }
    };

    componentDidUpdate = () => {
        testResize();
    };

    componentDidMount = () => {
        testResize();
    };

    translate = (data) => {
        if (data) {
            return data.map((item) => {
                /*
                 Contract is: [
                    'paymentRequestId',
                    'site',
                    'paymentRequestType' ,
                    'createdDate',
                    'userAmount',
                    'providerAmount',
                    'state',
                    'result',
                    'providerReference'
                 ]
                 */
                return {
                    paymentRequestId: item.transactionId,
                    site: item.site,
                    depositReference: item.depositRef || item.withdrawalRef || undefined,
                    withdrawalReference: item.withdrawalRef || undefined,
                    paymentRequestType: item.requestType,
                    providerAmount: item.providerAmount.amount + ' ' + item.providerAmount.currencyCode,
                    userAmount: item.amount.amount + ' ' + item.amount.currencyCode,
                    result: item.message,
                    createdDate: Date.parse(item.created),
                    state: item.status,
                    providerReference: item.transactionId
                };
            });

        } else {
            return {};
        }
    };

    render() {
        const successStyle = {
            display: 'inline-block',
            minWidth: '300px',
            minHeight: '250px',
            verticalAlign: 'top'
        };
        const headerStyle = {
            color: 'white',
            textAlign: 'center',
            backgroundColor: '#606F5E'
        };
        const failedStyle = {
            backgroundColor: 'red',
            color: 'white',
            textAlign: 'center'
        };
        const { customerRequests, failed } = this.props;
        const module = config.module.toUpperCase();

        if (failed) {
            return (
                <div style={failedStyle}>
                    Failed to load {module}
                </div>
            );
        } else if (customerRequests && customerRequests.length === 0) {
            return <States isStateFound={false} headerStyle={headerStyle} successStyle={ successStyle }/>;
        } else if (customerRequests && customerRequests.length > 0) {
            postToParent(this.translate(customerRequests));
            return <States isStateFound={true} headerStyle={headerStyle} successStyle={ successStyle }/>;
        }
        return (
            <div style={failedStyle}>
                Could not load {module}
            </div>
        );
    }
}

CustomerRequestViewContext.propTypes = {
    params: PropTypes.shape({
        customerId: PropTypes.string.isRequired,
        period: PropTypes.string.isRequired
    }),
    customerRequests: PropTypes.array,
    failed: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

function stateToProps({ transaction: { customerRequests, failed } }) {
    return {
        customerRequests,
        failed
    };
}

export default connect(stateToProps)(CustomerRequestViewContext);
