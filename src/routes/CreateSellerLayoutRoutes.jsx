import React from 'react';
import { Route } from 'react-router-dom';
import CreateSellerLayout from 'layouts/CreateSellerLayout';

const CreateSellerLayoutRoutes = function ({ component: Component, ...rest }) {
  return (
    <>
      <Route
        {...rest}
        render={(props) => (
          <CreateSellerLayout>
            <Component {...props} />
          </CreateSellerLayout>
        )}
      />
    </>
  );
};

export default CreateSellerLayoutRoutes;
