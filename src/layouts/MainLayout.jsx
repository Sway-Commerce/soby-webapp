import Footer from 'components/footer/footer-v2.component';
import Header from 'components/header/header-v2.component';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const MainLayout = function ({ children }) {
  const location = useLocation();
  const history = useHistory();
  return (
    <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
      <Header history={history} />
      <div className='body-container'>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
