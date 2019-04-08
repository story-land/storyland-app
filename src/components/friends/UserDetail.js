import React, { Component } from 'react';
import userService from '../../services/user-service';
import FriendProfileBox from './FriendProfileBox';
import { withAuthConsumer } from '../../contexts/AuthStore';

class UserDetail extends Component {
  state = {
    friend: {},
    followButton: false,
    loading: true
  };

  handleFollow = () => {
    const { friend } = this.state;
    userService.followUser(this.state.friend.id).then(relation => {
      if (relation) {
        this.setState({
          friend: {
            ...friend,
            followers: [...friend.followers, relation]
          }
        });
      }
    });
  };

  handleUnfollow = () => {
    const { friend } = this.state;
    const { user } = this.props;
    userService.unfollowUser(this.state.friend.id).then(() => {
      this.setState({
        friend: {
          ...friend,
          followers: friend.followers.filter(
            ({ follower }) => follower !== user.id
          )
        }
      });
    });
  };

  componentDidMount = () => {
    const userId = this.props.match.params.userId;
    userService
      .getUser(userId)
      .then(friend => this.setState({ friend, loading: false }));
  };

  render() {
    const { friend, followButton, loading } = this.state;
    const { id } = this.props.user;
    return (
      <div className='screen-container'>
        {!loading ? (
          <FriendProfileBox
            friend={friend}
            followButton={followButton}
            handleFollow={this.handleFollow}
            handleUnfollow={this.handleUnfollow}
            userId={id}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default withAuthConsumer(UserDetail);
