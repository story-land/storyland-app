import React, { Component, Fragment } from 'react';
import booksService from '../../services/books-service';
import debounce from 'lodash/debounce';
import SearchBar from '../../components/explore/SearchBar';
import SearchBooksList from '../../components/books/SearchBooksList';
import ExploreBestRatedBooks from '../../components/explore/ExploreBestRatedBooks';
import ExploreRelatedBooks from '../../components/explore/ExploreRelatedBooks';
import ExploreLatestBooks from '../../components/explore/ExploreLatestBooks';
import ExploreBooksByGenre from '../../components/explore/ExploreBooksByGenre';

class Explore extends Component {
  state = {
    books: [],
    search: ''
  };

  onSearch = debounce(search => {
    this.setState({ search });
    if (search.length > 3) {
      booksService.getSearchedBook(search).then(books => {
        this.setState({ books });
      });
    }
  }, 1000);

  render() {
    const { books, search } = this.state;
    return (
      <div className='screen-container'>
        <SearchBar onSearch={this.onSearch.bind(this)} />
        {search && <SearchBooksList books={books} />}
        {!search && (
          <Fragment>
            <h1 className='section-title'>
              Discover books that you might like
            </h1>
            <ExploreRelatedBooks />
            <ExploreBestRatedBooks />
            <ExploreLatestBooks />
            <ExploreBooksByGenre />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Explore;
