import React from 'react';
import styled from 'styled-components';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const ServerPanel = ({ server }) => {

    return (
        <div>
            <div>name: { server.method }</div>
            <div>name: { server.theme }</div>
            <div>port: { server.port }</div>
            <div>status: { server.status }</div>
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

export default ServerPanel;
