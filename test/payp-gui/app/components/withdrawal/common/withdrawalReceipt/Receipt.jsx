import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CoreComponents from '@kindred-payment/pay-provider-ui-common/lib/CoreComponents';
import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import { getConvertedAmountString } from '../../../common/utils/amountFormatting';
import withdrawalActions from '../withdrawalActions';
import { translate } from '../../../common/translationActions';

import testResize from '../../../common/utils/resize';

const Icon = CoreComponents.icon;
const TwoColumnLayout = PaymentComponents.twoColumnLayout;

const rowStyles = (props) => props.theme.skins.Receipt.Row(props);
const headerStyles = (props) => props.theme.skins.Receipt.Header(props);
const titleStyles = (props) => props.theme.skins.Receipt.Title(props);
const valueStyles = (props) => props.theme.skins.Receipt.Value(props);
const successStyles = (props) => props.theme.skins.Receipt.Success(props);

const StyledRow = styled.div`${rowStyles}`;
const StyledHeader = styled.div`${headerStyles}`;
const StyledTitle = styled.h3`${titleStyles}`;
const StyledValue = styled.div`${valueStyles}`;
const StyledSuccess = styled.div`${successStyles}`;

function getFeeSection(withdrawal, currency, exchRate, exchCurrency) {
    if (!withdrawal.withdrawalForm.settings && !withdrawal.withdrawalForm.settings.fee) {
        return null;
    }

    const { percentageFee, fixedFee } = withdrawal.withdrawalForm.settings.fee
    || { percentageFee: null, fixedFee: null };

    let feeStr;

    if (percentageFee || percentageFee === 0) {
        const percentage = percentageFee / 100;
        feeStr = getConvertedAmountString(
            percentage * withdrawal.withdrawalForm.amount.amount, currency, exchRate, exchCurrency);
    } else if (fixedFee || fixedFee === 0) {
        feeStr = getConvertedAmountString(fixedFee, currency, exchRate, exchCurrency);
    } else {
        return <div></div>;
    }

    return (
        <StyledRow>
            <StyledHeader data-test-name="WithdrawalReceipt-feeLabel">
                { translate(`${config.module}.receipt.fee`) }
            </StyledHeader>
            <StyledValue>
                <span data-test-name="WithdrawalReceipt-feeValue">{ feeStr }</span>
            </StyledValue>
        </StyledRow>
    );
}

class WithdrawalReceipt extends Component {

    componentDidUpdate = () => testResize();

    componentDidMount = () => testResize();

    render() {
        const { customerProfile, withdrawal } = this.props;
        const {currency} = customerProfile;
        const exchangeRate = withdrawal.withdrawalForm.settings.exchangeRate;
        const exchRate = exchangeRate ? exchangeRate.exchangeRate : null;
        const exchCurrency = exchangeRate ? exchangeRate.currency : null;
        
        withdrawalActions.postWithdrawalCompleted(withdrawal);
        const feeAmountRow = getFeeSection(withdrawal, currency, exchRate, exchCurrency);

        return (
            <TwoColumnLayout
                className="WithdrawalReceipt" testName="Receipt_test"
                firstColumnContent={
                    <div className="two-column-inner">
                        <StyledTitle data-test-name="WithdrawalReceipt-header">
                            { translate(`${config.module}.receipt.title`) }</StyledTitle>
                        <StyledSuccess>
                            <div>
                                <Icon icon="success"/>
                            </div>
                            <div>
                                <h4 data-test-name="WithdrawalReceipt-title">
                                    { translate(`${config.module}.receipt.header`) }
                                </h4>
                                <p data-test-name="WithdrawalReceipt-message">
                                    { translate(`${config.module}.receipt.text`) }
                                </p>
                            </div>
                        </StyledSuccess>
                    </div>
                }
                secondColumnContent={
                    <div className="two-column-inner">
                        <div>
                            <StyledRow>
                                <StyledHeader data-test-name="WithdrawalReceipt-transactionIdLabel">
                                    { translate(`${config.module}.receipt.transactionId`) }
                                </StyledHeader>
                                <StyledValue data-test-name="WithdrawalReceipt-transactionIdValue">
                                    { withdrawal.receipt.transactionId }</StyledValue>
                            </StyledRow>
                            <StyledRow>
                                <StyledHeader data-test-name="WithdrawalReceipt-amountLabel">
                                    { translate(`${config.module}.receipt.amount`) }
                                </StyledHeader>
                                <StyledValue>
                                    <span data-test-name="WithdrawalReceipt-amountValue">
                                        { getConvertedAmountString(
                                            withdrawal.withdrawalForm.amount.amount, currency, exchRate, exchCurrency) }
                                    </span>
                                </StyledValue>
                            </StyledRow>
                            { feeAmountRow }
                            <StyledRow isOnTotalRow={true}>
                                <StyledHeader data-test-name="WithdrawalReceipt-totalLabel">
                                    { translate(`${config.module}.receipt.total-amount`) }
                                </StyledHeader>
                                <StyledValue>
                                    <span data-test-name="WithdrawalReceipt-totalValue">
                                        { getConvertedAmountString(
                                            withdrawal.amountWithFee, currency, exchRate, exchCurrency) }
                                    </span>
                                </StyledValue>
                            </StyledRow>
                        </div>
                    </div>
                }
            />
        );
    }
}

WithdrawalReceipt.propTypes = {
    customerProfile: PropTypes.object.isRequired,
    withdrawal: PropTypes.shape({
        withdrawalForm: PropTypes.shape({
            withdrawalRef: PropTypes.string.isRequired,
            amount: PropTypes.shape({
                amount: PropTypes.number.isRequired,
                currencyCode: PropTypes.string
            }).isRequired,
            customerBankId: PropTypes.string,
            customerNameInBank: PropTypes.string,
            customerBankAccountNumber: PropTypes.string,
            settings: PropTypes.object
        }),
        amountWithFee: PropTypes.number.isRequired
    }).isRequired
};

function stateToProps({ customerProfile, withdrawal }) {
    return {
        customerProfile,
        withdrawal
    };
}

export default connect(stateToProps)(WithdrawalReceipt);
