import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import context from 'context';
import {ThemeProvider, injectGlobal} from 'styled-components';
import THEMEHOLDER from '@kindred-payment/pay-provider-ui-common/lib/THEMEHOLDER.js';

import getStore from './store';
import AuthContext from './components/common/AuthContext.jsx';
import NotificationContext from './components/common/NotificationContext';
import customerProfileActions from './components/common/customerProfileActions';
import translationActions from './components/common/translationActions';
import DepositEntercashCtx from './components/deposit/entercash/DepositEntercashCtx.jsx';
import deposit from './components/deposit/common/depositReducer';

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

console.log('Theme: ', theme);
deepMergeTheme(innerTheme, theme);

const store = getStore({ deposit });

store.dispatch(customerProfileActions.loadCustomerProfile());
store.dispatch(translationActions.initTranslations());

console.log('Theme2', theme);
const render = () => {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <Provider store={ store }>
              <div id="CashierClient" className="outer-wrapper">
                <NotificationContext/>
                <AuthContext moduleEntry={ <DepositEntercashCtx/> }/>
              </div>
            </Provider>
        </ThemeProvider>,
        document.getElementById('app')
  );
};

injectGlobal`${theme.skins.Global(theme)}`; // eslint-disable-line no-unused-expressions

render();
