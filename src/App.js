import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './screens/Landing';
import Register from './screens/Register';
import Login from './screens/Login';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Landing} />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
