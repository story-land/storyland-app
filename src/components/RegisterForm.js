import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { createForm } from '../utils/createForm';
import InputField from './InputField';
import { checkName, checkEmail, checkPassword } from '../utils/validators';
import { Icon } from 'antd';
import authService from '../services/auth-service';

class RegisterForm extends Component {
  state = {
    user: {},
    favBooks: [],
    error: '',
    secondScreen: false,
    isRegistered: false
  };

  submitFirstForm = event => {
    const { form } = this.props;
    event.preventDefault();
    form.validateFields((errors, fields) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors)
        this.setState({
          user: fields,
          secondScreen: true
        });
    });
  };

  submitRegister = event => {
    let { user, favBooks } = this.state;
    event.preventDefault();
    favBooks = [
      'Harry Potter',
      'Señor de los anillos',
      'Hola',
      'Qué tal',
      'Pues bien'
    ];
    if (favBooks.length >= 5 && favBooks.length <= 10) {
      const newUser = { user, favBooks };
      authService.register(newUser).then(
        user => {
          this.setState({
            isRegistered: true
          });
        },
        error => {
          console.log(user);
          const { message } = error.response.data;
          this.setState({
            error: message,
            secondScreen: false
          });
        }
      );
    }
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { user, error, secondScreen, isRegistered } = this.state;
    if (isRegistered) {
      return <Redirect to='/login' />;
    }
    return (
      <div className='reg-container'>
        {!this.state.secondScreen && (
          <form onSubmit={this.submitFirstForm} className='reg-form'>
            <div className='form-item'>
              <div className='form-item-data'>
                <Icon type='user' />
                <label>Name</label>
                <InputField
                  value={user.name}
                  type='text'
                  allowClear
                  {...getFieldProps('name', {
                    validateFirst: true,
                    validateTrigger: 'onblur',
                    rules: [{ required: true, validator: checkName }]
                  })}
                  errors={getFieldError('name')}
                />
              </div>
            </div>
            <div className='form-item'>
              <div className='form-item-data'>
                <Icon type='mail' />
                <label>Email</label>
                <InputField
                  value={user.mail}
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
            </div>
            <div className='form-item'>
              <div className='form-item-data'>
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
            </div>
            <p className='error'>{error}</p>
            <div className='form-item'>
              <div className='form-item-submit'>
                <button type='submit' className='my-button next-button'>
                  Next
                </button>
              </div>
            </div>
          </form>
        )}

        {secondScreen === true && (
          <Fragment>
            <h4>Choose 5 books that you like</h4>
            <div className='books-container'>
              <div className='book-item'>libro1</div>
              <div className='book-item'>libro2</div>
              <div className='book-item'>libro3</div>
              <div className='book-item'>libro4</div>
              <div className='book-item'>libro5</div>
              <div className='book-item'>libro6</div>
              <div className='book-item'>libro7</div>
              <div className='book-item'>libro8</div>
              <div className='book-item'>libro9</div>
              <div className='book-item'>libro10</div>
              <div className='book-item'>libro11</div>
              <div className='book-item'>libro12</div>
            </div>
            <button
              type='submit'
              className='my-button post-button'
              onClick={this.submitRegister}
            >
              Register
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default createForm()(RegisterForm);
