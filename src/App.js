import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'react-phone-number-input/style.css'

import { GlobalStyle } from './global.styles';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const SignUp = lazy(() => import('./pages/register/register.component'));

const App = () => {
  return (
    <div>
      <Header/>
      <GlobalStyle />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route
              exact
              path='/signup'
              component={SignUp}
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

export default App;
