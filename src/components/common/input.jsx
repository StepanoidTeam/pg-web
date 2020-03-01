import React from 'react';
import cx from 'classnames';

import './input.css';

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };
  }

  render() {
    const {
      label,
      value,
      helperText,
      icon,
      errorText,
      onChange,
      ...rest
    } = this.props;
    const { isFocused } = this.state;
    const isEmpty = value.length === 0;
    const hasError = !!errorText;

    return (
      <label
        className={cx('input cursor-pointer', {
          'is-focused': isFocused,
          'is-empty': isEmpty,
          'has-error': hasError,
        })}
      >
        <div className="input-body flex-row justify-between">
          <div className="flex-column justify-center position-relative w-100 px-2">
            <div className="input-label">{label}</div>

            <input
              className="input-value w-100"
              type="text"
              value={value}
              {...rest}
              onChange={event => onChange(event.target.value)}
              onFocus={() => this.setState({ isFocused: true })}
              onBlur={() => this.setState({ isFocused: false })}
            />
          </div>
          {icon && !hasError && (
            <i className="input-icon material-icons flex-row align-center mx-2">
              {icon}
            </i>
          )}
          {hasError && (
            <i className="error-icon material-icons flex-row align-center mx-2">
              error
            </i>
          )}
        </div>
        <hr className="m-0" />
        <div className="input-footer flex-row ml-2">
          {helperText && !hasError && (
            <span className="helper-text text-ellipsis" title={helperText}>
              {helperText}
            </span>
          )}
          {hasError && (
            <span className="error-text text-ellipsis" title={errorText}>
              {errorText}
            </span>
          )}
        </div>
      </label>
    );
  }
}
