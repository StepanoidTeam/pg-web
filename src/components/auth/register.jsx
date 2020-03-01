import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';

import Input from '../common/input';
import { register } from '../../services/auth.service';
import { useGlobal } from '../../use-global';

export default function Register() {
  const [{}, { setUserData }] = useGlobal();
  const [username, setUsername] = useState('jailbot007');
  const [password, setPassword] = useState('kek123');
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const onRegister = () => {
    register({ username, password })
      .then(data => {
        console.log('🔥auth', data.user);
        history.replace(from);
      })
      .catch(function(error) {
        console.warn('🔥register failed:', error);
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
        label="password"
        value={password}
        helperText="keep password simple"
        icon="lock"
        autoComplete="current-password"
        onChange={value => setPassword(value)}
      />

      <button className="button flex-row center-center" onClick={onRegister}>
        <span>register</span>
        <i className="material-icons">add_box</i>
      </button>
      <span className="p-2 flex-row justify-between">
        Already have an account?
        <Link to="/login">log in</Link>
      </span>
    </div>
  );
}
