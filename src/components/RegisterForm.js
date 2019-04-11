import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { createForm } from '../utils/createForm';
import InputField from './InputField';
import { checkName, checkEmail, checkPassword } from '../utils/validators';
import { Icon } from 'antd';
import authService from '../services/auth-service';
import bookService from '../services/books-service';
import RegisterBookItem from './RegisterBookItem';

class RegisterForm extends Component {
  state = {
    user: {},
    registerBooks: [],
    favBooks: [],
    error: '',
    secondScreen: false,
    isRegistered: false,
    postButton: false
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
      this.handleRegisterBooks();
    });
  };

  submitRegister = event => {
    let { user, favBooks } = this.state;
    event.preventDefault();
    if (favBooks.length > 2) {
      let fGenres = favBooks.map(elem => elem.genres[0]);
      fGenres = removeDups(fGenres);
      fGenres = fGenres.slice(0, 3);
      user.favGenres = fGenres;
      authService.register(user).then(
        user => {
          this.setState({
            isRegistered: true
          });
        },
        error => {
          const { message } = error.response.data;
          this.setState({
            error: message,
            secondScreen: false
          });
        }
      );
    }

    function removeDups(names) {
      let unique = {};
      names.forEach(function(i) {
        if (!unique[i]) {
          unique[i] = true;
        }
      });
      return Object.keys(unique);
    }
  };

  handleRegisterBooks = () => {
    bookService.getRegisterBooks().then(books => {
      this.setState({
        registerBooks: books
      });
    });
  };

  handleCoverChange = book => {
    if (this.state.favBooks.includes(book)) {
      this.setState(
        {
          favBooks: [...this.state.favBooks].filter(elem => elem !== book)
        },
        () => {
          this.handlePostButton();
        }
      );
    } else {
      this.setState({ favBooks: [...this.state.favBooks, book] }, () => {
        this.handlePostButton();
      });
    }
  };

  handlePostButton = () => {
    if (this.state.favBooks.length > 2) {
      this.setState({ postButton: true });
    } else {
      this.setState({ postButton: false });
    }
  };

  render() {
    document.querySelector('body').scrollTop = 0;
    const { getFieldProps, getFieldError } = this.props.form;
    const {
      user,
      error,
      secondScreen,
      isRegistered,
      favBooks,
      postButton
    } = this.state;
    const registerBooks = this.state.registerBooks.map(elem => {
      let isFavBook = favBooks.includes(elem) ? true : false;
      return (
        <RegisterBookItem
          book={elem}
          key={elem.id}
          bookClicked={this.handleCoverChange}
          isActive={isFavBook}
        />
      );
    });
    if (isRegistered) {
      return <Redirect to='/login' />;
    }
    return (
      <div className='reg-container'>
        {!this.state.secondScreen && (
          <form onSubmit={this.submitFirstForm} className='reg-form'>
            <div className='form-item'>
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
            <div className='form-item'>
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
                  Next
                </button>
              </div>
            </div>
          </form>
        )}

        {secondScreen === true && (
          <Fragment>
            <h4 className='choose-register-title'>
              Choose 3 or more books that you like
            </h4>
            <div className='register-books-container'>{registerBooks}</div>
            <div className='form-item-submit'>
              {!postButton && (
                <button
                  type='submit'
                  className='my-button post-button disabled-button'
                  onClick={this.submitRegister}
                  disabled
                >
                  Register
                </button>
              )}
              {postButton && (
                <button
                  type='submit'
                  className='my-button post-button'
                  onClick={this.submitRegister}
                >
                  Register
                </button>
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default createForm()(RegisterForm);
