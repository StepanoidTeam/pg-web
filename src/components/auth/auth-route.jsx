import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useGlobal } from '../../use-global';

export function AuthRoute({ children, ...rest }) {
  const [{ user }] = useGlobal();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
