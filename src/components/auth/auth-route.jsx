import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useGlobal } from "../../use-global";

export function AuthRoute({ children, ...rest }) {
  const [{ isAuthenticated }] = useGlobal();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
