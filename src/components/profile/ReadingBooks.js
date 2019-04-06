import React, { Component } from 'react';
import ProfileBooksList from '../books/ProfileBooksList';

export default class ReadingBooks extends Component {
  render() {
    return (
      <div className='screen-container'>
        <h2 className='section-title'>Books that you are reading</h2>
        <ProfileBooksList state='reading' />
      </div>
    );
  }
}
