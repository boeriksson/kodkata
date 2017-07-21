import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import { translate } from '../../../common/translationActions';

const FormLabel = PaymentComponents.formLabel;

const containerStyles = (props) => props.theme.skins.MethodInfo.Container(props);
const titleStyles = (props) => props.theme.skins.MethodInfo.Title(props);
const infoContainerStyles = (props) => props.theme.skins.MethodInfo.InfoContainer(props);
const infoColumnStyles = (props) => props.theme.skins.MethodInfo.InfoColumn(props);

const StyledContainer = styled.div`${containerStyles}`;
const StyledTitle = styled.div`${titleStyles}`;
const StyledInfoContainer = styled.div`${infoContainerStyles}`;
const StyledInfoColumn = styled.div`${infoColumnStyles}`;

const WithdrawalInfo = () => (
    <StyledContainer data-test-name="WithdrawalInfo_test">
        <StyledTitle data-test-name="WithdrawalInfo-Title">{ translate(`${config.module}.title`) }</StyledTitle>
    
        <StyledInfoContainer>
            <StyledInfoColumn className="WithdrawalInfo-infoColumn">
                <FormLabel className="Form-label" testName="WithdrawalInfoLabel-Time">
                    { translate(`${config.module}.time.expected.title`) }
                </FormLabel>
                <div data-test-name="WithdrawalInfoValue-Time">
                    { translate(`${config.module}.time.expected.text`) }
                </div>
            </StyledInfoColumn>
        </StyledInfoContainer>
    </StyledContainer>
);

export default connect()(WithdrawalInfo);
