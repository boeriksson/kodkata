import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import ShortButtons from './ShortButtons.jsx';
import depositActions from '../depositActions';
import { fromString } from '../../../common/utils/amountFormatting';
import { amountIsValid, getAmountMessage } from '../depositHelper';

const AmountInput = PaymentComponents.amountInput;

const AmountElement = ({
    deposit,
    customerProfile,
    dispatch
}) => {
    const quickButton = (e) => dispatch(depositActions.amountInput(fromString(e.target.textContent), true));
    const onChange = (value) => dispatch(depositActions.amountInput(fromString(value)));
    const { quickAmount1, quickAmount2, quickAmount3 } = deposit.settings;
    const isQuickButtonClicked = deposit.isQuickButtonClicked;
    const isValid = amountIsValid(deposit, customerProfile);
    return (
        <div>
            <AmountInput
                amount={ deposit.amount.amount }
                format={ customerProfile.format }
                onChange={ onChange }
                isValid={ isValid }
                message={ getAmountMessage(deposit, customerProfile) }
                isQuickButtonClicked={ isQuickButtonClicked }
            />
            <ShortButtons min={quickAmount1} medium={quickAmount2} max={quickAmount3} quickButton={quickButton}/>
        </div>
    );
};

AmountElement.propTypes = {
    deposit: PropTypes.object,
    dispatch: PropTypes.func
};

function stateToProps({ deposit, customerProfile }) {
    return {
        deposit,
        customerProfile
    };
}

export default connect(stateToProps)(AmountElement);
