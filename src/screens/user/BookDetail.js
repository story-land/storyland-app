import React, { Component } from 'react';
import booksService from '../../services/books-service';
import userbooksService from '../../services/userbook-service';

export default class BookDetail extends Component {
  state = {
    book: {},
    state: ''
  };

  handleStateButton = event => {
    const state = event.target.value;
    this.setState({ state });
    userbooksService.createStateBook(this.state.book.id, state);
    userbooksService.getStateBook(this.state.book.id).then(state => {
      this.setState({ state: state });
    });
  };

  componentDidMount = () => {
    const { bookId } = this.props.match.params;
    booksService.getOneBook(bookId).then(book => {
      this.setState({ book: book });
    });
    userbooksService.getStateBook(bookId).then(state => {
      this.setState({ state: state });
    });
  };

  render() {
    const authors = [this.state.book.authors]
      .flat()
      .map((author, index) => <span key={index}>{author}</span>);
    const { book, state } = this.state;

    return (
      <div className='screen-container'>
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
            <button
              className={
                state === 'pending'
                  ? 'my-button active-state'
                  : 'my-button pending-button'
              }
              value='pending'
              onClick={this.handleStateButton}
            >
              pending
            </button>
            <button
              className={
                state === 'reading'
                  ? 'my-button active-state'
                  : 'my-button reading-button'
              }
              value='reading'
              onClick={this.handleStateButton}
            >
              reading
            </button>
            <button
              className={
                state === 'read'
                  ? 'my-button active-state'
                  : 'my-button reading-button'
              }
              value='read'
              onClick={this.handleStateButton}
            >
              read
            </button>
          </div>
          <div className='book-detail-info'>
            {state && (
              <p>
                <strong>State:</strong> {state}
              </p>
            )}
            {book.pageCount && (
              <p>
                <strong>Page count:</strong> {book.pageCount}
              </p>
            )}
            {book.googleRating && (
              <p>
                <strong>Rating:</strong> {book.googleRating}/5
              </p>
            )}
          </div>
          <div className='book-detail-summary'>
            <p>
              <strong>Description: </strong>
              {book.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
