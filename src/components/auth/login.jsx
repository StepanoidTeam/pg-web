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
          onChange={login => this.setState({ login })}
        />
        <Input
          label="password"
          value={password}
          helperText="keep password simple"
          onChange={password => this.setState({ password })}
        />

        <button className="button">log in</button>
        <span>
          Don't have an account?
          <a href="/register">register</a>
        </span>
      </div>
    );
  }
}
