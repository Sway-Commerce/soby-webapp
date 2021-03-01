import React from 'react';
import 'react-phone-number-input/style.css'

import { GlobalStyle } from './global.styles';
import Register from './pages/register/register.component';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Register/>
    </div>
  );
};

export default App;
