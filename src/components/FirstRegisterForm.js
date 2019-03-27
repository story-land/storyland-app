import React, { Component } from 'react';
import { createForm } from '../utils/createForm';
import InputField from './InputField';
import { checkName, checkEmail, checkPassword } from '../utils/validators';
import { Icon } from 'antd';

class FirstRegisterForm extends Component {
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <form onSubmit={this.submitForm} className='reg-form'>
        <div>
          <Icon type='user' />
          <label>Name</label>
        </div>
        <InputField
          type='text'
          placeholder='Enter name'
          allowClear
          {...getFieldProps('name', {
            validateFirst: true,
            validateTrigger: 'onblur',
            rules: [{ required: true, validator: checkName }]
          })}
          errors={getFieldError('name')}
        />
        <div>
          <Icon type='mail' />
          <label>Email</label>
        </div>
        <InputField
          type='email'
          placeholder='Enter email'
          allowClear
          {...getFieldProps('email', {
            validateFirst: true,
            validateTrigger: 'onblur',
            rules: [{ required: true, validator: checkEmail }]
          })}
          errors={getFieldError('email')}
        />
        <div>
          <Icon type='lock' />
          <label>Password</label>
        </div>
        <InputField
          icon='lock'
          type='password'
          placeholder='Enter password'
          {...getFieldProps('password', {
            validateFirst: true,
            validateTrigger: 'onblur',
            rules: [{ required: true, validator: checkPassword }]
          })}
          errors={getFieldError('password')}
        />
        <button type='submit' className='my-button next-button'>
          Next
        </button>
      </form>
    );
  }
}

export default createForm()(FirstRegisterForm);
