import React, { Component } from 'react';
import ProfileBooksList from '../books/ProfileBooksList';

export default class PendingBooks extends Component {
  render() {
    return (
      <div className='category-screen'>
        <h2 className='category-title'>Books that you have pending</h2>
        <ProfileBooksList state='pending' />
      </div>
    );
  }
}
