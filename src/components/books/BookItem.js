import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

export default class BookItem extends Component {
  render() {
    const { imageLink, title, authors, id } = this.props.book;
    return (
      <Fragment>
        {imageLink && (
          <div className='book-item'>
            <Link to={`/user/explore/${id}`}>
              <figure>
                <img className='book-cover' src={imageLink} alt={title} />
                <h4 className='book-title'>{title}</h4>
              </figure>
            </Link>
          </div>
        )}
        {!imageLink && (
          <div>
            <div className='book-item'>
              <h4 className='book-title'>{title}</h4>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
