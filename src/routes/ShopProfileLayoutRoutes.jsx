import React from 'react';
import { Route } from 'react-router-dom';
import ShopProfileLayout from 'layouts/ShopProfileLayout';

const ShopProfileLayoutRoutes = function ({ component: Component, ...rest }) {
  return (
    <>
      <Route
        {...rest}
        render={(props) => (
          <ShopProfileLayout>
            <Component {...props} />
          </ShopProfileLayout>
        )}
      />
    </>
  );
};

export default ShopProfileLayoutRoutes;
