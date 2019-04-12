import React, { Component } from 'react';

export default class RegisterBookItem extends Component {
  render() {
    const { book, isActive } = this.props;
    return (
      <div
        className='register-book-item'
        onClick={() => this.props.bookClicked(book)}
      >
        <img
          className={isActive ? 'register-book-active' : ''}
          src={book.imageLink}
          alt={book.title}
        />
      </div>
    );
  }
}
