import React, { Component } from 'react';
import BookListItem from './BookListItem';

export default class ProfileBooksList extends Component {
  render() {
    const books = this.props.books.map(book => {
      return <BookListItem book={book} key={book.id} />;
    });
    return (
      <div className='booklist-container'>
        <ul className='collection'>{books}</ul>
      </div>
    );
  }
}
