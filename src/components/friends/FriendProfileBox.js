import React, { Component } from 'react';

class FriendProfileBox extends Component {
  handleGenres = () => {
    if (this.props.friend) {
      let genres = [this.props.friend.favGenres];
      if (genres.length === 1) genres = genres[0];
      if (genres.length > 1) genres = genres.slice(0, 2).join(' & ');
      return genres;
    } else {
      return '';
    }
  };

  render() {
    const { name, avatarURL, followers } = this.props.friend;
    const { userId } = this.props;
    const followButton = followers.some(
      follower => follower.follower === userId
    );
    const genres = this.handleGenres();
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
                Favorite genres: <strong>{genres}</strong>
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
