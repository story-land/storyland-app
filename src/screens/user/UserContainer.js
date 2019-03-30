import React, { Fragment, Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserNavBar from '../../components/misc/UserNavBar';
import Explore from './Explore';
import Motivation from './Motivation';
import PendingBooks from './PendingBooks';
import ReadBooks from './ReadBooks';
import BasicTopBar from '../../components/misc/BasicTopBar';

export default class UserContainer extends Component {
  render() {
    return (
      <Fragment>
        <BasicTopBar />
        <Switch>
          <Route exact path='/user/explore' component={Explore} />
          <Route exact path='/user/motivation' component={Motivation} />
          <Route exact path='/user/pendingbooks' component={PendingBooks} />
          <Route exact path='/user/readbooks' component={ReadBooks} />
          <Redirect to='/user/explore' />
        </Switch>
        <UserNavBar />
      </Fragment>
    );
  }
}
