import React, { Fragment, Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserNavBar from '../../components/misc/UserNavBar';
import Explore from './Explore';
import Motivation from './Motivation';
import Friends from './Friends';
import BasicTopBar from '../../components/misc/BasicTopBar';
import FollowList from '../user/FollowList';
import BookDetail from './BookDetail';
import UserDetail from '../../components/friends/UserDetail';
import Profile from './Profile';

export default class UserContainer extends Component {
  render() {
    return (
      <Fragment>
        <BasicTopBar />
        <div className='screen-wrapper'>
          <Switch>
            <Route exact path='/user/home' component={Motivation} />
            <Route exact path='/user/explore' component={Explore} />
            <Route exact path='/user/friends' component={Friends} />
            <Route exact path='/user/profile' component={Profile} />
            <Route
              exact
              path='/user/friends/list/:followstate'
              component={FollowList}
            />
            <Route path='/user/explore/:bookId' component={BookDetail} />
            <Route path='/user/friends/:userId' component={UserDetail} />
            <Redirect to='/user/explore' />
          </Switch>
        </div>
        <UserNavBar />
      </Fragment>
    );
  }
}
