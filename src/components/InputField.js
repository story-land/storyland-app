import React, { Component } from 'react';
import { Input } from 'antd';

class InputField extends Component {
  render() {
    const {
      onChange,
      value,
      placeholder,
      errors,
      onblur,
      className,
      type,
      allowClear
    } = this.props;
    const hasErrors = errors && errors.length > 0;
    return (
      <div className={className}>
        <Input
          onChange={onChange}
          value={value}
          {...(type ? { type } : null)}
          {...(allowClear ? { allowClear } : null)}
          {...(placeholder ? { placeholder } : null)}
          {...(onblur ? { onBlur: onblur } : null)}
        />
        {hasErrors &&
          errors.map((error, index) => (
            <p className='error' key={index}>
              {error}
            </p>
          ))}
      </div>
    );
  }
}

InputField.defaultProps = {
  className: ''
};

export default InputField;
