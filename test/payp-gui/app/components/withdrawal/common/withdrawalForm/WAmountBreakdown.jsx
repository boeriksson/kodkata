import React from 'react';
import PropTypes from 'prop-types';
import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import { getConvertedAmountString } from '../../../common/utils/amountFormatting';
import { translate } from '../../../common/translationActions';

const AmountBreakdown = PaymentComponents.amountBreakdown;

const createAmountBreakdown = ({amount, fee, amountWithFee, currency, exchangeRate}) => {
    let rowIndex = 1;
    const exchRate = exchangeRate ? exchangeRate.exchangeRate : null;
    const exchCurrency = exchangeRate ? exchangeRate.currency : null;
    
    const addFeeRow = (rows) => {
        if (!fee || !rows) {
            return;
        }
        
        let feeHeader;
        let feeStr;
        
        if (fee.hasOwnProperty('percentageFee')) {
            if (fee.percentageFee === 0) {
                return;
            }
            const percentage = fee.percentageFee / 100;
            feeHeader = `(${fee.percentageFee} %)`;
            feeStr = getConvertedAmountString(percentage * amount, currency, exchRate, exchCurrency);
        } else if (fee.hasOwnProperty('fixedFee')) {
            if (fee.fixedFee === 0) {
                return;
            }
            feeHeader = '';
            feeStr = getConvertedAmountString(fee.fixedFee, currency, exchRate, exchCurrency);
        }
        
        rows.push({
            key: 'row' + rowIndex++,
            label: `${translate(`${config.module}.amount.fee`)} ${feeHeader}`,
            value: feeStr,
            testNameLabel: 'AmountBreakdownLabel-Fee',
            testNameValue: 'AmountBreakdownValue-Fee'
        });
    };
    
    const rows = [];
    addFeeRow(rows);
    
    rows.push({
        key: 'row' + rowIndex++,
        label: translate(`${config.module}.amount.total`),
        value: getConvertedAmountString(Math.max(amountWithFee, 0), currency, exchRate, exchCurrency),
        isTotalRow: true,
        testNameLabel: 'AmountBreakdownLabel-Total',
        testNameValue: 'AmountBreakdownValue-Total'
    });
    return rows;
};

const WAmountBreakdown = ({amount, amountWithFee, fee, currency, exchangeRate}) => (
    <AmountBreakdown rows={ createAmountBreakdown({amount, amountWithFee, fee, currency, exchangeRate}) }/>
);

WAmountBreakdown.propTypes = {
    amount: PropTypes.number,
    amountWithFee: PropTypes.number,
    fee: PropTypes.shape({
        percentageFee: PropTypes.number,
        amount: PropTypes.number
    }),
    currency: PropTypes.string,
    exchangeRate: PropTypes.shape({
        exchangeRate: PropTypes.number,
        currency: PropTypes.string
    })
};

export default WAmountBreakdown;
