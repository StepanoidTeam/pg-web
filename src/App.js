import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import cx from 'classnames';

import { AuthRoute } from './components/auth/auth-route';
import VersionHolder from './components/version-holder';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Status from './components/auth/status';

import { useGlobal } from './use-global';
import { AnonRoute } from './components/auth/anon-route';
import RoomsRouter from './components/rooms/rooms-router';

import './App.css';
import { ws } from './services/web-socket';

export default function App() {
  const [{ isOnline, authToken }, {}] = useGlobal();

  useEffect(() => {
    if (!isOnline) return;

    ws.connect(authToken);
  }, [isOnline]);

  return (
    <Router>
      <div className={cx('app', { 'is-online': isOnline })}>
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
            <RoomsRouter />
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
