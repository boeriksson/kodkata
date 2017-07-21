import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const containerStyles = (props) => props.theme.skins.Logo.Container(props);
const StyledContainer = styled.div`${containerStyles}`;

const getImgDivStyle = (countryCode) => {
    const defaultImgDivStyle = {
        height: '50px',
        width: '80px',
        backgroundSize: '80px 50px',
        border: '1px solid #e3e3e3',
        borderRadius: '2px'
    };
    
    switch (countryCode) {
        case 'SE':
            return {
                ...defaultImgDivStyle,
                border: 'none',
                backgroundImage: `url(${require('./logos/trustly_general_SE.png')})`
            };
        case 'DK':
            return {
                ...defaultImgDivStyle,
                backgroundImage: `url(${require('./logos/trustly_general_DK.svg')})`
            };
        case 'IT':
            return {
                ...defaultImgDivStyle,
                backgroundImage: `url(${require('./logos/trustly_general_IT.svg')})`
            };
        case 'LT':
            return {
                ...defaultImgDivStyle,
                backgroundImage: `url(${require('./logos/trustly_general_LT.svg')})`
            };
        case 'RO':
            return {
                ...defaultImgDivStyle,
                backgroundImage: `url(${require('./logos/trustly_general_RO.svg')})`
            };
        default:
            return {
                height: '31px',
                width: '100px',
                backgroundSize: '100px 31px',
                backgroundImage: `url(${require('./logos/trustly_general.png')})`
            };
    }
};

const Logo = ({countryCode}) => (
    <StyledContainer>
        <div style={getImgDivStyle(countryCode)}></div>
    </StyledContainer>
);

Logo.propTypes = {
    countryCode: PropTypes.string
};

export default Logo;
