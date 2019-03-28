import React, { Fragment } from 'react';
import BasicTopBar from '../components/misc/BasicTopBar';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <Fragment>
      <BasicTopBar />
      <h1>Sign in</h1>
      <div className='container-fluid'>
        <LoginForm />
      </div>
    </Fragment>
  );
};

export default Login;
