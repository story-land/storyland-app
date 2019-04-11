import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <ul className='collection follow-container'>
        <div className='follow-item'>
          <div className='follow-content'>
            <Link to='/friends/list/followers'>
              <p>Followed by</p>
              <span className='follow-title'>{followed}</span>
              <p>readers</p>
            </Link>
          </div>
        </div>
        <div className='follow-item'>
          <div className='follow-content'>
            <Link to='/friends/list/following'>
              <p>Following</p>
              <span className='follow-title'>{following}</span>
              <p>readers</p>
            </Link>
          </div>
        </div>
      </ul>
    );
  }
}

export default withAuthConsumer(SocialProfileBox);
