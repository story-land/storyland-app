import React, { Fragment, Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './screens/Landing';
import Register from './screens/Register';
import Login from './screens/Login';
import UserNavBar from './components/misc/UserNavBar';
import BasicTopBar from './components/misc/BasicTopBar';
import Explore from './screens/user/Explore';
import Motivation from './screens/user/Motivation';
import Friends from './screens/user/Friends';
import FollowList from './screens/user/FollowList';
import BookDetail from './screens/user/BookDetail';
import UserDetail from './components/friends/UserDetail';
import Profile from './screens/user/Profile';
import LoggedRoute from './guards/LoggedRoute';
import { withAuthConsumer } from './contexts/AuthStore';

class App extends Component {
  render() {
    const isUser = this.props.isAuthenticated();
    return (
      <div className='App'>
        {!isUser && (
          <Switch>
            <LoggedRoute path='/register' component={Register} />
            <LoggedRoute path='/login' component={Login} />
            <Route exact path='/' component={Landing} />
            <Redirect to='/' />
          </Switch>
        )}
        {isUser && (
          <Fragment>
            <BasicTopBar />
            <div className='screen-wrapper'>
              <Switch>
                <Route exact path='/home' component={Motivation} />
                <Route exact path='/explore' component={Explore} />
                <Route exact path='/friends' component={Friends} />
                <Route exact path='/profile' component={Profile} />
                <Route
                  exact
                  path='/friends/list/:followstate'
                  component={FollowList}
                />
                <Route path='/explore/:bookId' component={BookDetail} />
                <Route path='/friends/:userId' component={UserDetail} />
                <Redirect to='/home' />
              </Switch>
            </div>
            <UserNavBar />
          </Fragment>
        )}
      </div>
    );
  }
}

export default withAuthConsumer(App);
