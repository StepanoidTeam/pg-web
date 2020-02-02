import React from "react";
import { Route, Redirect } from "react-router-dom";

import { authState } from "../../services/auth.service";

export function AuthRoute({ children, ...rest }) {
  const checkAuth = () => {
    if (!authState.isAuthenticated) {
      console.log("redirect");
    }

    return authState.isAuthenticated;
  };

  return (
    <Route
      {...rest}
      render={({ location }) =>
        checkAuth() ? (
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
