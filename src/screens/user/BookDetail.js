import React, { Component } from 'react';
import booksService from '../../services/books-service';

export default class BookDetail extends Component {
  state = {
    book: {}
  };

  componentDidMount = () => {
    const { bookId } = this.props.match.params;
    booksService.getOneBook(bookId).then(book => {
      this.setState({
        book: book
      });
    });
  };

  render() {
    const authors = [this.state.book.authors]
      .flat()
      .map((author, index) => <span key={index}>{author}</span>);
    const book = this.state.book;

    return (
      <div className='book-detail-screen'>
        <div className='book-detail-container'>
          <figure className='book-detail-cover'>
            <img alt={book.imageLink} />
          </figure>
          <div className='book-detail-info'>
            <h2>{book.title}</h2>
            <h4>{authors}</h4>
          </div>
        </div>
      </div>
    );
  }
}
