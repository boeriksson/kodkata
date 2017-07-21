import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import WithdrawalForm from '../common/withdrawalForm/WithdrawalForm.jsx';
import withdrawalActions from '../common/withdrawalActions';
import Receipt from '../common/withdrawalReceipt/Receipt.jsx';

import { translate } from '../../common/translationActions';

const Loading = PaymentComponents.loading;
const SelectOtherMethods = PaymentComponents.selectOtherMethods;

class WithdrawalEntercashCtx extends Component {

    componentDidMount() {
        this.props.dispatch(withdrawalActions.getWithdrawalForm());
    }

    render() {
        const { withdrawal, customerProfile: { unrecoverableError } } = this.props;

        return (
            <div className="slide-right">
                { !unrecoverableError && getContent(withdrawal) }
                <div className="clear"></div>
            </div>
        );
    }
}

function getContent(withdrawal) {
    if (['SUBMIT_WITHDRAWAL_STARTED', 'AWAIT_FUNDS', 'INITIATE', 'VALIDATE', 'RESERVE_FUNDS']
            .indexOf(withdrawal.status) > -1) {
        return <Loading loadingMsg={ '' }/>;
    } else if (withdrawal.status === 'SUBMIT_WITHDRAWAL_COMPLETED') {
        return <Receipt/>;
    } else if (withdrawal.status === 'MAINTENANCE') {
        return <SelectOtherMethods text={translate(`${config.module}.selectOtherMethod`)}/>;
    }
    
    const validateForm = ({withdrawalForm: form}) =>
    !!form.customerBankId
    && !!form.customerNameInBank
    && !!form.customerBankAccountNumber;
    
    return <WithdrawalForm validateForm={ validateForm }/>;
}

WithdrawalEntercashCtx.propTypes = {
    withdrawal: PropTypes.shape({
        withdrawalForm: PropTypes.shape({
            amount: PropTypes.shape({
                amount: PropTypes.number.isRequired,
                currencyCode: PropTypes.string
            }).isRequired,
            customerBankId: PropTypes.string,
            customerNameInBank: PropTypes.string,
            customerBankAccountNumber: PropTypes.string
        }).isRequired,
        status: PropTypes.string.isRequired
    }).isRequired
};

function stateToProps({ customerProfile, withdrawal }) {
    return {
        customerProfile,
        withdrawal
    };
}

export default connect(stateToProps)(WithdrawalEntercashCtx);
