import React, { Component } from 'react';
import userService from '../../services/user-service';
import FriendProfileBox from './FriendProfileBox';
import { withAuthConsumer } from '../../contexts/AuthStore';

class UserDetail extends Component {
  state = {
    friend: {},
    followButton: false
  };

  handleFollow = () => {
    console.log('hola');
    // userService.followUser(this.state.friend.id).then(res => {
    //   if (res === 'followed') {
    //     this.setState({ followButton: true });
    //   } else {
    //     this.setState({ followButton: false });
    //   }
    // });
  };

  handleUnfollow = () => {
    userService.unfollowUser(this.state.friend.id).then(res => {
      this.setState({ followButton: false });
    });
  };

  componentDidMount = () => {
    const userId = this.props.match.params.userId;
    userService.getUser(userId).then(friend =>
      this.setState({ friend }, () => {
        const followButton = this.state.friend.followers
          .map(elem => elem.follower)
          .some(elem => elem === this.props.user.id);
        this.setState({ followButton });
      })
    );
  };

  render() {
    const { friend, followButton } = this.state;
    return (
      <div className='screen-container'>
        <FriendProfileBox
          friend={friend}
          followButton={followButton}
          handleFollow={this.handleFollow}
          handleUnfollow={this.handleUnfollow}
        />
      </div>
    );
  }
}

export default withAuthConsumer(UserDetail);
