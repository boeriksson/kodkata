import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CoreComponents from '@kindred-payment/pay-provider-ui-common/lib/CoreComponents';
import { translate } from '../../../common/translationActions';
import accountActions from './../accountActions';
import withdrawalActions from '../../common/withdrawalActions';

const RadioButtonList = CoreComponents.radioButtonList;

const Link = CoreComponents.link;

const BankInfo = ({ bankAccounts, accountId, dispatch }) => {
    const selectAccount = () => dispatch(accountActions.selectAccount());

    const radioButtonListOptions = bankAccounts ? bankAccounts.map((bankAccount) => { // eslint-disable-line
        return {
            key: bankAccount.accountId,
            value: {
                label: bankAccount.bankName,
                content: bankAccount.bankAccount,
                contentIsRightAligned: true
            }
        };
    }) : [];

    const getBankAccByAccId = (key) => bankAccounts.filter((account) => account.accountId === key)[0].bankAccount;

    const onSelectChange = (key) => {
        dispatch(withdrawalActions.setBankAccount(getBankAccByAccId(key), key));
    };

    return (
        <div data-test-name="BankInfo_test">
            <RadioButtonList options={radioButtonListOptions}
                             selected={accountId}
                             onSelectionChange={onSelectChange}
            />
            <Link href="#" onClick={ selectAccount } testName="AddAccountLink_test">
                { translate('trustly-withdrawal.addNewAccount') }
            </Link>
        </div>
    );
};

BankInfo.propTypes = {
    bankAccounts: PropTypes.arrayOf(PropTypes.shape({
        accountId: PropTypes.string.isRequired,
        bank: PropTypes.string,
        bankAccount: PropTypes.string.isRequired
    }))
};

function stateToProps({ withdrawal: { withdrawalForm: { bankAccounts, accountId } } }) {
    return {
        bankAccounts,
        accountId
    };
}

export default connect(stateToProps)(BankInfo);
