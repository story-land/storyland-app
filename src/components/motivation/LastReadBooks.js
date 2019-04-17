import React, { Component } from 'react';
import { Select } from 'antd';
import Slider from 'react-slick';
import CountUp from 'react-countup';
import { withAuthConsumer } from '../../contexts/AuthStore';
import booksService from '../../services/books-service';
import sliderSettings from '../../utils/sliderSettings';
import BookItem from '../books/BookItem';
import Loading from '../misc/Loading';

class LastReadBooks extends Component {
  state = {
    user: {},
    period: 'year',
    readBooks: [],
    bookCount: 0,
    loading: false
  };

  handlePeriodChange = event => {
    const periodSelect = event;
    this.handleReadPeriod(periodSelect);
  };

  handleReadPeriod = period => {
    if (this.props.user.userbooks) {
      if (period === 'month') {
        const readIdBooks = this.props.user.userbooks
          .filter(elem => elem.state === 'read')
          .filter(
            elem =>
              new Date(elem.createdAt).getMonth() === new Date().getMonth()
          )
          .map(elem => elem.book);
        const readBooks = readIdBooks.map(async elem => {
          return booksService.getOneBook(elem).then(elem => elem);
        });
        Promise.all(readBooks).then(readBooks =>
          this.setState({
            readBooks,
            bookCount: readBooks.length,
            loading: false
          })
        );
      }

      if (period === 'year') {
        const readIdBooks = this.props.user.userbooks
          .filter(elem => elem.state === 'read')
          .filter(
            elem => new Date(elem.createdAt).getYear() === new Date().getYear()
          )
          .map(elem => elem.book);
        const readBooks = readIdBooks.map(async elem => {
          return booksService.getOneBook(elem).then(elem => elem);
        });
        Promise.all(readBooks).then(readBooks =>
          this.setState({
            readBooks,
            bookCount: readBooks.length,
            loading: false
          })
        );
      }
    } else {
      this.setState({
        loading: false
      });
    }
  };

  componentDidMount = () => {
    this.setState({ user: this.props.user, loading: true }, () => {
      this.handleReadPeriod(this.state.period);
    });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.refresh !== this.props.refresh) {
      this.handleReadPeriod(this.state.period);
    }
  };

  render() {
    const { bookCount, loading } = this.state;
    const badge = `Read in ${new Date().getFullYear()}`;
    const books = this.state.readBooks
      .sort(() => 0.5 - Math.random())
      .map(book => {
        return <BookItem key={book.id} book={book} badge={badge} />;
      });
    return (
      <div className='category-screen read-books-motivation-screen'>
        <div className='pages-read-wrapper'>
          <CountUp
            className='pages-read-count'
            start={0}
            duration={3}
            end={bookCount}
            redraw={true}
          />
          <h4 className='pages-read-in'>books read in</h4>
          <Select
            className='pages-period-select'
            defaultValue='year'
            onChange={this.handlePeriodChange}
          >
            <Select.Option value='month'>the last month</Select.Option>
            <Select.Option value='year'>the last year</Select.Option>
          </Select>
        </div>
        <div className='motivation-space-category' />
        <div className='category-screen'>
          <h4 className='category-title'>Books you have read</h4>
          {loading && <Loading />}
          {!loading && (
            <ul className='book-container'>
              <Slider {...sliderSettings}>{books}</Slider>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(LastReadBooks);
