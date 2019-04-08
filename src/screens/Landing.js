import React from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../images/storyland-white.png';

const Landing = () => {
  return (
    <div className='landing-web'>
      <div className='landing-info'>
        <div className='landing-logo'>
          <img src={logoWhite} alt='storyland-app' />
        </div>
        <div className='landing-buttons'>
          <div>
            <Link to='/register'>
              <button className='my-button reg-button'>Register</button>
            </Link>
          </div>
          <div>
            <Link to='/login'>
              <button className='my-button log-button'>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
