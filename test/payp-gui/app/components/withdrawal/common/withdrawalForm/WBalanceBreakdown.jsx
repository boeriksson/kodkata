import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import amountFormatting from '../../../common/utils/amountFormatting';
import { translate } from '../../../common/translationActions';

const containerStyles = (props) => props.theme.skins.WBalanceBreakdown.Container(props);

const StyledContainer = styled.div`${containerStyles}`;

function getMaxLimitSection(maxLimit) {
    return maxLimit ? (
        <tr>
            <td className="headerCell" data-test-name="WBalanceBreakdown-balanceAmountMaxLabel">
                { translate(`${config.module}.amount.maximum`) }
            </td>
            <td className="valueCell">
                <span
                    data-test-name="WBalanceBreakdown-balanceAmountValue">
                    { amountFormatting.toString(parseFloat(maxLimit), false, null, true) }</span>
            </td>
        </tr>
    ) : null;
}

const WBalanceBreakdown = ({
                               totalBalance,
                               availableBalance,
                               maxLimit
                           }) => (
    <StyledContainer>
        <table>
            <tbody>
            <tr>
                <td className="headerCell" data-test-name="WBalanceBreakdown-balanceTotalLabel">
                    { translate(`${config.module}.balance.total`) }
                </td>
                <td className="valueCell balance-bonus">
                    <span
                        data-test-name="WBalanceBreakdown-balanceTotalValue">
                        { amountFormatting.toString(parseFloat(totalBalance.amount), false, null, true) }</span>
                </td>
            </tr>
            <tr>
                <td className="headerCell" data-test-name="WBalanceBreakdown-balanceAvailableLabel">
                    { translate(`${config.module}.balance.available`) }
                </td>
                <td className="valueCell">
                    <span
                        data-test-name="WBalanceBreakdown-balanceAvailableValue">
                        { amountFormatting.toString(parseFloat(availableBalance.amount), false, null, true) }</span>
                </td>
            </tr>
            { getMaxLimitSection(maxLimit, translate) }
            </tbody>
        </table>
    </StyledContainer>
);

WBalanceBreakdown.propTypes = {
    totalBalance: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired
    }),
    availableBalance: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired
    })
};

function stateToProps({
                          customerProfile: { totalBalance, availableBalance },
                          withdrawal: { withdrawalForm: { settings } }
                      }) {
    const maxLimit = settings.maxLimit ? settings.maxLimit.amount : null;

    return {
        totalBalance,
        availableBalance,
        maxLimit
    };
}

export default connect(stateToProps)(WBalanceBreakdown);
