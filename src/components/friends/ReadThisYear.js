import React, { Component } from 'react';
import BookListItem from '../books/BookListItem';

export default class ReadThisYear extends Component {
  render() {
    let { friendName } = this.props;
    if (friendName.includes(' ')) {
      friendName = friendName.substr(0, friendName.indexOf(' '));
    }
    let books = [];
    if (this.props.books.length > 0) {
      books = this.props.books.map(book => {
        return <BookListItem book={book} key={book.id} />;
      });
    } else if (this.props.books.length === 0) {
      books = (
        <li className='collection-item avatar'>
          <span className='title not-books-found'>
            <strong>Not books found</strong>
          </span>
        </li>
      );
    }
    return (
      <div className='category-screen'>
        <h2 className='category-title'>Books read by {friendName} this year</h2>
        <div className='booklist-container'>
          <div className='booklist-container'>
            <ul className='collection'>{books}</ul>
          </div>
        </div>
      </div>
    );
  }
}
