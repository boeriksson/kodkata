import React, { PropTypes } from 'react';

const States = ({isStateFound, successStyle, headerStyle}) => {
    if (isStateFound) {
        return (
            <div style={successStyle}>
                <p style={headerStyle}>TRUSTLY_DEPOSIT.DEPOSIT</p>
                INITIATE<br />
                VALIDATE<br />
                CREATE_ORDER<br />
                PENDING_NOTIFICATION<br />
                EXECUTE<br />
                PENDING_TRANSACTION_ACCEPTANCE<br />
                PENDING_TRANSACTION_RESPONSE_DELAYED<br />
                DEPOSIT_SUCCESSFUL<br />
                FAILED<br />
            </div>
        );
    }
    return (
        <div style={successStyle}>
            <p style={headerStyle}>TRUSTLY_DEPOSIT.WITHDRAWAL</p>
            No withdrawals found <br />
        </div>
    );
};

States.propTypes = {
    isStateFound: PropTypes.bool.isRequired,
    successStyle: PropTypes.object,
    headerStyle: PropTypes.object
};

States.defaultProps = {
    successStyle: {},
    headerStyle: {}
};

export default States;
