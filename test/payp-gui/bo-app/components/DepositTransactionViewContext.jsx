import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import testResize from '../utils/resize';

import transactionActions from './transactionActions';

import TransactionItem from './transactionItem/transactionItem';

class DepositTransactionViewContext extends React.Component {
    componentWillMount = () => {
        this.props.dispatch(transactionActions.getDepositDetails(
            this.props.params.depositReference
        ));
    };

    componentDidUpdate = () => {
        testResize();
    };

    componentDidMount = () => {
        testResize();
    };

    render() {
        const { deposit, notFound } = this.props;
        const { depositReference } = this.props.params;

        if (deposit || notFound) {
            const dp = deposit || {};
            dp.notFound = notFound;

            return (
                <TransactionItem deposit={ dp } />
            );
        }
        return (
            <div className="ss">
                ...Loading: {depositReference}
            </div>
        );
    }
}

DepositTransactionViewContext.propTypes = {
    params: PropTypes.shape({
        depositReference: PropTypes.string
    }),
    deposit: PropTypes.object,
    notFound: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

function stateToProps({ transaction: { deposit, notFound } }) {
    return {
        deposit,
        notFound
    };
}

export default connect(stateToProps)(DepositTransactionViewContext);
