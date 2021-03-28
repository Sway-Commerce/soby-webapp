import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userReducer from './user/user.reducer';

import storage from 'redux-persist/lib/storage';
import transactionReducer from './transaction/transaction.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer,
});

export default persistReducer(persistConfig, rootReducer);
