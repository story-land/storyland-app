import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import userService from '../../services/user-service';
import UserItem from './UserItem';

class UserList extends Component {
  state = {
    users: []
  };

  componentDidMount = () => {
    userService.getUsers().then(users => {
      users = users.filter(user => user.id !== this.props.user.id);
      this.setState({ users: users });
    });
  };

  render() {
    const users = this.state.users.map(user => {
      return <UserItem user={user} key={user.id} />;
    });
    return (
      <div className='category-screen'>
        <h2 className='category-title'>
          Discover what other people are reading
        </h2>
        <div className='booklist-container'>
          <ul className='collection'>{users}</ul>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(UserList);
