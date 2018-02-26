import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

const AppContainer = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default AppContainer;
