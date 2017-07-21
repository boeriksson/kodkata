import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CoreComponents from '@kindred-payment/pay-provider-ui-common/lib/CoreComponents';
import THEMEHOLDER from '@kindred-payment/pay-provider-ui-common/lib/THEMEHOLDER.js';

import amountFormatting from '../../../common/utils/amountFormatting';

const Button = CoreComponents.button;
const theme = THEMEHOLDER;

const containerStyles = (props) => props.theme.skins.ShortButtons.Container(props);
const StyledContainer = styled.div`${containerStyles}`;

const buttonKind = theme.name === 'kolikkopelit' ? 'base' : 'secondary';

const ShortButtons = ({ min, medium, max, quickButton }) => (
    <StyledContainer>
        <Button kind={buttonKind} tabIndex="-1"
                onClick={ quickButton } testName="AmountElement-leftButton">
            <span>{ amountFormatting.toString(min) }</span>
        </Button>
        <Button kind={buttonKind} tabIndex="-1"
                onClick={ quickButton } testName="AmountElement-centerButton">
            <span>{ amountFormatting.toString(medium) }</span>
        </Button>
        <Button kind={buttonKind} tabIndex="-1"
                onClick={ quickButton } testName="AmountElement-rightButton">
            <span>{ amountFormatting.toString(max) }</span>
        </Button>
    </StyledContainer>
);

ShortButtons.propTypes = {
    min: PropTypes.number,
    medium: PropTypes.number,
    max: PropTypes.number,
    quickButton: PropTypes.func
};

export default ShortButtons;
