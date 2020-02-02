import React from "react";
import Input from "../common/input";

export default class Register extends React.Component {
  render() {
    return (
      <div className="form">
        <Input label="username" value="kekster2000" />
        <Input label="password" value="qwerty123" />

        <button className="button">Register</button>
        <span>
          Don't have an account?
          <a href="/login">log in</a>
        </span>
      </div>
    );
  }
}
