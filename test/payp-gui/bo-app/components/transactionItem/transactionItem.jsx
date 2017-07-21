import React, { PropTypes } from 'react';

import SpecialFields from './MODULE/SpecialFields.jsx';

require('./theme-bo.scss');

const TransactionItem = ({
    deposit,
    withdrawal
}) => {
    const { amount, fee, created, site, notFound, bankAccountNationalId, customerAddress } = deposit || withdrawal;

    if (notFound) {
        return (<div className="TransactionItem">Transaction not found</div>);
    }

    const ssnField = bankAccountNationalId
        ? <div>
            <div className="TransactionItem-Key">SSN:</div>
            <div className="TransactionItem-Value">{ bankAccountNationalId }</div>
        </div>
        : <div></div>;
        
    const addressField = customerAddress
        ? <div>
            <div className="TransactionItem-Key">Address:</div>
            <div className="TransactionItem-Value">{ customerAddress }</div>
        </div>
        : <div></div>;

    return (
        <div className="TransactionItem">
            <div className="TransactionItem-Key">Reference:</div>
            <div className="TransactionItem-Value">{ deposit ? deposit.depositRef : withdrawal.withdrawalRef }</div>
            <div className="TransactionItem-Key">transactionId:</div>
            <div className="TransactionItem-Value">{ deposit ? deposit.transactionId : withdrawal.transactionId }</div>
            <div className="TransactionItem-Key">State:</div>
            <div className="TransactionItem-Value">{ deposit ? deposit.status : withdrawal.status }</div>
            <div className="TransactionItem-Key">Amount:</div>
            <div className="TransactionItem-Value">
                <span>{ amount.amount } { amount.currencyCode }</span>
            </div>
            <div className="TransactionItem-Key">Fee:</div>
            <div className="TransactionItem-Value">
                <span>{ fee.amount } { fee.currencyCode }</span>
            </div>
            <div className="TransactionItem-Key">Created:</div>
            <div className="TransactionItem-Value">{ new Date(Date.parse(created)).toLocaleString("sv-SE") }</div>
            <div className="TransactionItem-Key">Site:</div>
            <div className="TransactionItem-Value">{ site }</div>
            <SpecialFields deposit={ deposit } withdrawal={ withdrawal } />

            {ssnField}
            {addressField}
            
            <div className="TransactionItem-Key">&nbsp;</div>
            <div className="TransactionItem-Value">&nbsp;</div>
        </div>
    );
};

TransactionItem.propTypes = {
    deposit: PropTypes.object,
    withdrawal: PropTypes.object
};

export default TransactionItem;
