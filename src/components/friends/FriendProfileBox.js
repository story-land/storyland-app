import React, { Component } from 'react';
import userService from '../../services/user-service';
import { withAuthConsumer } from '../../contexts/AuthStore';

class FriendProfileBox extends Component {
  state = {
    friend: {}
  };

  render() {
    const { id, name, avatarURL, pagesGoal, favGenres } = this.props.friend;
    const { followButton } = this.props;
    console.log(name);
    return (
      <div className='category-screen'>
        <div className='card horizontal profile-card'>
          <div className='card-image profile-avatar'>
            <img
              src={
                avatarURL
                  ? avatarURL
                  : 'https://profile.actionsprout.com/default.jpeg'
              }
              alt='profile-pic'
              className='profile-avatar-img'
            />
          </div>
          <div className='card-stacked'>
            <div className='card-content'>
              <h4>{name}</h4>
              <p>
                Daily goal: <strong>{pagesGoal} pages</strong>
              </p>
            </div>
            <div className='card-action profile-link'>
              {!followButton && (
                <button
                  className='my-button follow-button'
                  onClick={this.props.handleFollow}
                >
                  Follow the reader
                </button>
              )}
              {followButton && (
                <button
                  className='my-button unfollow-button'
                  onClick={this.props.handleUnfollow}
                >
                  Unfollow the reader
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(FriendProfileBox);
