import React, { Component, Fragment } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import authService from '../../services/auth-service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { createForm } from '../../utils/createForm';
import { Upload, Button, Icon } from 'antd';
import { checkEmail, checkName } from '../../utils/validators';
import InputField from '../InputField';

library.add(faCog);

class ProfileBox extends Component {
  state = {
    user: this.props.user,
    error: '',
    editBox: false,
    avatar: null
  };

  editProfile = () => {
    this.setState({
      editBox: true
    });
  };

  cancelEdit = () => {
    this.setState({
      user: this.props.user,
      error: '',
      editBox: false,
      avatar: null
    });
  };

  submitProfile = event => {
    const { avatar } = this.state;
    const { form } = this.props;
    event.preventDefault();
    form.validateFields((errors, fields) => {
      const hasErrors = errors && Object.keys(errors).length > 0;
      if (!hasErrors) {
        if (avatar) {
          fields.avatar = avatar;
        }
        authService.updateProfile(fields).then(
          user => {
            this.setState(
              { editBox: false, user: { ...this.state.user, ...user } },
              () => {
                this.props.onUserChanged(user);
              }
            );
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
    const { user, editBox, error, avatar } = this.state;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <Fragment>
        {!editBox && (
          <div className='category-screen'>
            <div className='card horizontal profile-card'>
              <div className='card-image profile-avatar'>
                <img
                  src={
                    user.avatarURL
                      ? user.avatarURL
                      : 'https://profile.actionsprout.com/default.jpeg'
                  }
                  alt='profile-pic'
                  className='profile-avatar-img'
                />
              </div>
              <div className='card-stacked'>
                <div className='card-content'>
                  <h4>{user.name}</h4>
                  <p>
                    Daily goal: <strong>{user.pagesGoal} pages</strong>
                  </p>
                </div>
                <div className='profile-link'>
                  <FontAwesomeIcon icon='cog' onClick={this.editProfile} />
                </div>
              </div>
            </div>
          </div>
        )}
        {editBox && (
          <div className='screen-container'>
            <div className='card-horizontal profile-card profile-card-edit'>
              <div className='card-image profile-avatar-edit'>
                <div className='profile-form-image'>
                  <img
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : user.avatarURL
                        ? user.avatarURL
                        : 'https://profile.actionsprout.com/default.jpeg'
                    }
                    alt='profile-pic'
                    className='profile-avatar-img'
                  />
                  <Upload
                    className='upload-pic-button'
                    name='logo'
                    listType='picture'
                    beforeUpload={file => {
                      this.setState({ avatar: file });
                      return false;
                    }}
                  >
                    <Button htmlType='button'>
                      <Icon type='upload' /> Upload
                    </Button>
                  </Upload>
                </div>
              </div>
              <div className='card-stacked profile-info'>
                <div className='card-content'>
                  <form id='profile-form' onSubmit={this.submitProfile}>
                    <div className='profile-form-group'>
                      <label>Name</label>
                      <InputField
                        type='text'
                        allowClear
                        {...getFieldProps('name', {
                          initialValue: user.name,
                          validateFirst: true,
                          validateTrigger: 'onblur',
                          rules: [{ required: true, validator: checkName }]
                        })}
                        errors={getFieldError('name')}
                      />
                    </div>
                    <div className='profile-form-group'>
                      <label>Email</label>
                      <InputField
                        type='email'
                        allowClear
                        {...getFieldProps('email', {
                          initialValue: user.email,
                          validateFirst: true,
                          validateTrigger: 'onblur',
                          rules: [{ required: true, validator: checkEmail }]
                        })}
                        errors={getFieldError('email')}
                      />
                    </div>
                    <div className='profile-form-group'>
                      <label>Pages goal</label>
                      <InputField
                        type='number'
                        allowClear
                        {...getFieldProps('pagesGoal', {
                          initialValue: user.pagesGoal,
                          validateFirst: true,
                          validateTrigger: 'onblur',
                          rules: [{ required: true }]
                        })}
                      />
                    </div>
                    <p className='error'>{error}</p>
                    <div className='profile-form-group card-action'>
                      <div className='profile-group-submit'>
                        <button
                          onClick={this.cancelEdit}
                          className='my-button cancel-button'
                        >
                          Cancel
                        </button>
                        <button
                          type='submit'
                          className='my-button update-button'
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withAuthConsumer(createForm()(ProfileBox));
