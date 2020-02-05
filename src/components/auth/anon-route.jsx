import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useGlobal } from "../../use-global";

export function AnonRoute({ children, ...rest }) {
  const [{ isAuthenticated }] = useGlobal();

  return (
    <Route
      {...rest}
      render={() => (!isAuthenticated ? children : <Redirect to="/" />)}
    />
  );
}
