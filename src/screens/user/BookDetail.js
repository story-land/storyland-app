import React, { Component } from 'react';
import { Collapse } from 'antd';
import Slider from 'react-slick';
import sliderSettings from '../../utils/sliderSettings';
import booksService from '../../services/books-service';
import userbooksService from '../../services/userbook-service';
import BookItem from '../../components/books/BookItem';

const Panel = Collapse.Panel;

export default class BookDetail extends Component {
  state = {
    book: {},
    relatedBooks: [],
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

  formatDate = date => {
    return new Date(date).toLocaleDateString();
  };

  handleAuthors = () => {
    if (this.state.book.authors) {
      let authors = [this.state.book.authors];
      if (authors.length === 1) authors = authors[0];
      if (authors.length > 1) authors = authors.join(' & ');
      return authors;
    } else {
      return '';
    }
  };

  componentDidMount = () => {
    const { bookId } = this.props.match.params;
    Promise.all([
      booksService.getOneBook(bookId),
      userbooksService.getStateBook(bookId)
    ]).then(([book, state]) => {
      const genre = book.genres[0];
      booksService.getRelatedBooks(genre).then(relatedBooks => {
        this.setState({
          book,
          state,
          relatedBooks
        });
      });
    });
  };

  componentDidUpdate(prevProps) {
    const { bookId } = this.props.match.params;
    if (bookId !== prevProps.match.params.bookId) {
      Promise.all([
        booksService.getOneBook(bookId),
        userbooksService.getStateBook(bookId)
      ]).then(([book, state]) => {
        const genre = book.genres[0];
        booksService.getRelatedBooks(genre).then(relatedBooks => {
          this.setState(
            {
              book,
              state,
              relatedBooks
            },
            () => (document.querySelector('body').scrollTop = 0)
          );
        });
      });
    }
  }

  render() {
    const { book, state } = this.state;
    const authors = this.handleAuthors();
    const publishedDate = this.formatDate(this.state.book.publishedDate);
    const relatedBooks = this.state.relatedBooks
      .filter(elem => elem.isbn !== book.isbn)
      .sort(() => 0.5 - Math.random())
      .map(book => {
        return <BookItem key={book.id} book={book} />;
      });
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
          <div className='book-detail-buttons collection'>
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
          <div className='book-detail-summary'>
            <Collapse bordered={false} defaultActiveKey={[]}>
              {book.googleRating && (
                <Panel header='Rating' key='1'>
                  {book.googleRating}
                </Panel>
              )}
              {book.pageCount && (
                <Panel header='Page Count' key='2'>
                  {book.pageCount} pages
                </Panel>
              )}
              {publishedDate && (
                <Panel header='Published Date' key='3'>
                  Date: {publishedDate}
                </Panel>
              )}
              {book.description && (
                <Panel header='Description' key='4'>
                  {book.description}
                </Panel>
              )}
            </Collapse>
          </div>
        </div>
        <div className='category-screen'>
          <h4 className='category-title'>Related books</h4>
          <ul className='book-container'>
            <Slider {...sliderSettings}>{relatedBooks}</Slider>
          </ul>
        </div>
      </div>
    );
  }
}
