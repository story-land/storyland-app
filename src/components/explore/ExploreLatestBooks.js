import React, { Component } from 'react';
import Slider from 'react-slick';
import sliderSettings from '../../utils/sliderSettings';
import booksService from '../../services/books-service';
import BookItem from '../books/BookItem';

export default class ExploreLatestBooks extends Component {
  state = {
    books: []
  };

  componentDidMount = () => {
    booksService.getLatestBooks(2019).then(response => {
      this.setState({
        books: response
      });
    });
  };

  render() {
    const books = this.state.books
      .sort(() => 0.5 - Math.random())
      .map(book => {
        return <BookItem key={book.id} book={book} />;
      });

    return (
      <div className='category-screen'>
        <h4 className='category-title'>Latest books</h4>
        <ul className='book-container'>
          <Slider {...sliderSettings}>{books}</Slider>
        </ul>
      </div>
    );
  }
}
