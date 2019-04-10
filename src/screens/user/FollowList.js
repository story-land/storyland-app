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
    // const { followstate } = this.props.match.params;
    // let followUsers = [];
    // if (followstate === 'following') {
    //   followUsers = this.props.user.following;
    // }
    // if (followstate === 'followers') {
    //   followUsers = this.props.user.followers;
    // }
    // followUsers = followUsers.map(async elem => {
    //   userService.getUser(elem.id).then(user => {
    //     const bookReading = user.userbooks.find(
    //       elem => elem.state === 'reading'
    //     );
    //     if (bookReading) {
    //       return booksService.getOneBook(bookReading.book).then(bookReading => {
    //         user.readingBook = {
    //           id: bookReading.id,
    //           title: bookReading.title,
    //           authors: bookReading.authors,
    //           image: bookReading.imageLink
    //         };
    //         return elem;
    //       });
    //     } else {
    //       return elem;
    //     }
    //   });
    // });
    // Promise.all(followUsers).then(users => {
    //   console.log(users[3].readingBook);
    //   this.setState({ users, loading: false });
    // });
  };

  render() {
    const { loading } = this.state;

    return (
      <div className='category-screen'>
        {/* <h2 className='category-title'>
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
        </div> */}
      </div>
    );
  }
}

export default withAuthConsumer(FollowList);
