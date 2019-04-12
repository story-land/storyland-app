import React, { Fragment } from 'react';
import BasicTopBar from '../components/misc/BasicTopBar';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <Fragment>
      <BasicTopBar />
      <div className='screen-wrapper'>
        <div className='form-container'>
          <h1 className='reg-title'>Register</h1>
          <RegisterForm />
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
