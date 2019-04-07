import React, { Component } from 'react';
import ProfileBooksList from '../books/ProfileBooksList';

export default class ReadBooks extends Component {
  render() {
    return (
      <div className='category-screen'>
        <h2 className='category-title'>Books that you have read</h2>
        <ProfileBooksList state='read' />
      </div>
    );
  }
}
