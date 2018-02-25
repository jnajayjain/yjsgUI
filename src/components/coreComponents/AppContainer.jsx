import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Routes from './Routes';

const AppContainer = () => (
  <MemoryRouter>
    <Routes />
  </MemoryRouter>
);

export default AppContainer;
