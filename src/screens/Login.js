import React, { Fragment } from 'react';
import BasicTopBar from '../components/misc/BasicTopBar';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <Fragment>
      <BasicTopBar />
      <div className='screen-wrapper'>
        <div className='form-container'>
          <h1 className='reg-title'>Log in</h1>
          <LoginForm />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
