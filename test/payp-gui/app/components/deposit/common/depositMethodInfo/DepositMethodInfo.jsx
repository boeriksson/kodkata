import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';
import context from 'context';

import Logo from '../../MODULE/logo/Logo.jsx';

import amountFormatting from '../../../common/utils/amountFormatting';
import {translate} from '../../../common/translationActions';

const FormLabel = PaymentComponents.formLabel;

const containerStyles = (props) => props.theme.skins.MethodInfo.Container(props);
const titleStyles = (props) => props.theme.skins.MethodInfo.Title(props);
const logoStyles = (props) => props.theme.skins.MethodInfo.Logo(props);
const infoContainerStyles = (props) => props.theme.skins.MethodInfo.InfoContainer(props);
const infoColumnStyles = (props) => props.theme.skins.MethodInfo.InfoColumn(props);
const infoSeparatorStyles = (props) => props.theme.skins.MethodInfo.InfoSeparator(props);

const StyledContainer = styled.div`${containerStyles}`;
const StyledTitle = styled.div`${titleStyles}`;
const StyledLogo = styled.div`${logoStyles}`;
const StyledInfoContainer = styled.div`${infoContainerStyles}`;
const StyledInfoColumn = styled.div`${infoColumnStyles}`;
const StyledInfoSeparator = styled.div`${infoSeparatorStyles}`;

const DepositMethodInfo = ({deposit}) => {
    let currentFee;
    let maxFee;
    let maxFeeText;
    let min;
    let max;
    
    if (deposit) {
        const {fee} = deposit.settings;
        
        if (fee.maxFeeAmount) {
            maxFee = `(${amountFormatting.toString(Number(fee.maxFeeAmount))})`;
            maxFeeText = `(${translate('paycashierclient.common.deposit.maxFee')})`;
        }
        
        if (fee.percentageFee) {
            currentFee = `${fee.percentageFee}%`;
        } else if (fee.fixedFee) {
            currentFee = amountFormatting.toString(fee.fixedFee);
        } else {
            currentFee = translate('paycashierclient.common.deposit.noFee');
        }
        min = amountFormatting.toString(Number(deposit.settings.minLimit.amount));
        max = amountFormatting.toString(Number(deposit.settings.maxLimit.amount));
    }
    
    return (
        <StyledContainer data-test-name="DepositMethodInfo_test">
            <StyledTitle data-test-name="DepositMethodInfo-Title">
                { translate(`${context.methodKey}.title`) }
            </StyledTitle>
            <StyledLogo><Logo countryCode={ deposit.settings.customerCountryCode }/></StyledLogo>
            
            <StyledInfoContainer>
                <StyledInfoColumn>
                    <FormLabel className="Form-label" testName="MethodInfoLabel-Fee">
                        { translate('paycashierclient.common.deposit.fee') }
                        <span className="nobreak">
                            { maxFeeText }
                        </span>
                    </FormLabel>
                    <div data-test-name="MethodInfoValue-Fee">{ currentFee } &nbsp;{ maxFee }</div>
                </StyledInfoColumn>
                
                <StyledInfoSeparator/>
                
                <StyledInfoColumn>
                    <FormLabel className="Form-label" testName="MethodInfoLabel-Min">
                        { translate('paycashierclient.common.deposit.min') }
                    </FormLabel>
                    <div data-test-name="MethodInfoValue-Min">{min}</div>
                </StyledInfoColumn>
                
                <StyledInfoSeparator/>
                
                <StyledInfoColumn>
                    <FormLabel className="Form-label" testName="MethodInfoLabel-Max">
                        {translate('paycashierclient.common.deposit.max')}
                    </FormLabel>
                    <div data-test-name="MethodInfoValue-Max">{max}</div>
                </StyledInfoColumn>
            </StyledInfoContainer>
        </StyledContainer>
    );
};

DepositMethodInfo.propTypes = {
    deposit: PropTypes.object
};

export default DepositMethodInfo;
