import React, { Component } from 'react';
import booksService from '../../services/books-service';
import BookItem from '../../components/books/BookItem';

export default class Explore extends Component {
  state = {
    books: []
  };

  componentDidMount = () => {
    booksService.getAllBooks().then(response => {
      this.setState({
        books: response
      });
    });
  };

  render() {
    const books = this.state.books.map(book => {
      return <BookItem key={book.isbn} book={book} />;
    });
    return (
      <div className='explore-container'>
        <div className='screen-container'>
          <h1 className='screen-title'>Explore books that you might like</h1>
          <div className='book-container'>{books}</div>
        </div>
      </div>
    );
  }
}
