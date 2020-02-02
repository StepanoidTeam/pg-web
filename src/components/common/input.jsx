import React from "react";
import cx from "classnames";

import "./input.css";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false
    };
  }

  render() {
    const { label, value, helperText, icon, onChange } = this.props;
    const { isFocused } = this.state;
    const isEmpty = value.length === 0;

    return (
      <label
        className={cx("input mb-2 cursor-pointer", {
          "is-focused": isFocused,
          "is-empty": isEmpty
        })}
      >
        <div className="input-block flex-row justify-between">
          <div className="text-block flex-column  w-100">
            <div className="label-text">{label}</div>

            <input
              className="input-value w-100"
              type="text"
              value={value}
              placeholder=" "
              onChange={event => onChange(event.target.value)}
              onFocus={() => this.setState({ isFocused: true })}
              onBlur={() => this.setState({ isFocused: false })}
            />
          </div>
          {icon && (
            <i className="input-icon material-icons flex-row align-center">
              {icon}
            </i>
          )}
        </div>
        <hr className="m-0" />
        <div className="input-helper flex-row">
          <span>{helperText}</span>
        </div>
      </label>
    );
  }
}
