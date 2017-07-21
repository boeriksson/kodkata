import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import WithdrawalForm from '../common/withdrawalForm/WithdrawalForm.jsx';
import Receipt from '../common/withdrawalReceipt/Receipt.jsx';
import withdrawalActions from '../common/withdrawalActions';
import accountActions from './accountActions';
import { translate } from '../../common/translationActions';
import IframeWrapper from '../../common/IframeWrapper';

const Loading = PaymentComponents.loading;
const SelectOtherMethods = PaymentComponents.selectOtherMethods;

function getWithdrawalForm(account, bankAccount, dispatch) {
    const validateForm = ({withdrawalForm: form}) => !!form.accountId;
    
    const redirectSuccess = () => dispatch(accountActions.redirectReturn());
    const redirectCancel = () => dispatch(accountActions.cancelRedirect());

    if (account.status === 'IFRAME') { // iframe Trustly to select an account
        return <IframeWrapper
            callback={ redirectSuccess }
            cancel={ redirectCancel }
            url={ account.selectAccountUrl }
            fullWrap={true}/>;
    } else if (account.status === 'SPINNER') {
        return <Loading loadingMsg={ '' }/>;
    }
    return <WithdrawalForm validateForm={ validateForm }/>;
}

function getContent(withdrawal, account, dispatch) {
    switch (withdrawal.status) {
        case 'INIT':
        case 'SELECT_ACCOUNT_STARTED':
        case 'SUBMIT_WITHDRAWAL_STARTED':
        case 'INITIATE':
        case 'VALIDATE':
        case 'RESERVE_FUNDS':
        case 'AWAIT_FUNDS':
        case 'AWAIT_APPROVAL':
        case 'CREATE_WITHDRAWAL':
        case 'PAYOUT':
        case 'CREATE_ORDER':
        case 'APPROVE':
        case 'PENDING_PROVIDER':
        case 'FINALIZE':
        case 'WITHDRAWAL_SUCCESSFUL':
        case 'PROVIDER_SUCCESSFUL':
            return <Loading loadingMsg={ '' }/>;
        case 'SUBMIT_WITHDRAWAL_COMPLETED':
            return <Receipt/>;
        case 'MAINTENANCE':
            return <SelectOtherMethods text={translate(`${config.module}.selectOtherMethod`)}/>;
        case 'GET_WITHDRAWAL_FORM_COMPLETED':
            if (!withdrawal.withdrawalForm.bankAccount && !account.selectAccountUrl) {
                dispatch(accountActions.getSelectAccountUrl(withdrawal));
                return <Loading loadingMsg={ '' }/>;
            }
        default:
            return getWithdrawalForm(account, withdrawal.withdrawalForm.bankAccount, dispatch);
    }
}

class WithdrawalTrustlyCtx extends Component {

    componentDidMount() {
        this.props.dispatch(withdrawalActions.getWithdrawalForm());
    }

    render() {
        const { withdrawal, account, customerProfile: { unrecoverableError }, dispatch } = this.props;

        return (
            <div className="slide-right">
                { !unrecoverableError && getContent(withdrawal, account, dispatch) }
                <div className="clear"></div>
            </div>
        );
    }
}

WithdrawalTrustlyCtx.propTypes = {
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
    }).isRequired,
    account: PropTypes.shape({
        selectAccountUrl: PropTypes.string
    })
};

function stateToProps({ customerProfile, withdrawal, account }) {
    return {
        customerProfile,
        withdrawal,
        account
    };
}

export default connect(stateToProps)(WithdrawalTrustlyCtx);
