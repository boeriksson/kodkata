import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import TransactionViewContext from './main/components/TransactionViewContext';
import CustomerRequestViewContext from './main/components/CustomerRequestViewContext';
import './scss/bo-desktop.scss';

render((
    <Router history={hashHistory}>
        <Route path="/transactionDetails/:withdrawalReference" component={TransactionViewContext}/>
        <Route path="/userRequestTracking/:customerId/:period" component={CustomerRequestViewContext}/>
    </Router>
), document.getElementById('app'));