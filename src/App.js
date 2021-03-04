import React from 'react';
import 'react-phone-number-input/style.css'

import { GlobalStyle } from './global.styles';
import Register from './pages/register/register.component';
import Header from './components/header/header.component';

const App = () => {
  return (
    <div>
      <Header/>
      <GlobalStyle />
      <Register/>
    </div>
  );
};

export default App;
