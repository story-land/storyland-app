import React, { Component } from 'react';
import BooksList from '../../components/books/BooksList';

export default class PendingBooks extends Component {
  render() {
    return (
      <div className='screen-container'>
        <h1 className='section-title'>Books that you have pending</h1>
        <BooksList />
      </div>
    );
  }
}
