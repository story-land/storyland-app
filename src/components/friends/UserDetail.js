import React, { Component, Fragment } from 'react';
import userService from '../../services/user-service';
import booksService from '../../services/books-service';
import FriendProfileBox from './FriendProfileBox';
import { withAuthConsumer } from '../../contexts/AuthStore';
import ReadingBookItem from './ReadingBookItem';
import RelatedFriendBooks from './RelatedFriendBooks';
import ReadThisYear from './ReadThisYear';
import Loading from '../misc/Loading';

class UserDetail extends Component {
  state = {
    friend: {},
    readingBook: {},
    readBooks: [],
    followButton: false,
    loading: true
  };

  handleFollow = () => {
    const { friend } = this.state;
    userService.followUser(this.state.friend.id).then(relation => {
      if (relation) {
        this.setState({
          friend: {
            ...friend,
            followers: [...friend.followers, relation]
          }
        });
      }
    });
  };

  handleUnfollow = () => {
    const { friend } = this.state;
    const { user } = this.props;
    userService.unfollowUser(this.state.friend.id).then(() => {
      this.setState({
        friend: {
          ...friend,
          followers: friend.followers.filter(
            ({ follower }) => follower !== user.id
          )
        }
      });
    });
  };

  componentDidMount = () => {
    const userId = this.props.match.params.userId;
    userService.getUser(userId).then(friend => {
      const bookReading = friend.userbooks.find(
        elem => elem.state === 'reading'
      );
      const readBooks = friend.userbooks.filter(elem => elem.state === 'read');
      if (bookReading && readBooks) {
        const readPromises = readBooks.map(async book => {
          return booksService.getOneBook(book.book).then(elem => elem);
        });
        const readingPromise = booksService
          .getOneBook(bookReading.book)
          .then(elem => elem);

        Promise.all([readingPromise, ...readPromises]).then(
          ([readingBook, ...readBooks]) => {
            this.setState({
              friend,
              readingBook,
              readBooks,
              loading: false
            });
          }
        );
      } else {
        this.setState({ friend, loading: false });
      }
    });
  };

  render() {
    const {
      friend,
      followButton,
      loading,
      readingBook,
      readBooks
    } = this.state;
    const { id } = this.props.user;
    return (
      <div className='screen-container'>
        {!loading ? (
          <Fragment>
            <FriendProfileBox
              friend={friend}
              followButton={followButton}
              handleFollow={this.handleFollow}
              handleUnfollow={this.handleUnfollow}
              userId={id}
            />
            {readingBook.title && (
              <ReadingBookItem book={readingBook} friendName={friend.name} />
            )}
            {readBooks && (
              <ReadThisYear books={readBooks} friendName={friend.name} />
            )}
          </Fragment>
        ) : (
          <Loading />
        )}
        {friend.name && <RelatedFriendBooks friend={friend} />}
      </div>
    );
  }
}

export default withAuthConsumer(UserDetail);
