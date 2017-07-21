import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {ThemeProvider, injectGlobal} from 'styled-components';
import theme from '@kindred-payment/pay-provider-ui-common/lib/ThemeUNIBET.js';
import devServers from './devServerReducer';

import Main from './Main';

const store = createStore(
    combineReducers({
        devServers
    }),
    {},
    applyMiddleware(thunk)
);

const render = () => {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <Provider store={ store }>
                <Main/>
            </Provider>
        </ThemeProvider>,
        document.getElementById('debug')
    );
};

injectGlobal`${theme.skins.Global(theme)}`; // eslint-disable-line no-unused-expressions

render();
