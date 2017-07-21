import React, { PropTypes } from 'react';

const States = ({isStateFound, successStyle, headerStyle}) => {
    if (isStateFound) {
        return (
            <div style={successStyle}>
                <p style={headerStyle}>TRUSTLY_WITHDRAWAL.WITHDRAWAL</p>
                CREATE_WITHDRAWAL<br />
                AWAIT_APPROVAL<br />
                PAYOUT<br />
                REVERSE<br />
                REVERSE_SUCCESSFUL<br />
                FAILED<br />
                WITHDRAWAL_SUCCESSFUL<br />
            </div>
        );
    }
    return (
        <div style={successStyle}>
            <p style={headerStyle}>TRUSTLY_WITHDRAWAL.WITHDRAWAL</p>
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
