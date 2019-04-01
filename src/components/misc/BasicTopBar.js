import React, { Fragment, Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import authService from '../../services/auth-service';
import { withRouter } from 'react-router-dom';
import logo from '../../images/logo2.png';

class BasicTopBar extends Component {
  handleLogout = () => {
    authService.logout().then(() => {
      const { history } = this.props;
      this.props.onUserChanged({});
      history.push('/login');
    });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { user } = this.props;
    return (
      <nav className='basic-nav'>
        <div className='nav-wrapper basic-nav-list'>
          <ul id='nav-mobile' className='left'>
            <li className='basic-nav-item' onClick={this.handleBack}>
              Back
            </li>
          </ul>
          <Link to='#' className='brand-logo center'>
            <img className='basic-nav-logo' src={logo} alt='storyland-app' />
          </Link>
          <ul id='nav-mobile' className='right'>
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
                <li className='basic-nav-item' onClick={this.handleLogout}>
                  Logout
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withAuthConsumer(withRouter(BasicTopBar));
