import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import cx from 'classnames';

import * as firebase from 'firebase/app';

import { AuthRoute } from './components/auth/auth-route';
import VersionHolder from './components/version-holder';
import Login from './components/auth/login';
import Register from './components/auth/register';
import StatusHolder from './components/auth/status-holder';

import { useGlobal } from './use-global';
import { AnonRoute } from './components/auth/anon-route';
import RoomsRouter from './components/rooms/rooms-router';

import './App.css';
import MapPreview from './components/map/map-preview';

export default function App() {
  const [{}, { setUserData, clearUserData }] = useGlobal();

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserData(user);
        setIsAuth(true);
      } else {
        clearUserData();
        setIsAuth(false);
      }
    });
  }, []);

  return (
    <Router>
      <div className={cx('app', { 'is-online': isAuth })}>
        {typeof isAuth !== 'boolean' ? (
          <div>loading...</div>
        ) : (
          <>
            <VersionHolder />
            <StatusHolder />
            <Switch>
              {/* AUTH */}
              <AnonRoute path="/login" isAuthenticated={isAuth}>
                <Login />
              </AnonRoute>
              <AnonRoute path="/register" isAuthenticated={isAuth}>
                <Register />
              </AnonRoute>
              {/* ROOMS */}
              <AuthRoute path="/rooms" isAuthenticated={isAuth}>
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
          </>
        )}
      </div>
    </Router>
  );
}
