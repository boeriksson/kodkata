import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import context from 'context';

import CoreComponents from '@kindred-payment/pay-provider-ui-common/lib/CoreComponents';
import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import DepositMethodInfo from '../../common/depositMethodInfo/DepositMethodInfo.jsx';
import { submit, acceptFundsAndProtection } from '../../common/depositActions';
import AmountElement from '../../common/amountElement/AmountElement.jsx';
import testResize from '../../../common/utils/resize';
import BankElements from '../../MODULE/BankElements.jsx';
import {clearMessages, notify} from '../../../common/notificationActions';
import {disableButton, isRGLimitReached} from '../depositHelper';
import amountFormatting from '../../../common/utils/amountFormatting';
import {translate} from '../../../common/translationActions';
import {getRGDepositLimitMessage} from '../../../common/customerProfileActions';
import FundsProtection from '../../common/fundsProtection/FundsProtection';

const IS_TRUSTLY_DEPOSIT = context.methodKey === 'trustly-deposit';

const Button = CoreComponents.button;
const Icon = CoreComponents.icon;
const AmountBreakdown = PaymentComponents.amountBreakdown;
const TwoColumnLayout = PaymentComponents.twoColumnLayout;
const SelectOtherMethods = PaymentComponents.selectOtherMethods;

const styles = (props) => props.theme.skins.Form(props);
const StyledForm = styled.div`${styles}`;

class DepositForm extends React.Component {
    componentDidUpdate = () => testResize();
    
    componentDidMount = () => {
        const { deposit, customerProfile } = this.props;
    
        if (isRGLimitReached(deposit, customerProfile)) {
            this.props.dispatch(notify(getRGDepositLimitMessage(customerProfile), true));
        }
    
        testResize();
    };
    
    onSubmitDeposit = () => {
        const {dispatch, iframe, customerProfile, deposit} = this.props;
        const {notificationNeedsApproval, acceptedVersion, notificationVersion} =
            customerProfile.customerNotificationResource;
        
        dispatch(clearMessages());
        const doDeposit = () => {
            // this prepares for the deposit. Should be kept close to button click to avoid popup blockers.
            // TODO: Send dispatch as prop instead to not go asynch before opening popup!
            dispatch(submit({
                ...deposit,
                amount: {...deposit.amount, currencyCode: customerProfile.currency},
                iframe
            }));
        };
        
        if (notificationNeedsApproval && acceptedVersion !== notificationVersion) {
            dispatch(acceptFundsAndProtection(notificationVersion, doDeposit));
        } else {
            doDeposit();
        }
    };
    
    createAmountBreakdown = (feeString, feeAmount, userAmount, totalAmount) => {
        let rowIndex = 1;
        const rows = [{
            key: 'row' + rowIndex++,
            label: translate('paycashierclient.deposit.amount.deposit'),
            value: amountFormatting.toString(userAmount, false, null, true),
            testNameLabel: 'AmountBreakdownLabel-Amount',
            testNameValue: 'AmountBreakdownValue-Amount'
        }];
        
        if (feeString) {
            rows.push({
                key: 'row' + rowIndex++,
                label: translate('paycashierclient.deposit.amount.fee', {fee: feeString}),
                value: amountFormatting.toString(feeAmount, false, null, true),
                testNameLabel: 'AmountBreakdownLabel-Fee',
                testNameValue: 'AmountBreakdownValue-Fee'
            });
        }
        
        rows.push({
            key: 'row' + rowIndex++,
            label: translate('paycashierclient.deposit.amount.total'),
            value: amountFormatting.toString(totalAmount, false, null, true),
            isTotalRow: true,
            testNameLabel: 'AmountBreakdownLabel-Total',
            testNameValue: 'AmountBreakdownValue-Total'
        });
        return rows;
    };
    
    render() {
        const {deposit, customerProfile, dispatch} = this.props;
        const userAmount = deposit.amount.amount;
        const {feeString, feeAmount} = deposit.settings.fee;
        const totalAmount = userAmount + feeAmount;
        
        const amountBreakdownRows =
            this.createAmountBreakdown(feeString, feeAmount, userAmount, totalAmount);
        
        const popupIcon = IS_TRUSTLY_DEPOSIT ? <div></div> : <Icon icon="openInPopUp"/>;
    
        const isFormDisabled = isRGLimitReached(deposit, customerProfile);
        const getSelectOtherMethodTag = (tight) => (
            <SelectOtherMethods
                text={translate('paycashierclient.common.deposit.selectOtherMethod')} tight={tight} />
        );
        
        return (
            <div>
                {isFormDisabled && getSelectOtherMethodTag(true)}
                <StyledForm disabled={isFormDisabled}>
                    <TwoColumnLayout
                        id="depositFlow" testName="DepositForm_test"
                        firstColumnContent={
                            <div>
                                <div className="two-column-inner">
                                    {!isFormDisabled && getSelectOtherMethodTag(false)}
                                    <DepositMethodInfo deposit={ deposit }/>
                                </div>
                                <div className="two-column-inner">
                                
                                </div>
                            </div>
                        }
                        secondColumnContent={
                            <div className="two-column-inner">
                                <BankElements deposit={ deposit } dispatch={ dispatch }/>
                                
                                <div className="AmountModule">
                                    <AmountElement/>
                                    <AmountBreakdown rows={amountBreakdownRows}/>
                                    <FundsProtection />
                                    <Button kind="primary" block className="submitFormButton"
                                            disabled={ disableButton(deposit, customerProfile) }
                                            onClick={ this.onSubmitDeposit }
                                            testName="DepositButton"
                                    >
                                        <span>
                                            { translate('paycashierclient.deposit.amount.pay', {
                                                amount: amountFormatting.toString(totalAmount, false, null, true)
                                            }) }
                                        </span>
                                        {popupIcon}
                                    </Button>
                                </div>
                            </div>
                        }
                    />
                </StyledForm>
            </div>
        );
    }
}

DepositForm.propTypes = {
    customerProfile: PropTypes.object.isRequired,
    deposit: PropTypes.object.isRequired
};

function stateToProps({customerProfile, deposit}) {
    return {
        customerProfile,
        deposit
    };
}

export default connect(stateToProps)(DepositForm);
