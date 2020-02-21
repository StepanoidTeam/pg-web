import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import * as firebase from 'firebase/app';

import Input from '../common/input';
import { logIn } from '../../services/auth.service';
import { useGlobal } from '../../use-global';

export default function Login() {
  const [{}, { setUserData }] = useGlobal();
  const [username, setUsername] = useState('kekster2000@example.com');
  const [password, setPassword] = useState('qwerty123');
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const onLogIn = () => {
    //🔥
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(data => {
        console.debug('🔥login ok', data);
        setUserData(data.user);
        history.replace(from);
      })
      .catch(function(error) {
        console.warn('🔥login failed', error);
        setErrorMessage(error.message);
      });

    return;
    logIn({ username, password })
      .then(data => {
        setUserData(data);
        console.debug('login ok', data);
        history.replace(from);
      })
      .catch(error => {
        console.warn('login failed', error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="form flex-column">
      <Input
        label="username"
        value={username}
        helperText="username should be strong enough"
        errorText={errorMessage}
        icon="face"
        onChange={value => setUsername(value)}
      />
      <Input
        label="password"
        value={password}
        helperText="keep password simple"
        icon="lock"
        onChange={value => setPassword(value)}
      />

      <button
        className="button flex-row align-center justify-center"
        onClick={onLogIn}
      >
        <span>log in</span>
        <i className="material-icons">arrow_forward</i>
      </button>
      <span className="p-2 flex-row justify-between">
        Don't have an account?
        <Link to="/register">register</Link>
      </span>
    </div>
  );
}
