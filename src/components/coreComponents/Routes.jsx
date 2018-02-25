import React from 'react';
import { Route } from 'react-router-dom';

import SplashPage from '../SplashPage';
import StudentRegistrationForm from '../StudentRegistrationForm';
import StudentRegistrationCorrectionForm from '../StudentRegistrationCorrectionForm';
import Footer from './Footer';

const Routes = () => (
  <div>
    <Route exact path={'/'} component={SplashPage}/>
    <Route exact path={'/studentRegister'} component={StudentRegistrationForm} />
    <Route exact path={'/studentCorrection'} component={StudentRegistrationCorrectionForm} />
    <Footer />
  </div>
);

export default Routes;
