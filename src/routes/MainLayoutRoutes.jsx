import React from 'react';
import { Route } from 'react-router-dom';
import JwtRoute from 'jwt-route';
import MainLayout from 'layouts/MainLayout';

const MainLayoutRoutes = function ({ component: Component, ...rest }) {
  const { isAuthorized } = rest;
  return (
    <>
      {isAuthorized ? (
        <JwtRoute
          {...rest}
          render={(props) => (
            <MainLayout>
              <Component {...props} />
            </MainLayout>
          )}
        />
      ) : (
        <Route
          {...rest}
          render={(props) => (
            <MainLayout>
              <Component {...props} />
            </MainLayout>
          )}
        />
      )}
    </>
  );
};

export default MainLayoutRoutes;
