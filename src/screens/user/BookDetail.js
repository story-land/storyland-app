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
            <img src={book.imageLink} alt={book.title} />
          </figure>
          <div className='book-detail-title'>
            <h2>{book.title}</h2>
            <h4>{authors}</h4>
          </div>
          <div className='book-detail-info'>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    );
  }
}
