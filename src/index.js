import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createBrowserHistory } from 'history';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import { LOGIN_WITH_SIGNATURE } from 'graphQL/repository/individual.repository';
// import { LOGIN_WITH_SIGNATURE } from 'graphQL/repository/individual.repository';

// eslint-disable-next-line react-hooks/rules-of-hooks
// const [signinWithSignature] = useMutation(LOGIN_WITH_SIGNATURE, {
//   errorPolicy: 'all',
// });

// const loginAgain = () => {
//   const signature = localStorage.getItem('signature');
//   signinWithSignature({
//     variables: {
//       cmd: { signature },
//     },
//   }).then(({ data }) => {
//     localStorage.setItem('token', data?.loginWithSignature?.data?.accessToken);
//   });
// };

const getNewToken = () => {
  const signature = store.getState().user.signature;
  client
    .mutate({
      mutation: LOGIN_WITH_SIGNATURE,
      variables: { cmd: { signature } },
    })
    .then(({ data }) => {
      localStorage.setItem(
        'token',
        data?.loginWithSignature?.data?.accessToken
      );
    });
};

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    debugger;
    if (graphQLErrors.some((x) => x.extensions.code === 401)) {
      getNewToken();
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
    // For server with deifferent domain use "include"
    credentials: 'include',
  }),
]);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
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
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
