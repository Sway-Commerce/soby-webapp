import React from 'react';

import Header from './components/header/header.component';

import { GlobalStyle } from './global.styles';

const App = () => {

  return (
    <div>
      <GlobalStyle />
      <Header />
      <div>Hello Soby</div>
    </div>
  );
};

export default App;
