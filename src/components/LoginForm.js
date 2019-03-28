import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createForm } from '../utils/createForm';
import InputField from './InputField';
import { checkEmail, checkPassword } from '../utils/validators';
import { Icon } from 'antd';
import authService from '../services/auth-service';
import { withAuthConsumer } from '../contexts/AuthStore';

class LoginForm extends Component {
  state = {
    errors: '',
    isAuthenticated: false
  };

  submitLogin = event => {
    const { form } = this.props;
    event.preventDefault();
    form.validateFields((errors, fields) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        console.log(fields);
        authService.login(fields).then(
          user => {
            this.setState({ isAuthenticated: true }, () => {
              this.props.onUserChanged(user);
            });
          },
          error => {
            const { errors } = error;
            this.setState({
              errors: errors
            });
          }
        );
      }
    });
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { errors, isAuthenticated } = this.state;
    if (isAuthenticated) {
      return <Redirect to='/explore' />;
    }
    return (
      <div className='reg-container'>
        <form onSubmit={this.submitLogin} className='reg-form'>
          <div className='form-item'>
            <Icon type='mail' />
            <label>Email</label>
            <InputField
              type='email'
              allowClear
              {...getFieldProps('email', {
                validateFirst: true,
                validateTrigger: 'onblur',
                rules: [{ required: true, validator: checkEmail }]
              })}
              errors={getFieldError('email')}
            />
          </div>
          <div className='form-item'>
            <Icon type='lock' />
            <label>Password</label>
            <InputField
              icon='lock'
              type='password'
              {...getFieldProps('password', {
                validateFirst: true,
                validateTrigger: 'onblur',
                rules: [{ required: true, validator: checkPassword }]
              })}
              errors={getFieldError('password')}
            />
          </div>
          {errors}
          <div className='form-item'>
            <button type='submit' className='my-button next-button'>
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withAuthConsumer(createForm()(LoginForm));
