import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import BasicTopBar from '../components/BasicTopBar';
import FirstRegisterForm from '../components/FirstRegisterForm';
import SecondRegisterForm from '../components/SecondRegisterForm';

const Register = () => {
  return (
    <Fragment>
      <BasicTopBar />
      <div className='container-fluid reg-container'>
        <Switch>
          <Route exact path='/register' component={FirstRegisterForm} />
          <Route exact path='/register-2' component={SecondRegisterForm} />
          <Redirect to='/register' />
        </Switch>
      </div>
    </Fragment>
  );
};

export default Register;
