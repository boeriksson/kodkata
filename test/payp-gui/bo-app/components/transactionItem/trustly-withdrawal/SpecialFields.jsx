import React, { PropTypes } from 'react';

const SpecialFields = ({ withdrawal }) => (
    <div>
        <div className="TransactionItem-Key">bankAccountNumber</div>
        <div className="TransactionItem-Value">{ withdrawal.bankAccountNumber }</div>
        <div className="TransactionItem-Key">bankName</div>
        <div className="TransactionItem-Value">{ withdrawal.bankName }</div>
    </div>
);

SpecialFields.propTypes = {
    deposit: PropTypes.object,
    withdrawal: PropTypes.object
};

export default SpecialFields;
