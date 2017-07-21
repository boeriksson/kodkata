import React, { PropTypes } from 'react';

const SpecialFields = ({ deposit }) => (
    <div>
        <div className="TransactionItem-Key">Bank name:</div>
        <div className="TransactionItem-Value">{ deposit.bankName }</div>
        <div className="TransactionItem-Key">Bank BIC/clearing nr.:</div>
        <div className="TransactionItem-Value">{ deposit.bankClearingOrBic }</div>
        <div className="TransactionItem-Key">Bank account number:</div>
        <div className="TransactionItem-Value">{ deposit.bankAccountNumber }</div>
        <div className="TransactionItem-Key">Bank account owner name:</div>
        <div className="TransactionItem-Value">{ deposit.bankAccountName }</div>
    </div>
);

SpecialFields.propTypes = {
    deposit: PropTypes.object,
    withdrawal: PropTypes.object
};

export default SpecialFields;
