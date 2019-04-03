import React, { Component } from 'react';
import ProfileBooksList from '../books/ProfileBooksList';

export default class ReadBooks extends Component {
  render() {
    return (
      <div className='screen-container'>
        <h1 className='section-title'>Books that you have read</h1>
        <ProfileBooksList state='read' />
      </div>
    );
  }
}
