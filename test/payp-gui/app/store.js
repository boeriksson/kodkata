import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { logState } from './components/common/stateLogAction';

const initialState = {};

const errorReporter = (store) => (next) => (action) => { // eslint-disable-line no-unused-vars
    console.log('action: %o, action.type: %o', action, action.type);
    if (action.type !== 'STATE_CHANGE') {
        store.dispatch(logState(action));
    }
    return next(action);
};

export default function getStore(moduleReducers) {
    const store = createStore(
        reducers(moduleReducers),
        initialState,
        compose(
            applyMiddleware(thunk),
            applyMiddleware(errorReporter),
            window.devToolsExtension ? window.devToolsExtension() : (f) => f
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
