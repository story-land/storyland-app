import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './screens/Landing';
import Register from './screens/Register';
import Login from './screens/Login';
import Explore from './screens/user/Explore';
import Motivation from './screens/user/Motivation';
import PendingBooks from './screens/user/PendingBooks';
import ReadBooks from './screens/user/ReadBooks';
import { Forbidden, NotFound } from './screens/errors/Error';
import PrivateRoute from './guards/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Landing} />
          <PrivateRoute exact path='/explore' component={Explore} />
          <PrivateRoute exact path='/motivation' component={Motivation} />
          <PrivateRoute exact path='/pendingbooks' component={PendingBooks} />
          <PrivateRoute exact path='/readbooks' component={ReadBooks} />
          <Route exact path='/forbidden' component={Forbidden} />
          <Route exact path='/not-found' component={NotFound} />
          <Redirect to='/explore' />
        </Switch>
      </div>
    );
  }
}

export default App;
