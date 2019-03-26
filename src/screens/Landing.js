import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='container-fluid'>
      <div className='landing-info'>
        <div className='landing-logo'>
          <img
            className='img-fluid'
            src='/images/logo.png'
            alt='storyland-app'
          />
        </div>
        <div className='landing-buttons'>
          <button className='my-button reg-button'>
            <Link to='/register'>Register</Link>
          </button>
          <button className='my-button log-button'>
            <Link to='/login'>Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
