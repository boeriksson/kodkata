import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { IS_SIIRTO_DEPOSIT } from '../../common/depositActions';

const containerStyles = (props) => props.theme.skins.Logo.Container(props);
const StyledContainer = styled.div`${containerStyles}`;

class Logo extends React.Component {
    getImgDivStyle = (countryCode, forceGenericLogo) => {
        if (forceGenericLogo) {
            return {
                width: '85px',
                height: '30px',
                backgroundSize: '85px 30px',
                backgroundImage: `url(${require('./logos/generic_bank_transfer.svg')})`
            };
        } else if (IS_SIIRTO_DEPOSIT) {
            return {
                width: '61px',
                height: '32px',
                backgroundSize: '61px 32px',
                backgroundImage: `url(${require('./logos/siirto.png')})`
            };
        }
        
        switch (countryCode) {
            case 'SE':
                return {
                    width: '210px',
                    height: '30px',
                    backgroundSize: '210px 30px',
                    backgroundImage: `url(${require('./logos/entercash_general_se.png')})`
                };
            case 'FI':
                return {
                    width: '247px',
                    height: '30px',
                    backgroundSize: '247px 30px',
                    backgroundImage: `url(${require('./logos/entercash_general_fi.png')})`
                };
            case 'NL':
                return {
                    width: '120px',
                    height: '30px',
                    backgroundSize: '120px 30px',
                    backgroundImage: `url(${require('./logos/entercash_general_ideal.png')})`
                };
            case 'BE':
                return {
                    width: '120px',
                    height: '30px',
                    backgroundSize: '120px 30px',
                    backgroundImage: `url(${require('./logos/entercash_general_ideal.png')})`
                };
            case 'EE':
                return {
                    width: '250px',
                    height: '31px',
                    backgroundSize: '250px 31px',
                    backgroundImage: `url(${require('./logos/entercash_general_ee.png')})`
                };
            default:
                return {
                    width: '91px',
                    height: '21px',
                    backgroundSize: '91px 21px',
                    backgroundImage: `url(${require('./logos/entercash_general.png')})`
                };
        }
    };
    
    isForcedGenericLogo = (countryCode, deposit) => {
        // Special treatment for situations when a country shall display the generic logo instead of the normal
        // country logo.
        if (!IS_SIIRTO_DEPOSIT && (countryCode === 'NL' || countryCode === 'BE')) {
            // TODO: Change this ugly solution when the get-deposit-form backend service returns accountType.
            return deposit.settings.availableBanks && deposit.settings.availableBanks.length > 1;
        }
        return false;
    };
    
    render() {
        const {countryCode, deposit} = this.props;
        const forceGenericLogo = this.isForcedGenericLogo(countryCode, deposit);
        
        return (
            <StyledContainer>
                <div style={this.getImgDivStyle(countryCode, forceGenericLogo)}></div>
            </StyledContainer>
        );
    }
}

Logo.propTypes = {
    countryCode: PropTypes.string,
    deposit: PropTypes.object
};

function stateToProps({deposit}) {
    return {
        deposit
    };
}

export default connect(stateToProps)(Logo);
