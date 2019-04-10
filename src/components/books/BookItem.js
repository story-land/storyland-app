import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BookItem extends Component {
  render() {
    const { imageLink, title, id } = this.props.book;
    const { badge } = this.props;

    return (
      <li className='book-card card'>
        <Link to={`/explore/${id}`}>
          <figure className='card-image'>
            <img className='book-cover' src={imageLink} alt={title} />
            <span className='badge book-badge'>{badge}</span>
          </figure>
        </Link>
      </li>
    );
  }
}
