import React, { lazy, Suspense, Component } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import JwtRoute from 'jwt-route';

const PhoneSignin = lazy(() => import('pages/phone-signin/phone-signin.component'));

const CustomLayout = function () {
  const location = useLocation();
  let background = location?.state?.background;
  console.info('locationMainLayout', location);
  return (
    <Switch location={background || location}>
      <div className='body-container'>
        <Route path='/phone-signin' component={PhoneSignin} />
      </div>
    </Switch>
  );
};

export default CustomLayout;
