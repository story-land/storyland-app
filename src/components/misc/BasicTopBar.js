import React, { Fragment, Component } from 'react';
import ScrollToTop from '../../utils/ScrollToTop';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { withAuthConsumer } from '../../contexts/AuthStore';
import authService from '../../services/auth-service';
import { withRouter } from 'react-router-dom';
import logoWhite from '../../images/storyland-main-dark.png';

library.add(faArrowLeft);
library.add(faSignOutAlt);

class BasicTopBar extends Component {
  handleLogout = () => {
    authService.logout().then(() => {
      const { history } = this.props;
      this.props.onUserChanged({});
      history.push('/');
    });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { user } = this.props;
    return (
      <ScrollToTop>
        <nav className='basic-nav'>
          <div className='nav-wrapper basic-nav-list'>
            {!user.email && (
              <Fragment>
                <div className='nav-logo'>
                  <Link className='brand-logo' to='/'>
                    <img
                      className='basic-nav-logo'
                      src={logoWhite}
                      alt='storyland-app'
                    />
                  </Link>
                </div>
                <ul id='nav-mobile' className='right right-register-topbar'>
                  <li className='basic-nav-item'>
                    <Link className='nav-link' to='/register'>
                      Sign up
                    </Link>
                  </li>
                  <li className='basic-nav-item'>
                    <Link className='nav-link' to='/login'>
                      Log in
                    </Link>
                  </li>
                </ul>
              </Fragment>
            )}
            {user.email && (
              <Fragment>
                <ul id='nav-mobile' className='left'>
                  <li
                    className='basic-nav-item basic-nav-item-back'
                    onClick={this.handleBack}
                  >
                    <FontAwesomeIcon icon='arrow-left' />
                  </li>
                </ul>
                <Link className='brand-logo center' to='/home'>
                  <img
                    className='basic-nav-logo'
                    src={logoWhite}
                    alt='storyland-app'
                  />
                </Link>
                <ul id='nav-mobile' className='right right-register-topbar'>
                  <li
                    className='basic-nav-item basic-nav-item-logout'
                    onClick={this.handleLogout}
                  >
                    <FontAwesomeIcon icon='sign-out-alt' />
                  </li>
                </ul>
              </Fragment>
            )}
          </div>
        </nav>
      </ScrollToTop>
    );
  }
}

export default withAuthConsumer(withRouter(BasicTopBar));
