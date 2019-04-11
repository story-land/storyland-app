import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import booksService from '../../services/books-service';
import UserItem from '../../components/friends/UserItem';
import Loading from '../../components/misc/Loading';
import userService from '../../services/user-service';

class FollowList extends Component {
  state = {
    users: [],
    loading: true
  };

  componentDidMount = () => {
    const { followstate } = this.props.match.params;
    let followUsers = [];

    if (followstate === 'following') {
      followUsers = this.props.user.following;
      const followPromises = followUsers.map(async elem => {
        return userService.getUser(elem.followed).then(user => {
          const bookReading = user.userbooks.find(
            book => book.state === 'reading'
          );
          if (bookReading) {
            return booksService.getOneBook(bookReading.book).then(rbook => {
              user.readingBook = {
                id: rbook.id,
                title: rbook.title,
                authors: rbook.authors,
                image: rbook.imageLink
              };
              return user;
            });
          } else {
            return user;
          }
        });
      });
      Promise.all(followPromises).then(users => {
        this.setState({ users, loading: false });
      });
    }
    if (followstate === 'followers') {
      followUsers = this.props.user.followers;
      const followPromises = followUsers.map(async elem => {
        return userService.getUser(elem.follower).then(user => {
          const bookReading = user.userbooks.find(
            book => book.state === 'reading'
          );
          if (bookReading) {
            return booksService.getOneBook(bookReading.book).then(rbook => {
              user.readingBook = {
                id: rbook.id,
                title: rbook.title,
                authors: rbook.authors,
                image: rbook.imageLink
              };
              return user;
            });
          } else {
            return user;
          }
        });
      });
      Promise.all(followPromises).then(users => {
        this.setState({ users, loading: false });
      });
    }
  };

  render() {
    const { loading } = this.state;
    const { followstate } = this.props.match.params;

    return (
      <div className='screen-container'>
        <div className='category-screen'>
          {followstate === 'following' && (
            <h2 className='category-title'>Friends that you follow</h2>
          )}
          {followstate === 'followers' && (
            <h2 className='category-title'>Friends who follow you</h2>
          )}
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
      </div>
    );
  }
}

export default withAuthConsumer(FollowList);
