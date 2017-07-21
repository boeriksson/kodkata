import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import postToParent from './utils/postToParent';

import testResize from './utils/resize';

class IframeWrapper extends React.Component {
    onIframeMessage = (e) => {
        console.log(e);
        if (!e.data) {
            throw new Error('No iframe message data.');
        }

        const {callback, cancel} = this.props;
        let message = e.data;

        if (typeof message === 'string') {
            try {
                message = JSON.parse(message);
            } catch (err) {
                console.warn('Unparsable message data: ' + message);
                return;
            }
        }

        switch (message.type) {
            case 'heightChange':
                this.onHeightChange(message.height);
                break;
            case 'RedirectResult':
                callback();
                break;
            case 'Cancel':
                cancel();
                break;
            default:
                console.log('Do not recognize message, bubbling up to parent...'); // eslint-disable-line no-console
                postToParent(e.data);
                break;
        }
    };

    onHeightChange = (height) => {
        const newHeight = height + 40; // Padding to avoid scrollbar flickering
        ReactDOM.findDOMNode(this.refs.iframe).height = `${newHeight} px`;
        testResize();
    };

    componentDidUpdate = () => {
        testResize();
    };

    componentDidMount = () => {
        const { url, post } = this.props;

        if (post) {
            const form = document.createElement('form');
            form.action = url;
            form.method = 'POST';
            form.target = 'wrapper';
            for (let i in post) { // eslint-disable-line
                const input = document.createElement('input');
                input.name = i;
                input.type = 'hidden';
                input.value = post[i];
                form.appendChild(input);
            }
            form.style.display = 'none';
            document.body.appendChild(form);
            form.submit();
        } else {
            ReactDOM.findDOMNode(this.refs.iframe).src = url;
        }
        testResize();
    };

    componentWillMount = () => {
        window.onmessage = this.onIframeMessage;
    };

    render() {
        let height = '1200px';
        const style = {};
        if (this.props.fullWrap) {
            height = '100%';
            style.minHeight = '680px';
        }
        return (
            <iframe
                ref='iframe'
                name='wrapper'
                id='wrapper'
                width='100%'
                style={style}
                height={height}
                data-test-name="ProviderIframe" />
        );
    }
}

IframeWrapper.propTypes = {
    url: PropTypes.string,
    post: PropTypes.object,
    fullWrap: PropTypes.bool,
    callback: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired
};

export default IframeWrapper;
