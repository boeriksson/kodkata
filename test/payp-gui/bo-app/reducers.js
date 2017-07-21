import {combineReducers} from 'redux';

import transaction from './components/transactionReducer';

const reducers = {
    transaction
};

export default combineReducers(reducers);
