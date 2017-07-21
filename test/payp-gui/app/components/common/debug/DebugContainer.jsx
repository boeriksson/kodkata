import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import postToParent from '../utils/postToParent';
import { notify, clearMessages } from '../notificationActions';

import Paste from './Paste';
import ErrorState from './ErrorState';

const Container = styled.div`
    margin: 10px 5px;
    padding: 5px;
    
    .react-tabs__tab-list {
      border-bottom: 1px solid #aaa;
      margin: 0 0 10px;
      padding: 0;
    }
    
    .react-tabs__tab {
      display: inline-block;
      border: 1px solid transparent;
      border-bottom: none;
      bottom: -1px;
      position: relative;
      list-style: none;
      padding: 6px 12px;
      cursor: pointer;
    }
    
    .react-tabs__tab--selected {
      background: #fff;
      border-color: #aaa;
      color: black;
      border-radius: 5px 5px 0 0;
    }
    
    .react-tabs__tab-panel {
      display: none;
    }
    
    .react-tabs__tab-panel--selected {
      display: block;
    }
    
    .react-tabs__tab--disabled {
      color: GrayText;
      cursor: default;
    }
    
    .react-tabs__tab:focus {
      box-shadow: 0 0 5px hsl(208, 99%, 50%);
      border-color: hsl(208, 99%, 50%);
      outline: none;
    }
    
    .react-tabs__tab:focus:after {
      content: "";
      position: absolute;
      height: 5px;
      left: -4px;
      right: -4px;
      bottom: -5px;
      background: #fff;
    }
`;

class DebugContainer extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount = () => {
        postToParent({
            type: 'heightChange',
            height: 2000
        });
    };

    findClosingBracket = (searchStr, start, level = 0) => {
        let pos = start;
        while (pos < searchStr.length) {
            switch (searchStr.charAt(pos)) {
                case '{':
                    pos = this.findClosingBracket(searchStr, pos + 1, level + 1);
                    if (level === 0) {
                        return pos + 1;
                    }
                    break;
                case '}':
                    return pos;
                default:
            }
            pos++;
        }
        return null;
    };

    parseState = (payload) => {
        const stateDecl = '// State: {';
        let errorState;
        clearMessages();
        if (!payload.includes(stateDecl)) {
            this.props.dispatch(notify('Could not find a state to parse...'));
            return null;
        }
        try {
            const startIx = payload.indexOf(stateDecl) + 10;
            const stopIx = this.findClosingBracket(payload, startIx);
            if (!stopIx) {
                throw new Error('uneven number of brackets...');
            }
            const stateStr = payload.slice(startIx, stopIx);
            errorState = JSON.parse(stateStr);
        } catch (e) {
            const errorTxt = `Found a state, but could not parse it - ${e.message}`;
            this.props.dispatch(notify(errorTxt));
        }
        return errorState;
    };

    onPaste = (e) => {
        this.setState({ errorState: this.parseState(e.target.value) });
    };

    render() {
        return (
            <Container>
                <Tabs>
                    <TabList>
                        <Tab>Paste</Tab>
                        <Tab disabled={!this.state.errorState}>Error State</Tab>
                    </TabList>

                    <TabPanel>
                        <Paste onChange={this.onPaste}/>
                    </TabPanel>
                    <TabPanel>
                        <ErrorState errorState={this.state.errorState}/>
                    </TabPanel>
                </Tabs>
            </Container>
        );
    }
}

export default connect()(DebugContainer);
