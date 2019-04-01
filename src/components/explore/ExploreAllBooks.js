import React, { Component } from 'react';
import Slider from 'react-slick';
import sliderSettings from '../../utils/sliderSettings';
import booksService from '../../services/books-service';
import BookItem from '../books/BookItem';

export default class ExploreAllBooks extends Component {
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
      <div className='category-screen'>
        <h2 className='category-title'>All books</h2>
        <ul className='book-container'>
          <Slider {...sliderSettings}>{books}</Slider>
        </ul>
      </div>
    );
  }
}
