import React, { Component } from 'react';
import Slider from 'react-slick';
import sliderSettings from '../../utils/sliderSettings';
import booksService from '../../services/books-service';
import BookItem from '../books/BookItem';

export default class RelatedFriendBooks extends Component {
  state = {
    friend: {},
    books: []
  };

  componentDidMount = () => {
    const genres = this.props.friend.favGenres.join(',');
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
        let badge = book.genres[0];
        if (badge.includes(' ')) badge = badge.substr(0, badge.indexOf(' '));
        return <BookItem key={book.id} book={book} badge={badge} />;
      });
    const { name } = this.props.friend;
    const friendName = name.substr(0, name.indexOf(' '));

    return (
      <div className='category-screen'>
        <h4 className='category-title'>
          Books related to what {friendName} likes
        </h4>
        <ul className='book-container'>
          <Slider {...sliderSettings}>{books}</Slider>
        </ul>
      </div>
    );
  }
}
