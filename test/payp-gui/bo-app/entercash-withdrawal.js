import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import store from './store';

import Application from './components/bo-app';
import TransactionViewContext from './components/WithdrawalTransactionViewContext';
import CustomerRequestViewContext from './components/CustomerRequestsViewContext';

require('./style/scss/bo/bo-desktop.scss');

const render = () => {
    ReactDOM.render(
        <Provider store={ store }>
            <Router history={ hashHistory }>
                <Route name="app" path="/" component={Application}>
                    <Route
                        name="transactionDetails"
                        path="/transactionDetails/(:withdrawalReference)"
                        component={ TransactionViewContext }
                    />
                    <Route
                        name="userRequestTracking"
                        path="/userRequestTracking/(:customerId)/(:period)"
                        component={ CustomerRequestViewContext }
                    />
                </Route>
            </Router>
        </Provider>,
        document.getElementById('app')
    );
};

render();
