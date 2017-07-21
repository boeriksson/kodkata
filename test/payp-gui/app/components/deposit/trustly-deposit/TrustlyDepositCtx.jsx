import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import DepositForm from '../common/depositForm/DepositForm';
import DepositReceipt from '../common/depositReceipt/Receipt';

import depositActions from '../../deposit/common/depositActions';
import { translate } from '../../common/translationActions';
import IframeWrapper from '../../common/IframeWrapper';

const { module } = config; // eslint-disable-line no-undef

const Loading = PaymentComponents.loading;
const SelectOtherMethods = PaymentComponents.selectOtherMethods;

function getContent(deposit, hasFirstDeposit, redirectReturn, cancelReturn) {
    const { status, receipt, spinner: { active, key }, iframe, isSubmitting } = deposit;
    
    const getIframe = () => {
        if (active) {
            return <Loading loadingMsg={ translate(key) }/>;
        }
        return <IframeWrapper callback={redirectReturn} cancel={cancelReturn} url={iframe.url} fullWrap={true}/>;
    };
    
    if (isSubmitting && status !== 'IFRAME') {
        return <Loading loadingMsg={ translate(key) }/>;
    }

    switch (status) {
        case 'LOADED':
            return <DepositForm iframe={ true }/>;
        case 'RECEIPT':
            return <DepositReceipt receipt={ receipt }
                                   hasFirstDeposit={ hasFirstDeposit }
                                   titleKey={ `${module}.title` }/>;
        case 'IFRAME':
            return getIframe();
        case 'MAINTENANCE':
            return <SelectOtherMethods
                text={translate('paycashierclient.common.deposit.selectOtherMethod')}/>;
        default: {
            return <Loading loadingMsg={ translate(key) }/>;
        }
    }
}

class TrustlyDepositCtx extends React.Component {
    componentDidMount = () => {
        this.props.dispatch(depositActions.getDepositForm());
    };
    
    componentDidUpdate = () => {
        const { dispatch, deposit: { status } } = this.props;
        if (status === 'RELOAD_FORM') {
            dispatch(depositActions.getDepositForm());
        }
    };

    redirectReturn = () => {
        const { dispatch, deposit: { depositRef } } = this.props;
        dispatch(depositActions.redirectReturn(depositRef));
    };
    
    cancelReturn = () => {
        const { dispatch } = this.props;
        dispatch(depositActions.activateSpinner());
    };

    render() {
        const { deposit, customerProfile: { hasFirstDeposit, unrecoverableError } } = this.props;

        return (
            <div className="slide-right">
                { !unrecoverableError && getContent(deposit, hasFirstDeposit, this.redirectReturn, this.cancelReturn) }
                <div className="clear"></div>
            </div>
        );
    }
}

TrustlyDepositCtx.propTypes = {
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

export default connect(stateToProps)(TrustlyDepositCtx);
