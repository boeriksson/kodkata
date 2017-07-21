import { combineReducers } from 'redux';

import customerProfile from './components/common/customerProfileReducer';
import notifications from './components/common/notificationReducer';
import translations from './components/common/translationReducer';
import iovation from './components/common/iovationReducer';
import stateLog from './components/common/stateLogReducer';

export default function getReducers(moduleReducers) {
    const reducers = {
        customerProfile,
        notifications,
        translations,
        iovation,
        stateLog
    };
    return combineReducers({ ...reducers, ...moduleReducers });
}
