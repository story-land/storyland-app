import React, { Component, Fragment } from 'react';
import SearchBar from '../../components/explore/SearchBar';
import ExploreAllBooks from '../../components/explore/ExploreAllBooks';
import SearchBooksList from '../../components/books/SearchBooksList';
import booksService from '../../services/books-service';

class Explore extends Component {
  state = {
    books: [],
    search: ''
  };

  onSearch = search => {
    this.setState({ search });
    if (this.state.search.length >= 3) {
      booksService.getSearchedBook(search).then(books => {
        this.setState({ books });
      });
    }
  };

  render() {
    const { books, search } = this.state;
    return (
      <div className='screen-container'>
        <SearchBar onSearch={this.onSearch} />
        {search && <SearchBooksList books={books} />}
        {!search && (
          <Fragment>
            <h1 className='section-title'>Explore books that you might like</h1>
            <ExploreAllBooks />
            <ExploreAllBooks />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Explore;
