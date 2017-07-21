import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';
import context from 'context';

import { logErrorWithState } from './stateLogAction';
import { notify } from './notificationActions';
import amountFormatting from './utils/amountFormatting';
import { translate } from './translationActions';

const Loading = PaymentComponents.loading;
const SelectOtherMethods = PaymentComponents.selectOtherMethods;

const IEMatch = navigator.userAgent.match(/(?:MSIE )(\d*)/);
const IEversion = IEMatch ? Number(IEMatch[1]) : null;

const loadingKey =
    config.archetype === 'deposit' ? 'paycashierclient.common.bank.deposit.loading' : `${context.methodKey}.loading`;

class AuthContext extends React.Component {

    componentWillMount() {
        if (IEversion && IEversion < 11) return;
        window.onerror = (msg, url, line, col) => {
            this.props.dispatch(logErrorWithState(msg, url, line, col));
        };
    }

    // returns false, 'DEPOSIT', 'LOGIN' OR 'NOSESSION'
    isBlocked = (customerProfile) => {
        if (!customerProfile) {
            return 'NOSESSION';
        }
        const { depositLimit } = customerProfile;
        if (depositLimit && depositLimit.requireDepositLimit) {
            return 'REQUIREDEPOSITLIMIT';
        }
        if (customerProfile.notLoaded || !customerProfile.userAuthorization.blocks) {
            return false;
        }
        let blocked = false;
        customerProfile.userAuthorization.blocks.forEach((block) => {
            if ((config.archetype === 'deposit' && block.activity === 'DEPOSIT') ||
                (config.archetype === 'withdrawal' &&
                    (block.activity === 'WITHDRAW' || block.activity === 'WITHDRAWAL'))) {
                blocked = block.activity;
            }
        });
        return blocked;
    };

    // returns false, 'DEPOSIT', 'LOGIN' OR 'NOSESSION'
    componentWillUpdate(nextProps) {
        if (nextProps.customerProfile.notLoaded) {
            return;
        }
        amountFormatting.setFormat(nextProps.customerProfile.format);
        const blocked = this.isBlocked(nextProps.customerProfile);
        let titleKey;
        let messageKey;

        if (blocked) {
            switch (blocked) {
                case 'DEPOSIT':
                    titleKey = 'paycashierclient.blockedUser.deposit.title';
                    messageKey = 'paycashierclient.blockedUser.deposit.message';
                    break;
                case 'WITHDRAW':
                case 'WITHDRAWAL':
                    titleKey = 'paycashierclient.blockedUser.withdrawal.title';
                    messageKey = 'paycashierclient.blockedUser.withdrawal.message';
                    break;
                case 'LOGIN':
                    titleKey = 'paycashierclient.blockedUser.login.title';
                    messageKey = 'paycashierclient.blockedUser.login.message';
                    break;
                case 'NOSESSION':
                    titleKey = 'paycashierclient.deposit.sessionExpire.title';
                    messageKey = 'paycashierclient.deposit.sessionExpire.message';
                    break;
                case 'REQUIREDEPOSITLIMIT':
                    titleKey = 'paycashierclient.deposit.requireDepositLimit.title';
                    messageKey = 'paycashierclient.deposit.requireDepositLimit.message';
                    break;
                default:
            }
            this.props.dispatch(notify({
                notClosable: true,
                titleKey,
                messageKey
            }));
        }
    }
    
    render() {
        console.log('Render authcontext...');
        if (this.props.customerProfile.unrecoverableError) {
            return (
                <div>
                    <SelectOtherMethods text={ translate('paycashierclient.common.deposit.selectOtherMethod') }/>
                </div>
            );
        }
        if (this.isBlocked(this.props.customerProfile)) {
            return <div>blocked</div>;
        }
        if (this.props.customerProfile.notLoaded) {
            return <Loading loadingMsg={ translate(loadingKey) } />;
        }
        return (
            <div>
                { this.props.moduleEntry }
            </div>
        );
    }
}

AuthContext.propTypes = {
    moduleEntry: PropTypes.element.isRequired,
    customerProfile: PropTypes.object.isRequired
};

function stateToProps({ customerProfile }) {
    return {
        customerProfile
    };
}

export default connect(stateToProps)(AuthContext);
