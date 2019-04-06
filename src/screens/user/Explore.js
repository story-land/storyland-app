import React, { Component, Fragment } from 'react';
import booksService from '../../services/books-service';
import SearchBar from '../../components/explore/SearchBar';
import SearchBooksList from '../../components/books/SearchBooksList';
import ExploreBestRatedBooks from '../../components/explore/ExploreBestRatedBooks';
import ExploreRelatedBooks from '../../components/explore/ExploreRelatedBooks';
import ExploreLatestBooks from '../../components/explore/ExploreLatestBooks';

class Explore extends Component {
  state = {
    books: [],
    search: ''
  };

  onSearch = search => {
    this.setState({ search });
    if (search.length > 3) {
      booksService.getSearchedBook(search).then(books => {
        this.setState({ books: [] });
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
            <h1 className='section-title'>
              Discover books that you might like
            </h1>
            <ExploreRelatedBooks />
            <ExploreBestRatedBooks />
            <ExploreLatestBooks />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Explore;
