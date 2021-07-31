import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createBrowserHistory } from 'history';

import { store, persistor } from './redux/store';
import $ from 'jquery';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { LOGIN_WITH_SIGNATURE } from 'graphQL/repository/individual.repository';
import { setAccessToken } from 'redux/user/user.actions';
import { HttpStatusCode } from 'shared/model/shared.model';

const getNewToken = () => {
  const signature = store.getState().user.signature;
  client
    .mutate({
      mutation: LOGIN_WITH_SIGNATURE,
      variables: { cmd: { signature } },
    })
    .then(({ data }) => {
      store.dispatch(setAccessToken(data?.loginWithSignature?.data?.accessToken));
    });
};

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors.some((x) => x.extensions.code === HttpStatusCode.Unauthorized)) {
      if (!window.location.pathname.includes('phone-signin')) {
        sessionStorage.setItem('redirectUrl', window.location.pathname);
        window.location.href = '/phone-signin';
      }
    }
    if (graphQLErrors.length) {
      console.log('[graphQLErrors]', graphQLErrors);
    }
    if (networkError) {
      console.log('[networkError]', networkError);
    }
  }),
  createHttpLink({
    uri: process.env.REACT_APP_SERVER_URL,
    // For server with different domain use "include"
    credentials: 'include',
  }),
]);

const authLink = setContext((_, { headers }) => {
  const token = store.getState().user.accessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const history = createBrowserHistory();

history.listen((location) => {
  const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
  if (path) {
    history.replace(path);
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
