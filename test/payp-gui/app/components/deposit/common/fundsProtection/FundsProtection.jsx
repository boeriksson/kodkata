import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CoreComponents from '@kindred-payment/pay-provider-ui-common/lib/CoreComponents';
import styled from 'styled-components';

import customerProfileActions from '../../../common/customerProfileActions';
import { translate } from '../../../common/translationActions';

const Toggle = CoreComponents.toggle;
const Checkbox = CoreComponents.checkbox;
const Link = CoreComponents.link;

const containerStyles = (props) => props.theme.skins.FundsProtection.Container(props);
const StyledContainer = styled.div`${containerStyles}`;

const url = 'http://www.gamblingcommission.gov.uk/Consumers/Protection-of-customer-funds.aspx';
const key = 'paycashierclient.deposit.fundsProtection.';

const FundsProtection = ({ customerProfile, dispatch }) => {
    const toggle = () => {
        dispatch(customerProfileActions.userChangeFundsProtection(!customerProfile.acceptedFundsProtection));
    };

    const {
        showFundsProtection,
        acceptedVersion,
        notificationVersion
    } = customerProfile.customerNotificationResource;

    if (!showFundsProtection) {
        return null;
    }

    const isAccepted = acceptedVersion === notificationVersion;
    const isChanged = acceptedVersion && acceptedVersion < notificationVersion;
    const editAccepted = customerProfile.acceptedFundsProtection;

    let content;
    const readMoreContent = (
        <div className="readMoreContent">
            { translate(`${key}description`).replace(/\\u005cn/g, '\n') }
            <Link href={ url } target='_blank'>{ translate(`${key}link`) }</Link>.
        </div>
    );
    const readMore = (
        <Toggle
            key="toggle"
            openText={ translate(`${key}readMore`) }
            closeText={ translate(`${key}readMore`)}
            content={ readMoreContent }/>
    );
    if (isAccepted) {
        content = readMore;
    } else {
        content = [
            isChanged ? <h2>{ translate(`${key}changed`) }</h2> : null,
            <p key="before">{ translate(`${key}before`) }</p>,
            readMore,
            <div key="confirm" className="confirm">
                <Checkbox isChecked={ editAccepted } toggle={toggle} className="checkbox" />
                { translate(`${key}confirm`) }
            </div>
        ];
    }

    return <StyledContainer data-test-name="FundsProtection_test">{ content }</StyledContainer>;
};

FundsProtection.propTypes = {
    customerProfile: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function stateToProps({ customerProfile }) {
    return {
        customerProfile
    };
}

export default connect(stateToProps)(FundsProtection);
