import React from "react";
import Input from "../common/input";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "kekster2000",
      password: "qwerty123"
    };
  }

  render() {
    const { login, password } = this.state;

    return (
      <div className="form flex-column">
        <Input
          label="username"
          value={login}
          helperText="username should be strong enough"
          icon="face"
          onChange={login => this.setState({ login })}
        />
        <Input
          label="password"
          value={password}
          helperText="keep password simple"
          icon="lock"
          onChange={password => this.setState({ password })}
        />

        <button className="button flex-row align-center justify-center">
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
}
