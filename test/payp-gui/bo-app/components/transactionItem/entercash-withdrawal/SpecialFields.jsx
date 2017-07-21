import React, { PropTypes } from 'react';

const SpecialFields = ({ withdrawal }) => (
    <div>
        <div className="TransactionItem-Key">Bank BIC/clearing nr.:</div>
        <div className="TransactionItem-Value">{ withdrawal.bankClearingOrBic }</div>
        <div className="TransactionItem-Key">Bank account number:</div>
        <div className="TransactionItem-Value">{ withdrawal.bankAccountNumber }</div>
        <div className="TransactionItem-Key">Bank account owner name:</div>
        <div className="TransactionItem-Value">{ withdrawal.bankAccountName }</div>
    </div>
);

SpecialFields.propTypes = {
    deposit: PropTypes.object,
    withdrawal: PropTypes.object
};

export default SpecialFields;
