import React, { Component } from 'react';
import Slider from 'react-slick';
import sliderSettings from '../../utils/sliderSettings';
import booksService from '../../services/books-service';
import BookItem from '../books/BookItem';
import { withAuthConsumer } from '../../contexts/AuthStore';

class ExploreRelatedBooks extends Component {
  state = {
    books: []
  };

  componentDidMount = () => {
    const genres = this.props.user.favGenres.join(',');
    booksService.getRelatedBooks(genres).then(response => {
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
        <h4 className='category-title'>Books that you will like</h4>
        <ul className='book-container'>
          <Slider {...sliderSettings}>{books}</Slider>
        </ul>
      </div>
    );
  }
}

export default withAuthConsumer(ExploreRelatedBooks);
