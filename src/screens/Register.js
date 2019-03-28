import React, { Fragment } from 'react';
import BasicTopBar from '../components/misc/BasicTopBar';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <Fragment>
      <BasicTopBar />
      <h1>Sign up</h1>
      <div className='container-fluid'>
        <RegisterForm />
      </div>
    </Fragment>
  );
};

export default Register;
