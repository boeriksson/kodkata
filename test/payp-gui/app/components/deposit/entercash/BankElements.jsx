import React from 'react';
import PropTypes from 'prop-types';
import SelectBankElement from './SelectBankElement.jsx';
import depositActions from '../common/depositActions';

const BankElements = ({ deposit, dispatch }) => {
    function changeBankSelected(option) {
        dispatch(depositActions.selectBank(numberOrString(option)));
    }

    function changePayerBankSelected(option) {
        dispatch(depositActions.selectPayerBank(numberOrString(option)));
    }
    
    function numberOrString(str) {
        const parsed = parseInt(str, 10);
        if (!isNaN(parsed)) {
            return parsed;
        }
        return str;
    }

    if (!deposit) return <div></div>;

    return (
        <div>
            <SelectBankElement
                availableBanks={ deposit.settings.availableBanks }
                selectedBank={ deposit.selectedBankId }
                onChangeBankSelected={ changeBankSelected }
                testName="AvailableBanks"
            />
            <SelectBankElement
                availableBanks={ deposit.settings.availablePayerBanks || [] }
                selectedBank={ deposit.selectedPayerBankId }
                onChangeBankSelected={ changePayerBankSelected }
                testName="AvailablePayerBanks"
            />
        </div>
    );
};

BankElements.propTypes = {
    deposit: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default BankElements;

