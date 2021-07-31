import FooterSection from 'components/footer/footer.component';
import Header from 'components/header/header-v2.component';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const MainLayout = function ({ children }) {
  const location = useLocation();
  const history = useHistory();
  return (
    <div>
      <Header history={history} />
      <div className='body-container'>{children}</div>
      <FooterSection />
    </div>
  );
};

export default MainLayout;
