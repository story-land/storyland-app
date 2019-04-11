import React, { Fragment } from 'react';
import BasicTopBar from '../components/misc/BasicTopBar';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <Fragment>
      <BasicTopBar />
      <div className='screen-wrapper'>
        <div className='form-container'>
          <h1 className='reg-title'>Login</h1>
          <LoginForm />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;