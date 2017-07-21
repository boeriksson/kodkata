import React from 'react';
import PropTypes from 'prop-types';
import CoreComponents from '@kindred-payment/pay-provider-ui-common/lib/CoreComponents';

import { getConvertedAmountString } from '../../../common/utils/amountFormatting';
import { translate } from '../../../common/translationActions';

const Button = CoreComponents.button;

const WithdrawalButton = ({
                              onSubmit,
                              isValid,
                              amountWithFee,
                              currency,
                              exchangeRate
                          }) => {
    const getDefaultText = () => {
        const buttonText = translate(`${config.module}.button`);
        const exchRate = exchangeRate ? exchangeRate.exchangeRate : null;
        const exchCurrency = exchangeRate ? exchangeRate.currency : null;
        
        const amount = getConvertedAmountString(Math.max(amountWithFee, 0), currency, exchRate, exchCurrency);
        
        return `${buttonText} ${amount}`;
    };
    const text = getDefaultText();

    return (
        <Button kind="primary" block className="submitFormButton" disabled={ !isValid }
                onClick={ onSubmit } testName="WithdrawalButton">
            { text }
        </Button>
    );
};

WithdrawalButton.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    amountWithFee: PropTypes.number.isRequired,
    currency: PropTypes.string,
    exchangeRate: PropTypes.shape({
        exchangeRate: PropTypes.number,
        currency: PropTypes.string
    })
};

export default WithdrawalButton;
