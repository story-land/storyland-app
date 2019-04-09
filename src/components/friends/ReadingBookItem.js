import React, { Component } from 'react';
import BookListItem from '../books/BookListItem';

export default class ReadingBookItem extends Component {
  render() {
    const { book, friendName } = this.props;
    const name = friendName.substr(0, friendName.indexOf(' '));
    return (
      <div className='category-screen'>
        <h2 className='category-title'>{name} is currently reading</h2>
        <div className='booklist-container'>
          <ul className='collection'>
            <BookListItem book={book} key={book.id} />
          </ul>
        </div>
      </div>
    );
  }
}
