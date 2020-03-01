import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function AnonRoute({ isAuthenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (!isAuthenticated ? children : <Redirect to="/" />)}
    />
  );
}
