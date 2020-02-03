import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import cx from "classnames";

import { $apiVersion } from "./services/version.service";
import { AuthRoute } from "./components/auth/auth-route";
import VersionHolder from "./components/version-holder";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Status from "./components/auth/status";

import "./App.css";

export default function App() {
  const [isOnline, setOnline] = useState(false);

  useEffect(() => {
    $apiVersion.then(() => setOnline(true));
  }, []);

  return (
    <Router>
      <div className={cx("app", { "is-online": isOnline })}>
        <VersionHolder />

        <Status />

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <AuthRoute path="/rooms">rooms here</AuthRoute>
          <Route path="/">
            <Redirect to="/rooms" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
