import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userReducer from './user/user.reducer';
import { routerReducer } from 'react-router-redux';
import sessionStorage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  routing: routerReducer
});

export default persistReducer(persistConfig, rootReducer);
