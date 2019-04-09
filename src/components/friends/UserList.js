import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import userService from '../../services/user-service';
import booksService from '../../services/books-service';
import UserItem from './UserItem';

class UserList extends Component {
  state = {
    users: [],
    loading: true
  };

  componentDidMount = () => {
    userService.getUsers().then(users => {
      users = users.filter(user => user.id !== this.props.user.id);

      users = users.map(async elem => {
        const bookReading = elem.userbooks.find(
          elem => elem.state === 'reading'
        );
        if (bookReading) {
          return booksService.getOneBook(bookReading.book).then(bookReading => {
            elem.readingBook = {
              id: bookReading.id,
              title: bookReading.title,
              authors: bookReading.authors,
              image: bookReading.imageLink
            };
            return elem;
          });
        } else {
          return elem;
        }
      });

      Promise.all(users).then(users =>
        this.setState({ users: users, loading: false })
      );
    });
  };

  render() {
    return (
      <div className='category-screen'>
        <h2 className='category-title'>
          Discover what other people are reading
        </h2>
        <div className='friendslist-container'>
          <ul className='collection'>
            {!this.state.loading ? (
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
              <p>Loading...</p>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(UserList);
