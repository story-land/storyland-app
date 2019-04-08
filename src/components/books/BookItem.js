import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BookItem extends Component {
  handleAuthors = () => {
    if (this.props.book.authors) {
      let authors = [this.props.book.authors];
      if (authors.length === 1) authors = authors[0];
      if (authors.length > 1) authors = authors.join(' & ');
      return authors;
    } else {
      return '';
    }
  };

  render() {
    const { imageLink, title, id, genres } = this.props.book;
    const authors = this.handleAuthors();
    // const genre = genres[0];

    return (
      <li className='book-card card'>
        <Link to={`/user/explore/${id}`}>
          <figure className='card-image'>
            <img className='book-cover' src={imageLink} alt={title} />
            {/* <span className='badge red'>{genre}</span> */}
          </figure>
        </Link>
      </li>
    );
  }
}
