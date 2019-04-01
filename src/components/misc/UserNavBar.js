import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
                <span
                  className='usernavbar-item-icon'
                  role='img'
                  aria-label='motivation'
                >
                  💪
                </span>
                <p className='usernavbar-item-title'>Motivation</p>
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
                <span
                  className='usernavbar-item-icon'
                  role='img'
                  aria-label='explore'
                />
                🧭
                <p className='usernavbar-item-title'>Explore</p>
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
                <span
                  className='usernavbar-item-icon'
                  role='img'
                  aria-label='friends'
                >
                  🔜
                </span>
                <p className='usernavbar-item-title'>Friends</p>
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
                <span
                  className='usernavbar-item-icon'
                  role='img'
                  aria-label='profile'
                >
                  📚
                </span>
                <p className='usernavbar-item-title'>Profile</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
