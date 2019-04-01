import React, { Component } from 'react';
import BooksList from '../books/BooksList';

export default class ReadBooks extends Component {
  render() {
    return (
      <div className='screen-container'>
        <h1 className='section-title'>Books that you have read</h1>
        <BooksList state='read' />
      </div>
    );
  }
}
