import React from 'react';
import { Route } from 'react-router-dom';
import BlankLayout from 'layouts/BlackLayout';

const BlankLayoutRoutes = function ({ component: Component, ...rest }) {
  return (
    <>
      <Route
        {...rest}
        render={(props) => (
          <BlankLayout>
            <Component {...props} />
          </BlankLayout>
        )}
      />
    </>
  );
};

export default BlankLayoutRoutes;
