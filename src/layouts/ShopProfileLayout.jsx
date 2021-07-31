import Footer from 'components/footer/footer-v2.component';
import Header from 'components/header/header-v2.component';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const ShopProfileLayout = function ({ children }) {
  const location = useLocation();
  const history = useHistory();
  return (
    <div className='d-flex flex-column' style={{ backgroundColor: '#F3F4F4', minHeight: '100vh' }}>
      <Header history={history} />
      <div className='' style={{ backgroundColor: '#F3F4F4', width: '100vw' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default ShopProfileLayout;
