import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import { closeMessage } from './notificationActions';
import { translate } from './translationActions';
import testResize from './utils/resize';

const Notification = PaymentComponents.notification;

class NotificationContext extends React.Component {
    componentDidUpdate = () => testResize();

    componentDidMount = () => testResize();

    handleClose = (id) => {
        this.props.dispatch(closeMessage(id));
    };

    render() {
        const notifications = this.props.notifications.map((notification) => {
            let title;
            let message;
            let closeAction;

            if (notification.titleKey) {
                title = translate(notification.titleKey);
            }
            if (notification.messageKey) {
                message = translate(notification.messageKey);
            }
            if (notification.message) {
                message = notification.message;
            }
            if (!notification.notClosable) {
                closeAction = this.handleClose.bind(null, notification.id);
            }
            return (
                <Notification
                    key={ notification.id }
                    title={ title }
                    message={ message }
                    closeAction={ closeAction } />
            );
        });
        return <div>{ notifications }</div>;
    }
}

NotificationContext.propTypes = {
    titleKey: PropTypes.string,
    notifications: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function stateToProps({ notifications }) {
    return {
        notifications
    };
}

export default connect(stateToProps)(NotificationContext);
