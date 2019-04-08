import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faHome);
library.add(faCompass);
library.add(faUsers);
library.add(faUserCircle);

export default class UserNavBar extends Component {
  render() {
    return (
      <div className='usernavbar'>
        <ul className='usernavbar-container'>
          <li>
            <NavLink
              className='nav-link'
              activeClassName='active'
              to='/user/motivation'
            >
              <div className='usernavbar-item'>
                <FontAwesomeIcon icon='home' />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className='nav-link'
              activeClassName='active'
              to='/user/explore'
            >
              <div className='usernavbar-item'>
                <FontAwesomeIcon icon='compass' />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className='nav-link'
              activeClassName='active'
              to='/user/friends'
            >
              <div className='usernavbar-item'>
                <FontAwesomeIcon icon='users' />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              className='nav-link'
              activeClassName='active'
              to='/user/profile'
            >
              <div className='usernavbar-item'>
                <FontAwesomeIcon icon='user-circle' />
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
