import React, { Component } from 'react';
import userService from '../../services/user-service';
import { withAuthConsumer } from '../../contexts/AuthStore';

class SocialProfileBox extends Component {
  state = {
    followed: 0,
    following: 0
  };

  componentDidMount = () => {
    userService.getSocialUsers(this.props.user.id).then(social => {
      this.setState({
        followed: social.followers.length,
        following: social.following.length
      });
    });
  };

  render() {
    const { followed, following } = this.state;
    return (
      <div className='category-screen'>
        <ul className='collection follow-container'>
          <div className='follow-item'>
            <div className='follow-content'>
              <p>Followed by</p>
              <span className='follow-title'>{followed}</span>
              <p>readers</p>
            </div>
          </div>
          <div className='follow-item'>
            <div className='follow-content'>
              <p>Following</p>
              <span className='follow-title'>{following}</span>
              <p>readers</p>
            </div>
          </div>
        </ul>
      </div>
    );
  }
}

export default withAuthConsumer(SocialProfileBox);
