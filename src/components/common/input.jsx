import React from "react";
import cx from "classnames";

import "./input.css";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  render() {
    const { label, value, helperText, onChange } = this.props;

    return (
      <label className="mb-2 cursor-pointer">
        <div className="input">
          <div className="text-block">
            <div className="label-text">{label}</div>

            <input
              className="input-value w-100"
              type="text"
              value={value}
              onChange={event => onChange(event.target.value)}
            />
          </div>
        </div>
        <div className="input-helper flex-row">
          <span>{helperText}</span>
        </div>
      </label>
    );
  }
}
