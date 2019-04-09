import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import authService from '../../services/auth-service';
import { withRouter } from 'react-router-dom';
import logoWhite from '../../images/storyland-main-dark.png';

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
            <img
              className='basic-nav-logo'
              src={logoWhite}
              alt='storyland-app'
            />
          </Link>
          <ul id='nav-mobile' className='right right-register-topbar'>
            {!user.email && (
              <Fragment>
                <li className='basic-nav-item'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
                <li className='basic-nav-item'>
                  <Link className='nav-link' to='/register'>
                    Register
                  </Link>
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
