import React, { Component } from 'react';
import BookListItem from './BookListItem';
import userbookService from '../../services/userbook-service';

export default class ProfileBooksList extends Component {
  state = {
    books: []
  };

  componentDidMount = () => {
    if (this.props.state === 'pending') {
      userbookService.getPendingBooks().then(books => {
        this.setState({
          books: books
        });
      });
    }
    if (this.props.state === 'read') {
      userbookService.getReadBooks().then(books => {
        this.setState({
          books: books
        });
      });
    }
  };

  render() {
    const books = this.state.books.map(book => {
      return <BookListItem book={book} key={book.id} />;
    });
    return (
      <div className='booklist-container'>
        <ul className='collection'>{books}</ul>
      </div>
    );
  }
}
