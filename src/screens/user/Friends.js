import React, { Component } from 'react';
import UserList from '../../components/friends/UserList';

export default class Friends extends Component {
  render() {
    return (
      <div className='screen-container'>
        <UserList />
      </div>
    );
  }
}
