import React, { Component } from 'react';

class FriendProfileBox extends Component {
  render() {
    const {
      name,
      avatarURL,
      pagesGoal,
      favGenres,
      followers
    } = this.props.friend;
    const { userId } = this.props;
    const followButton = followers.some(
      follower => follower.follower === userId
    );
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

export default FriendProfileBox;
