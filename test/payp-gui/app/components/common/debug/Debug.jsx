import React from 'react';

import CoreComponents from '@kindred-payment/pay-provider-ui-common/lib/CoreComponents';

import DebugContainer from './DebugContainer';

const Button = CoreComponents.button;

class Debug extends React.Component {
    constructor() {
        super();
        this.state = {
            debug: false
        };
    }

    startDebug = () => {
        console.log('Initiating debug panel...');
        this.setState({ debug: true });
    };

    stopDebug = () => {
        console.log('Closing debug panel...');
        this.setState({ debug: false });
    };

    render() {
        return (
            <div>
                { this.state.debug ? <DebugContainer/> : null }
                <Button onClick={ this.state.debug ? this.stopDebug : this.startDebug }>
                    { this.state.debug ? 'Stop debug' : 'Start debug' }
                </Button>
            </div>
        );
    }
}

export default Debug;
