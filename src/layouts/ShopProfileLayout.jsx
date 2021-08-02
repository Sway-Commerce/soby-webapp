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
      <Helmet>
        <meta property='og:url' content='http://dev.soby.vn/shop-profile/8b3991f8-2fb6-430d-91ac-3aca51a7f54c' />
        <meta property='og:title' content='Mototo - Rating: 9.4' />
        <meta
          property='og:image'
          content='https://cdn-dev.soby.vn/shops/8b3991f8-2fb6-430d-91ac-3aca51a7f54c/df84106f-6905-42ca-baff-0ae22742cb5e.jpeg'
        />
        <meta property='og:image:width' content='475' />
        <meta property='og:image:height' content='308' />
        <meta property='og:image:type' content='image/jpg' />
        <meta
          property='og:description'
          content="243 reviews for Mototo, rating 9.4: 'Our customers love unique statement pieces. Please add more. I loved the colored pearls and matching bracelets and acetate earrings today. Thanks for great selection!'"
        />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:description'
          content="243 reviews for Mototo, rating 9.4: 'Our customers love unique statement pieces. Please add more. I loved the colored pearls and matching bracelets and acetate earrings today. Thanks for great selection!'"
        />
        <meta
          property='twitter:image'
          content='https://cdn-dev.soby.vn/shops/8b3991f8-2fb6-430d-91ac-3aca51a7f54c/df84106f-6905-42ca-baff-0ae22742cb5e.jpeg'
        />
      </Helmet>
      <Header history={history} />
      <div className='' style={{ backgroundColor: '#F3F4F4', width: '100vw' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default ShopProfileLayout;
