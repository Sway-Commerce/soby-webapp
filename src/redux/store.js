import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwtDecode from 'jwt-decode';

import rootReducer from './root-reducer';

const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  if (!!localStorage.getItem('token')) {
    const token = JSON.parse(localStorage.getItem('token'));
    if (jwtDecode(token).exp < Date.now() / 1000) {
      next(action);
      localStorage.clear();
    }
  }
  next(action);
};

let middlewares = [checkTokenExpirationMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default { store, persistStore };
