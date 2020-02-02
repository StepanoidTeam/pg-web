import React from "react";
import Input from "../common/input";
import { logIn } from "../../services/auth.service";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "kekster2000",
      password: "qwerty123"
    };
  }

  logIn = () => {
    const { username, password } = this.state;

    logIn({ username, password })
      .then(data => {
        console.log("login ok", data);

        this.props.history.push("/rooms");
      })
      .catch(error => {
        console.warn("login failed", error);
      });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="form flex-column">
        <Input
          label="username"
          value={username}
          helperText="username should be strong enough"
          icon="face"
          onChange={username => this.setState({ username })}
        />
        <Input
          label="password"
          value={password}
          helperText="keep password simple"
          icon="lock"
          onChange={password => this.setState({ password })}
        />

        <button
          className="button flex-row align-center justify-center"
          onClick={this.logIn}
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
}
