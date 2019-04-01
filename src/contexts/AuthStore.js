import React, { Component } from 'react';

const CURRENT_USER_KEY = 'current-user';
const DAILY_GOALS = 'daily-goals';

const AuthContext = React.createContext();

class AuthStore extends Component {
  state = {
    user: JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}'),
    goals: JSON.parse(localStorage.getItem(DAILY_GOALS) || '{}')
  };

  handleUserChange = user => {
    this.setState({ user: user });
    if (user && user.email) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  };

  handleUserGoals = goals => {
    this.setState({ goals: goals });
    if (this.state.user && this.state.user.email) {
      localStorage.setItem(DAILY_GOALS, JSON.stringify(goals));
    } else {
      localStorage.removeItem(DAILY_GOALS);
    }
  };

  isAuthenticated = () => this.state.user && this.state.user.email;

  render() {
    return (
      <AuthContext.Provider
        value={{
          user: this.state.user,
          goals: this.state.goals,
          onUserChanged: this.handleUserChange,
          isAuthenticated: this.isAuthenticated,
          goalsChanged: this.handleUserGoals
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const withAuthConsumer = Component => {
  return props => (
    <AuthContext.Consumer>
      {storeProps => <Component {...props} {...storeProps} />}
    </AuthContext.Consumer>
  );
};

export { AuthContext, AuthStore, withAuthConsumer };
