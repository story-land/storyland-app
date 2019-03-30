import React, { Fragment } from 'react';
import BasicTopBar from '../components/misc/BasicTopBar';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <Fragment>
      <BasicTopBar />
      <div className='form-container'>
        <h1 className='reg-title'>Register</h1>
        <RegisterForm />
      </div>
    </Fragment>
  );
};

export default Register;
