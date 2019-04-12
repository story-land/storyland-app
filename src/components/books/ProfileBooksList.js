import React, { Component } from 'react';
import BookListItem from './BookListItem';
import userbookService from '../../services/userbook-service';

export default class ProfileBooksList extends Component {
  state = {
    books: []
  };

  componentDidMount = () => {
    userbookService.getProfileBooks(this.props.state).then(books => {
      this.setState({
        books: books
      });
    });
  };

  render() {
    let books = [];
    if (this.state.books.length > 0) {
      books = this.state.books.map(book => {
        return <BookListItem book={book} key={book.id} />;
      });
    } else if (this.state.books.length === 0) {
      books = (
        <li className='collection-item avatar'>
          <span className='title not-books-found'>
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
