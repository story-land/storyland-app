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
    error: '',
    isAuthenticated: false
  };

  submitLogin = event => {
    const { form } = this.props;
    event.preventDefault();
    form.validateFields((errors, fields) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        authService.login(fields).then(
          user => {
            this.setState({ isAuthenticated: true }, () => {
              this.props.onUserChanged(user);
            });
          },
          error => {
            const { message } = error.response.data;
            this.setState({
              error: message
            });
          }
        );
      }
    });
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { error, isAuthenticated } = this.state;
    if (isAuthenticated) {
      return <Redirect to='/user/explore' />;
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
              type='password'
              allowClear
              {...getFieldProps('password', {
                validateFirst: true,
                validateTrigger: 'onblur',
                rules: [{ required: true, validator: checkPassword }]
              })}
              errors={getFieldError('password')}
            />
          </div>
          <p className='error'>{error}</p>
          <div className='form-item'>
            <div className='form-item-submit'>
              <button type='submit' className='my-button next-button'>
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withAuthConsumer(createForm()(LoginForm));
