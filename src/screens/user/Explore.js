import React, { Component, Fragment } from 'react';
import booksService from '../../services/books-service';
import debounce from 'lodash/debounce';
import { Icon } from 'antd';
import SearchBar from '../../components/explore/SearchBar';
import SearchBooksList from '../../components/books/SearchBooksList';
import ExploreBestRatedBooks from '../../components/explore/ExploreBestRatedBooks';
import ExploreRelatedBooks from '../../components/explore/ExploreRelatedBooks';
import ExploreLatestBooks from '../../components/explore/ExploreLatestBooks';
import ExploreBooksByGenre from '../../components/explore/ExploreBooksByGenre';

class Explore extends Component {
  state = {
    books: [],
    search: '',
    coverBook: false
  };

  onSearch = debounce(search => {
    this.setState({ search });
    if (search.length > 3) {
      booksService.getSearchedBook(search).then(books => {
        this.setState({ books });
      });
    }
  }, 1000);

  uploadCover = file => {
    booksService.postCoverBook(file).then(books => {
      this.setState({ books, coverBook: true });
    });
  };

  closeCoverSearch = () => {
    this.setState({ search: '', coverBook: false });
  };

  render() {
    const { books, search, coverBook } = this.state;
    return (
      <div className='screen-container'>
        <SearchBar
          onSearch={this.onSearch.bind(this)}
          uploadCover={this.uploadCover.bind(this)}
        />
        {(search || coverBook) && <SearchBooksList books={books} />}
        {coverBook && (
          <Icon
            type='close-circle'
            className='close-cover-search'
            onClick={this.closeCoverSearch}
          />
        )}
        {!search && (
          <Fragment>
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
