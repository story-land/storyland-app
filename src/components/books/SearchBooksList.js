import React, { Component } from 'react';
import BookListItem from './BookListItem';

export default class SearchBooksList extends Component {
  render() {
    let books = [];
    if (this.props.books !== '') {
      books = this.props.books.map(book => {
        return <BookListItem book={book} key={book.id} />;
      });
    } else {
      books = (
        <li className='collection-item avatar'>
          <span className='title'>
            <strong>Not books found</strong>
          </span>
        </li>
      );
    }

    return (
      <div className='booklist-container'>
        <ul className='collection'>{books}</ul>
      </div>
    );
  }
}
