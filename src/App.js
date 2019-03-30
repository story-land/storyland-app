import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './screens/Landing';
import Register from './screens/Register';
import Login from './screens/Login';
import UserContainer from './screens/user/UserContainer';
import { Forbidden, NotFound } from './screens/errors/Error';
import PrivateRoute from './guards/PrivateRoute';
import LoggedRoute from './guards/LoggedRoute';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <LoggedRoute path='/register' component={Register} />
          <LoggedRoute path='/login' component={Login} />
          <Route exact path='/' component={Landing} />
          <PrivateRoute path='/user' component={UserContainer} />
          <Route exact path='/forbidden' component={Forbidden} />
          <Route exact path='/not-found' component={NotFound} />
          <Redirect to='/not-found' />
        </Switch>
      </div>
    );
  }
}

export default App;
