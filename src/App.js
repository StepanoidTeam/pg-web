import React, { useEffect } from 'react';
import {
  HashRouter as Router,
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
import MapPreview from './components/map/map-preview';

export default function App() {
  const global = useGlobal();
  const [{ isOnline }, {}] = global;

  useEffect(() => {
    if (isOnline) return;

    ws.connect(global);
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
          {/* maps */}
          <Route path="/maps/:mapId">
            <MapPreview />
          </Route>

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
