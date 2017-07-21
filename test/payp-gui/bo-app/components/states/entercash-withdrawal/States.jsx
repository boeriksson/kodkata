import React, { PropTypes } from 'react';

const States = ({isStateFound, successStyle, headerStyle}) => {
    if (isStateFound) {
        return (
            <div style={successStyle}>
                <p style={headerStyle}>ENTERCASH_WITHDRAWAL.WITHDRAWAL</p>
                INITIATE<br />
                VALIDATE<br />
                RESERVE_FUNDS<br />
                AWAIT_FUNDS<br />
                AWAIT_APPROVAL<br />
                CREATE_ORDER<br />
                APPROVE<br />
                PENDING_PROVIDER<br />
                WITHDRAWAL_SUCCESSFUL<br />
                REVERSE<br />
                REVERSAL_SUCCESSFUL<br />
                FAILED<br />
            </div>
        );
    }
    return (
        <div style={successStyle}>
            <p style={headerStyle}>ENTERCASH_WITHDRAWAL.WITHDRAWAL</p>
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
