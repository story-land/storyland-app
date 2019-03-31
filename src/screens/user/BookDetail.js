import React, { Component } from 'react';
import booksService from '../../services/books-service';

export default class BookDetail extends Component {
  state = {
    book: {}
  };

  handlePendingBook = () => {};

  handleReadBook = () => {};

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
          <div className='book-detail-maininfo'>
            <figure className='book-detail-cover'>
              <img src={book.imageLink} alt={book.title} />
            </figure>
            <div className='book-detail-title'>
              <h2 className='detail-title'>{book.title}</h2>
              <h4 className='detail-author'>{authors}</h4>
            </div>
          </div>
          <div className='book-detail-buttons'>
            <button className='my-button pending-button'>
              Mark as pending
            </button>
            <button className='my-button read-button'>Mark as read</button>
          </div>
          <div className='book-detail-summary'>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    );
  }
}
