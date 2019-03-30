import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import authService from '../../services/auth-service';
import { withRouter } from 'react-router-dom';

class BasicTopBar extends Component {
  handleLogout = () => {
    authService.logout().then(() => {
      const { history } = this.props;
      this.props.onUserChanged({});
      history.push('/login');
    });
  };

  render() {
    const { user } = this.props;
    return (
      <nav className='basic-nav'>
        <p>BasicTopBar</p>
        <ul className='basic-nav-list'>
          {!user.email && (
            <Fragment>
              <li className='basic-nav-item'>
                <NavLink
                  className='nav-link'
                  activeClassName='active'
                  to='/login'
                >
                  Login
                </NavLink>
              </li>
              <li className='basic-nav-item'>
                <NavLink
                  className='nav-link'
                  activeClassName='active'
                  to='/register'
                >
                  Register
                </NavLink>
              </li>
            </Fragment>
          )}
          {user.email && (
            <Fragment>
              <li className='nav-item'>
                <button className='nav-link' onClick={this.handleLogout}>
                  Logout
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    );
  }
}

export default withAuthConsumer(withRouter(BasicTopBar));
