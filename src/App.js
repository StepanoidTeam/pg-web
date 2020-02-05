import React, { useEffect } from "react";
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
import { useGlobal } from "./use-global";
import { AnonRoute } from "./components/auth/anon-route";
import RoomList from "./components/rooms/rooms";

export default function App() {
  const [{ isOnline, isAuthenticated }, { setOnline }] = useGlobal();

  useEffect(() => {
    $apiVersion.then(data => setOnline(true));
  }, []);

  return (
    <Router>
      <div className={cx("app", { "is-online": isOnline })}>
        <VersionHolder />
        <Status />

        <Switch>
          {/* AUTH */}
          <AnonRoute path="/login">
            <Login />
          </AnonRoute>
          <AnonRoute path="/register">
            <Register />
          </AnonRoute>
          {/* ROOMS */}
          <AuthRoute path="/rooms">
            <RoomList />
          </AuthRoute>
          {/* GAME */}
          {/* // todo(vmyshko): add intermediate page that would define where to redirect user */}
          <Route path="/">
            <Redirect to="/rooms" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
