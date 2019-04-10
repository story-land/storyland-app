import React, { Component } from 'react';
import Slider from 'react-slick';
import sliderSettings from '../../utils/sliderSettings';
import booksService from '../../services/books-service';
import BookItem from '../books/BookItem';
import Loading from '../misc/Loading';
import { withAuthConsumer } from '../../contexts/AuthStore';

class ExploreRelatedBooks extends Component {
  state = {
    books: [],
    loading: false
  };

  componentDidMount = () => {
    const genres = this.props.user.favGenres.join(',');
    this.setState({ loading: true }, () => {
      booksService.getRelatedBooks(genres).then(response => {
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
        let badge = book.genres[0];
        if (badge.includes(' ')) badge = badge.substr(0, badge.indexOf(' '));
        return <BookItem key={book.id} book={book} badge={badge} />;
      });
    const { loading } = this.state;
    return (
      <div className='category-screen'>
        <h4 className='category-title'>Books that you will like</h4>
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

export default withAuthConsumer(ExploreRelatedBooks);
