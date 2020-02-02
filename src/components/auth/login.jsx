import React, { useState } from "react";
import Input from "../common/input";
import { logIn } from "../../services/auth.service";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("kekster2000");
  const [password, setPassword] = useState("qwerty123");
  const history = useHistory();

  const onLogIn = () => {
    logIn({ username, password })
      .then(data => {
        console.log("login ok", data);

        history.push("/rooms");
      })
      .catch(error => {
        console.warn("login failed", error);
      });
  };

  return (
    <div className="form flex-column">
      <Input
        label="username"
        value={username}
        helperText="username should be strong enough"
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
        <a href="/register">register</a>
      </span>
    </div>
  );
}
