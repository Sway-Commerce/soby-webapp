import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const BlankLayout = function ({ children }) {
  const location = useLocation();
  const history = useHistory();
  return (
    <div>
      <div className='body-container'>{children}</div>
    </div>
  );
};

export default BlankLayout;
