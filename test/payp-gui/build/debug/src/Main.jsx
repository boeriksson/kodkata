import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ServerPanel from './ServerPanel';
import devServerAction from './devServerAction';

const Main = ({ devServers, dispatch }) => {
    const tabs = devServers.servers.map((server, ix) => {
        console.log('Tab Server name: ', server);
        return <Tab key={`Tab-${ix}`}>{ `${server.method}-${server.theme}` }</Tab>;
    });
    const panels = devServers.servers.map((server, ix) => {
        return (
           <TabPanel key={`Panel-${ix}`}>
               <ServerPanel server={server}/>
           </TabPanel>
        );
    });
    const handleClick = (method, theme) => {
        dispatch(devServerAction.startServer(method, theme));
    };
    return (
        <div>
            <div>
                <div><a href="#" onClick={ () => handleClick('entercash', 'unibet') }>entercash_unibet</a></div>
                <div><a href="#" onClick={ () => handleClick('trustly-deposit', 'unibet') }>trustly_deposit_unibet</a></div>
                <div><a href="#" onClick={ () => handleClick('trustly-deposit', 'maria') }>trustly_deposit_maria</a></div>
            </div>
            <div>
                <Container>
                    <Tabs>
                        <TabList>
                            { tabs }
                        </TabList>
                        { panels }
                    </Tabs>
                </Container>
            </div>
        </div>
    );
};

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

function stateToProps({ devServers }) {
    return {
        devServers
    };
}

export default connect(stateToProps)(Main);
