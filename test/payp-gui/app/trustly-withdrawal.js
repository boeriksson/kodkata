import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import context from 'context';
import {ThemeProvider, injectGlobal} from 'styled-components';
import THEMEHOLDER from '@kindred-payment/pay-provider-ui-common/lib/THEMEHOLDER.js';

import getStore from './store';
import AuthContext from './components/common/AuthContext.jsx';
import NotificationContext from './components/common/NotificationContext';
import customerProfileActions from './components/common/customerProfileActions';
import translationActions from './components/common/translationActions';
import WithdrawalTrustlyCtx from './components/withdrawal/trustly-withdrawal/WithdrawalTrustlyCtx.jsx';
import withdrawal from './components/withdrawal/common/withdrawalReducer';
import account from './components/withdrawal/trustly-withdrawal/accountReducer';

import errorLogger from './components/common/utils/ErrorLogger';
import deepMergeTheme from './components/common/utils/deepMergeTheme';

const getThemeImportName = (themeName) => {
    if (themeName === 'maria2') {
        return 'maria';
    } else if (themeName === 'bingo_com') {
        return 'bingo';
    }
    return themeName;
};

errorLogger();

const innerTheme = require('./themes/' + getThemeImportName(context.themeName) + '/index.js').default;
const theme = THEMEHOLDER;

deepMergeTheme(innerTheme, theme);

console.log('Module: ' + config.module);
console.log('MethodKey: ' + context.methodKey);
console.log('Theme: ' + theme.name);

const store = getStore({withdrawal, account});

store.dispatch(customerProfileActions.loadCustomerProfile());
store.dispatch(translationActions.initTranslations());

const renderTW = () => {
    render(
        <ThemeProvider theme={theme}>
            <Provider store={ store }>
                <div id="CashierClient" className="outer-wrapper">
                    <NotificationContext/>
                    <AuthContext moduleEntry={ <WithdrawalTrustlyCtx/> }/>
                </div>
            </Provider>
        </ThemeProvider>,
        document.getElementById('app')
    );
};

injectGlobal`${theme.skins.Global(theme)}`; // eslint-disable-line no-unused-expressions

renderTW();
