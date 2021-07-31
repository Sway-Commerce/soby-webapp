import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const CreateSellerLayout = function ({ children }) {
  const location = useLocation();
  const history = useHistory();
  return (
    <div className='' style={{backgroundColor: '#F3F4F4', width: '100vw', height: '100vh'}}>
      <div className=''>{children}</div>
    </div>
  );
};

export default CreateSellerLayout;
