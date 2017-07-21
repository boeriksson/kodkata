import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import WBalanceBreakdown from './WBalanceBreakdown.jsx';
import WAmountBreakdown from './WAmountBreakdown.jsx';
import WithdrawalButton from './WithdrawalButton.jsx';
import { submit, setAmount } from '../withdrawalActions';
import amountFormatting, { fromString } from '../../../common/utils/amountFormatting';
import { translate } from '../../../common/translationActions';
import testResize from '../../../common/utils/resize';
import BankInfo from '../../MODULE/bankInfo/BankInfo.jsx';
import WithdrawalInfo from '../withdrawalInfo/WithdrawalInfo.jsx';

const styles = (props) => props.theme.skins.Form(props);

const StyledForm = styled.div`${styles}`;

const AmountInput = PaymentComponents.amountInput;
const SelectOtherMethods = PaymentComponents.selectOtherMethods;
const TwoColumnLayout = PaymentComponents.twoColumnLayout;

function validateAmount(withdrawal, customerProfile) {
    let amountIsValid = true;
    let amountShowIsValid = true; // Initially we do not want to alert the input field
    const { minLimit, maxLimit } = withdrawal.withdrawalForm.settings;
    let message = `${translate(`${config.module}.amount.message.minimum`)} ${
        amountFormatting.toString(minLimit.amount, false, null, true)}`;
    const amount = withdrawal.withdrawalForm.amount.amount;

    if (amount === 0) {
        amountIsValid = false;
    } else if (amount < withdrawal.withdrawalForm.settings.minLimit.amount) {
        amountIsValid = false;
        if (amount !== 0) {
            message = `${translate(`${config.module}.amount.message.minimum`)} ${
                amountFormatting.toString(minLimit.amount, false, null, true)}`;
            amountShowIsValid = false;
        }
    } else if (amount > withdrawal.withdrawalForm.settings.maxLimit.amount) {
        amountIsValid = false;
        amountShowIsValid = false;
        message = `${translate(`${config.module}.amount.message.maximum`)} ${
            amountFormatting.toString(maxLimit.amount, false, null, true)}`;
    } else if (amount > customerProfile.availableBalance.amount) {
        amountIsValid = false;
        amountShowIsValid = false;
        message = translate(`${config.module}.amount.message.exceed-balance`);
    }
    return {
        amountIsValid,
        amountShowIsValid,
        message
    };
}

function stateToProps({ customerProfile, withdrawal }) {
    return {
        customerProfile,
        withdrawal
    };
}

class WithdrawalForm extends Component {
    componentDidUpdate = () => testResize();

    componentDidMount = () => testResize();

    onChange = (value) => this.props.dispatch(setAmount(fromString(value)));

    onSubmit = () => this.props.dispatch(submit(this.props.withdrawal.withdrawalForm));

    render() {
        const { customerProfile, withdrawal, validateForm } = this.props;
        const exchangeRate = withdrawal.withdrawalForm.settings.exchangeRate;
        
        const langKey = `${config.module}.selectOtherMethod`;
        let fee = null;
        if (withdrawal.withdrawalForm.settings && withdrawal.withdrawalForm.settings.fee) {
            fee = withdrawal.withdrawalForm.settings.fee;
        }

        const { amountIsValid, amountShowIsValid, message } = validateAmount(withdrawal, customerProfile, translate);
        const isValid = amountIsValid && validateForm(withdrawal);

        return (
            <StyledForm>
                <TwoColumnLayout
                    testName="WithdrawalForm_test"
                    firstColumnContent={
                        <div>
                            <div className="two-column-inner">
                                <SelectOtherMethods text={translate(langKey)}/>
                                <WithdrawalInfo />
                            </div>
                            <div className="two-column-inner">
                                <BankInfo />
                            </div>
                        </div>
                    }
                    secondColumnContent={
                        <div className="two-column-inner">
                            <div>
                                <WBalanceBreakdown balance={ 10000 } bonus={ 100 }/>
                                <AmountInput
                                    amount={ withdrawal.withdrawalForm.amount.amount }
                                    format={ customerProfile.format }
                                    onChange={ this.onChange }
                                    isValid={ amountShowIsValid }
                                    message={ message }
                                />
                                <WAmountBreakdown
                                    amountWithFee={ withdrawal.amountWithFee }
                                    amount={ withdrawal.withdrawalForm.amount.amount }
                                    fee={ fee }
                                    currency={customerProfile.currency}
                                    exchangeRate={exchangeRate}
                                />
                                <WithdrawalButton amountWithFee={ withdrawal.amountWithFee }
                                                  onSubmit={ this.onSubmit }
                                                  isValid={ isValid }
                                                  currency={customerProfile.currency}
                                                  exchangeRate={exchangeRate}
                                />
                            </div>
                        </div>
                    }
                />
            </StyledForm>
        );
    }
}

WithdrawalForm.propTypes = {
    customerProfile: PropTypes.object.isRequired,
    withdrawal: PropTypes.shape({
        withdrawalForm: PropTypes.shape({
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
    }).isRequired,
    validateForm: PropTypes.func.isRequired
};

export default connect(stateToProps)(WithdrawalForm);
