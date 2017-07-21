import React from 'react';
import PropTypes from 'prop-types';
import CoreComponents from '@kindred-payment/pay-provider-ui-common/lib/CoreComponents';

const DropDown = CoreComponents.dropDown;

const SelectBankElement = ({
    availableBanks,
    selectedBank,
    onChangeBankSelected,
    testName
}) => { // eslint-disable-line consistent-return
    if (availableBanks) {
        const options = availableBanks.map((s) => ({
            key: s.bankId,
            value: '' + s.bankId,
            name: s.bankName
        }));
        
        const selBank = selectedBank ? '' + selectedBank : '';

        return (
            <DropDown
                options={ options }
                value={ selBank }
                onChange={ onChangeBankSelected }
                testName={ testName }
            />
        );
    }
};

SelectBankElement.propTypes = {
    availableBanks: PropTypes.array,
    selectedBank: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChangeBankSelected: PropTypes.func,
    testName: PropTypes.string
};

export default SelectBankElement;
