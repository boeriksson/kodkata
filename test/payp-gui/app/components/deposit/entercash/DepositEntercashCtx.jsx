import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import context from 'context';

import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import DepositForm from '../common/depositForm/DepositForm';
import DepositReceipt from '../common/depositReceipt/Receipt';
import depositActions from '../../deposit/common/depositActions';
import { translate } from '../../common/translationActions';

const Loading = PaymentComponents.loading;
const SelectOtherMethods = PaymentComponents.selectOtherMethods;

function checkIfRebound(dispatch) {
    const depositRef = Cookies.get('depositRef');
    if (depositRef) {
        Cookies.remove('depositRef');
        dispatch(depositActions.topWindowBouncedBack(depositRef));
    }
}

function getContent(deposit, hasFirstDeposit, dispatch) {
    const { status, receipt, spinner: { key } } = deposit;

    switch (status) {
        case 'LOADED':
            checkIfRebound(dispatch);
            return <DepositForm />;
        case 'RECEIPT':
            return (<DepositReceipt receipt={ receipt }
                                   hasFirstDeposit={ hasFirstDeposit }
                                   titleKey={ `${context.methodKey}.title` }/>);
        case 'MAINTENANCE':
            return <SelectOtherMethods
                text={translate('paycashierclient.common.deposit.selectOtherMethod')}/>;
        default: {
            return <Loading loadingMsg={ translate(key) }/>;
        }
    }
}

class EntercashDepositCtx extends React.Component {
    componentDidMount = () => {
        this.props.dispatch(depositActions.getDepositForm());
    };
    
    componentDidUpdate = () => {
        const { dispatch, deposit: { status } } = this.props;
        if (status === 'RELOAD_FORM') {
            dispatch(depositActions.getDepositForm());
        }
    };

    render() {
        const { deposit, customerProfile: { hasFirstDeposit, unrecoverableError }, dispatch } = this.props;

        return (
            <div className="slide-right">
                { !unrecoverableError && getContent(deposit, hasFirstDeposit, dispatch) }
                <div className="clear"></div>
            </div>
        );
    }
}

EntercashDepositCtx.propTypes = {
    customerProfile: PropTypes.object, // TODO: trans to shape
    deposit: PropTypes.object,
    receipt: PropTypes.object,
    translate: PropTypes.func,
    dispatch: PropTypes.func
};

function stateToProps({ customerProfile, deposit }) {
    return {
        customerProfile,
        deposit
    };
}

export default connect(stateToProps)(EntercashDepositCtx);
