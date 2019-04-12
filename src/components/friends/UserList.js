import React, { Component, Fragment } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import Slider from 'react-slick';
import sliderSettings from '../../utils/sliderSettings';
import userService from '../../services/user-service';
import booksService from '../../services/books-service';
import UserItem from './UserItem';
import BookItem from '../books/BookItem';
import Loading from '../misc/Loading';

class UserList extends Component {
  state = {
    users: [],
    trendingBooks: [],
    loading: true
  };

  componentDidMount = () => {
    userService.getUsers().then(users => {
      users = users.filter(user => user.id !== this.props.user.id);

      users = users.map(async elem => {
        const bookReading = elem.userbooks.find(
          elem => elem.state === 'reading'
        );
        const bookPending = elem.userbooks.find(
          elem => elem.state === 'pending'
        );
        if (bookReading && bookPending) {
          return Promise.all([
            booksService.getOneBook(bookReading.book),
            booksService.getOneBook(bookPending.book)
          ]).then(([bookReading, bookPending]) => {
            elem.readingBook = {
              id: bookReading.id,
              title: bookReading.title,
              authors: bookReading.authors,
              imageLink: bookReading.imageLink
            };
            elem.pendingBook = {
              id: bookPending.id,
              title: bookPending.title,
              authors: bookPending.authors,
              imageLink: bookPending.imageLink,
              user: elem.name
            };
            return elem;
          });
        } else {
          return elem;
        }
      });

      Promise.all(users).then(users => {
        let trendingBooks = users.map(user => {
          if (user.pendingBook) {
            return user.pendingBook;
          }
        });
        trendingBooks = trendingBooks.filter(elem => elem !== undefined);
        this.setState(
          {
            users: users,
            trendingBooks
          },
          () => this.setState({ loading: false })
        );
      });
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <Fragment>
        <div className='category-screen'>
          <h2 className='category-title'>
            Discover what other people are reading
          </h2>
          <div className='friendslist-container'>
            <ul className='collection'>
              {!loading ? (
                this.state.users.map(user => {
                  if (user.readingBook)
                    return (
                      <UserItem
                        user={user}
                        book={user.readingBook}
                        key={user.id}
                      />
                    );
                  else return <UserItem user={user} key={user.id} />;
                })
              ) : (
                <Loading />
              )}
            </ul>
          </div>
        </div>
        <div className='friends-space-category' />
        <div className='category-screen'>
          <h4 className='category-title'>
            Books that your friends want to read
          </h4>
          {loading && <Loading />}
          {!loading && (
            <ul className='book-container'>
              <Slider {...sliderSettings}>
                {this.state.trendingBooks
                  .sort(() => 0.5 - Math.random())
                  .map(book => {
                    return (
                      <BookItem key={book.id} book={book} badge={book.user} />
                    );
                  })}
              </Slider>
            </ul>
          )}
        </div>
      </Fragment>
    );
  }
}

export default withAuthConsumer(UserList);
