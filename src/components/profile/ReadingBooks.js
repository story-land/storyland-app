import React, { Component } from 'react';
import ProfileBooksList from '../books/ProfileBooksList';

export default class ReadingBooks extends Component {
  render() {
    return (
      <div className='category-screen profile-booklist-container'>
        <h2 className='category-title'>Books that you are reading</h2>
        <ProfileBooksList state='reading' />
      </div>
    );
  }
}
