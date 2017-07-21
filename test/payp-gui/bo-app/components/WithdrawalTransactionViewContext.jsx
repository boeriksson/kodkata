import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import testResize from '../utils/resize';

import transactionActions from './transactionActions';

import TransactionItem from './transactionItem/transactionItem';

class WithdrawalTransactionViewContext extends React.Component {
    componentWillMount = () => {
        this.props.dispatch(transactionActions.getWithdrawalDetails(
            this.props.params.withdrawalReference
        ));
    };

    componentDidUpdate = () => {
        testResize();
    };

    componentDidMount = () => {
        testResize();
    };

    render() {
        const { withdrawal, notFound } = this.props;
        const { withdrawalReference } = this.props.params;

        if (withdrawal || notFound) {
            const wd = withdrawal || {};
            wd.notFound = notFound;

            return (
                <TransactionItem withdrawal={ wd } />
            );
        } else {
            return (
                <div className="ss">
                    ...Loading: {withdrawalReference}
                </div>
            );
        }
    }
}

WithdrawalTransactionViewContext.propTypes = {
    params: PropTypes.shape({
        withdrawalReference: PropTypes.string
    }),
    withdrawal: PropTypes.object,
    notFound: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

function stateToProps({ transaction: { withdrawal, notFound } }) {
    return {
        withdrawal,
        notFound
    };
}

export default connect(stateToProps)(WithdrawalTransactionViewContext);
