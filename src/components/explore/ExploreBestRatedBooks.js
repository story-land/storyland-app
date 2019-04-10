import React, { Component } from 'react';
import Slider from 'react-slick';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import sliderSettings from '../../utils/sliderSettings';
import booksService from '../../services/books-service';
import BookItem from '../books/BookItem';
import Loading from '../misc/Loading';

library.add(faStar);

export default class ExploreBestRatedBooks extends Component {
  state = {
    books: [],
    loading: false
  };

  componentDidMount = () => {
    this.setState({ loading: true }, () => {
      booksService.getBestRatedBooks(5).then(response => {
        this.setState({
          books: response,
          loading: false
        });
      });
    });
  };

  render() {
    const books = this.state.books
      .sort(() => 0.5 - Math.random())
      .map(book => {
        return (
          <BookItem
            key={book.id}
            book={book}
            badge={
              <React.Fragment>
                {book.googleRating} <FontAwesomeIcon icon='star' />
              </React.Fragment>
              // `${book.googleRating}${' '}` && <FontAwesomeIcon icon='star' />
            }
          />
        );
      });
    const { loading } = this.state;
    return (
      <div className='category-screen'>
        <h4 className='category-title'>Best rated books</h4>
        {loading && <Loading />}
        {!loading && (
          <ul className='book-container'>
            <Slider {...sliderSettings}>{books}</Slider>
          </ul>
        )}
      </div>
    );
  }
}
