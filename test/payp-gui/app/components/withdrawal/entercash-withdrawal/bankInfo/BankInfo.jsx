import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CoreComponents from '@kindred-payment/pay-provider-ui-common/lib/CoreComponents';
import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import withdrawalActions from '../../common/withdrawalActions';
import { translate } from '../../../common/translationActions';

const InputText = CoreComponents.inputText;
const FormLabel = PaymentComponents.formLabel;

const containerStyles = (props) => props.theme.skins.BankInfoEntercash.Container(props);
const flexContainerStyles = (props) => props.theme.skins.BankInfoEntercash.FlexContainer(props);
const clearingStyles = (props) => props.theme.skins.BankInfoEntercash.Clearing(props);
const accountStyles = (props) => props.theme.skins.BankInfoEntercash.Account(props);

const StyledContainer = styled.div`${containerStyles}`;
const StyledFlexContainer = styled.div`${flexContainerStyles}`;
const StyledClearing = styled.div`${clearingStyles}`;
const StyledAccount = styled.div`${accountStyles}`;

const BankInfo = ({
    withdrawal,
    dispatch
}) => {
    let bankNameInput;
    let clearingInput;
    let accountInput;
    
    function onChangeName(e) {
        const value = e.target.value.replace(/\s+/g, ' ').replace(/^\s/, '');
        dispatch(withdrawalActions.setWithdrawalProperty(e.target.id, value));
    }
    function onChangeId(e) {
        const value = e.target.value.replace(/([^a-z0-9]+)/gi, '');
        dispatch(withdrawalActions.setWithdrawalProperty(e.target.id, value));
    }
    
    function doFocusBankName() {
        bankNameInput.focus();
    }
    
    function doFocusClearing() {
        clearingInput.focus();
    }
    
    function doFocusAccount() {
        accountInput.focus();
    }

    return (
        <StyledContainer data-test-name="BankInfo_test">
            <FormLabel className="form-label-top" testName="BankInfoLabel-Name">
                {translate('entercash-withdrawal.bankInfo.name')}
            </FormLabel>
            <InputText id="customerNameInBank" data-test-name="CustomerNameInBank_test" autoComplete="cc-name"
                       onChange={onChangeName} onContainerTouch={ doFocusBankName } width="100%"
                       value={withdrawal.withdrawalForm.customerNameInBank}
                       innerRef={ (input) => {
                           bankNameInput = input;
                       } }
            />
        
            <StyledFlexContainer>
                <StyledClearing>
                    <FormLabel testName="BankInfoLabel-Clearing">
                        {translate('entercash-withdrawal.bankInfo.clearing')}
                    </FormLabel>
                    <InputText id="customerBankId" data-test-name="CustomerBankId_test"
                               onChange={onChangeId} onContainerTouch={ doFocusClearing }
                               value={withdrawal.withdrawalForm.customerBankId}
                               innerRef={ (input) => {
                                   clearingInput = input;
                               } }
                    />
                </StyledClearing>
            
                <StyledAccount>
                    <FormLabel testName="BankInfoLabel-Account">
                        {translate('entercash-withdrawal.bankInfo.account')}
                    </FormLabel>
                    <InputText id="customerBankAccountNumber" data-test-name="CustomerBankAccountNumber_test"
                               onChange={onChangeId} onContainerTouch={ doFocusAccount } width="100%"
                               value={withdrawal.withdrawalForm.customerBankAccountNumber}
                               innerRef={ (input) => {
                                   accountInput = input;
                               } }
                    />
                </StyledAccount>
            </StyledFlexContainer>
        </StyledContainer>
    );
};

BankInfo.propTypes = {
    withdrawal: PropTypes.shape({
        withdrawalForm: PropTypes.shape({
            amount: PropTypes.shape({
                amount: PropTypes.number.isRequired,
                currencyCode: PropTypes.string
            }).isRequired,
            customerBankId: PropTypes.string,
            customerNameInBank: PropTypes.string,
            customerBankAccountNumber: PropTypes.string
        })
    }).isRequired
};

function stateToProps({ withdrawal }) {
    return {
        withdrawal
    };
}

export default connect(stateToProps)(BankInfo);
