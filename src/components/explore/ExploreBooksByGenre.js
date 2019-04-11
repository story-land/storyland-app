import React, { Component } from 'react';
import Slider from 'react-slick';
import { Select } from 'antd';
import sliderSettings from '../../utils/sliderSettings';
import booksService from '../../services/books-service';
import BookItem from '../books/BookItem';
import Loading from '../misc/Loading';

class ExploreRelatedBooks extends Component {
  state = {
    books: [],
    genre: '',
    loading: false
  };

  handleSelectChange = event => {
    const genre = event;
    this.handleGenreBooks(genre);
  };

  handleGenreBooks = genre => {
    this.setState({ loading: true }, () => {
      booksService.getRelatedBooks(genre).then(response => {
        this.setState({
          books: response,
          loading: false
        });
      });
    });
  };

  componentDidMount = () => {
    this.handleGenreBooks('Fiction');
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
        <div className='genre-input'>
          <h4 className='category-title'>Books by genre</h4>
          <Select
            className='pages-period-select'
            defaultValue='Fiction'
            onChange={this.handleSelectChange}
          >
            <Select.Option value={`Biography & Autobiography`}>
              Biography & Autobiography
            </Select.Option>
            <Select.Option value={`Business & Economics`}>
              Business & Economics
            </Select.Option>
            <Select.Option value='Fiction'>Fiction</Select.Option>
            <Select.Option value={`Health & Fitness`}>
              Health & Fitness
            </Select.Option>
            <Select.Option value='Juvenile Nonfiction'>
              Juvenile Nonfiction
            </Select.Option>
            <Select.Option value='History'>History</Select.Option>
            <Select.Option value='Literary Collections'>
              Literary Collections
            </Select.Option>
            <Select.Option value='Performing Arts'>
              Performing Arts
            </Select.Option>
            <Select.Option value='Political Science'>
              Political Science
            </Select.Option>
            <Select.Option value='Self-Help'>Self-Help</Select.Option>
            <Select.Option value='Social Science'>Social Science</Select.Option>
          </Select>
        </div>
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

export default ExploreRelatedBooks;
