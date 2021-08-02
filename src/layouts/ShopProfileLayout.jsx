import Footer from 'components/footer/footer-v2.component';
import Header from 'components/header/header-v2.component';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ShopProfileLayout = function ({ children }) {
  const location = useLocation();
  const history = useHistory();
  return (
    <div className='d-flex flex-column' style={{ backgroundColor: '#F3F4F4', minHeight: '100vh' }}>
      {/* <Helmet>
        <meta name='og:description' content={`test description`} />
        <meta property='og:title' content={`title`} />
        <meta property='og:image' content={`https://vcdn-vnexpress.vnecdn.net/2021/07/07/Aventador-Ultimae-Coupe-1-3961-1625659942.jpg`} />
      </Helmet> */}
      <Header history={history} />
      <div className='' style={{ backgroundColor: '#F3F4F4', width: '100vw' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default ShopProfileLayout;
