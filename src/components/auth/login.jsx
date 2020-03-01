import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';

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
    logIn({ username, password })
      .then(user => {
        console.debug('🔥login ok', user);
        history.replace(from);
      })
      .catch(function(error) {
        console.warn('🔥login failed', error);
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
        autoComplete="username"
        onChange={value => setUsername(value)}
      />
      <Input
        type="password"
        label="password"
        value={password}
        helperText="keep password simple"
        icon="lock"
        autoComplete="current-password"
        onChange={value => setPassword(value)}
      />

      <button className="button flex-row center-center" onClick={onLogIn}>
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
