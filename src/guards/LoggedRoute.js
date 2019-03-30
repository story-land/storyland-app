import React from 'react';
import { AuthContext } from '../contexts/AuthStore';
import { Redirect, Route } from 'react-router-dom';

const LoggedRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, user }) => (
        <Route
          {...rest}
          render={props => {
            if (!isAuthenticated()) {
              return <Component {...props} />;
            }
            return <Redirect to='/user/explore' />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default LoggedRoute;
