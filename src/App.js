import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import cx from "classnames";

import logo from "./assets/pg-icon.svg";
import VersionHolder from "./components/version-holder";
import { $apiVersion } from "./services/version.service";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { AuthRoute } from "./components/auth/auth-route";

import "./App.css";

export default function App() {
  const [isOnline, setOnline] = useState(false);

  useEffect(() => {
    $apiVersion.then(() => setOnline(true)).then(() => {});
  }, []);

  return (
    <Router>
      <div className={cx("app", { "is-online": isOnline })}>
        <VersionHolder />

        <div>
          <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/rooms">rooms</Link>
            </li>
          </ul>

          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <AuthRoute path="/rooms">rooms here</AuthRoute>
            <Route path="/">
              <img
                src={logo}
                className={cx("app-logo", { "is-pulse": !isOnline })}
                alt="logo"
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
