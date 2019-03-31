import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BookItem extends Component {
  render() {
    const { imageLink, title, authors, id } = this.props.book;

    const author = [authors]
      .flat()
      .map((author, index) => <span key={index}>{author}</span>);

    return (
      <li className='book-card card'>
        <Link to={`/user/explore/${id}`}>
          <figure className='card-image'>
            <img className='book-cover' src={imageLink} alt={title} />
          </figure>
          <div className='book-info'>
            <h4 className='book-title'>{title}</h4>
            <p className='book-authors'>{author}</p>
          </div>
        </Link>
      </li>
    );
  }
}
