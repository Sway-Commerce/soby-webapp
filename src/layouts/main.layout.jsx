import React, { lazy, Suspense, Component } from 'react';
import { Route } from 'react-router-dom';
import Header from 'components/header/header.component';
import Spinner from 'components/ui/spinner/spinner.component';
import JwtRoute from 'jwt-route';
import ErrorBoundary from 'components/error-boundary/error-boundary.component';
import FooterSection from 'components/footer/footer.component';
import { Footer } from 'antd/lib/layout/layout';
const HomePage = lazy(() => import('../pages/homepage/homepage.component'));

export const MainLayout = function ({ children, ...rest }) {
  return (
    <div>
      <Header />
      <div className='body-container'>{children}</div>
      <Footer />
    </div>
  );
};

const MainLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={MainLayout}
      // render={(matchProps) => (
      //   <MainLayout>
      //     <Component {...matchProps} />
      //   </MainLayout>
      // )}
    />
  );
};

export default MainLayoutRoute;
