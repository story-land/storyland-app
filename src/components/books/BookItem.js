import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BookItem extends Component {
  render() {
    const { imageLink, title, id } = this.props.book;
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
