import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BookItem extends Component {
  state = {
    showBadge: false
  };

  showImgBadge = () => {
    this.setState({ showBadge: true }, () => console.log('done'));
  };

  render() {
    const { imageLink, title, id } = this.props.book;
    const { badge } = this.props;
    const { showBadge } = this.state;

    return (
      <li className='book-card card'>
        <Link to={`/explore/${id}`}>
          <figure className='card-image'>
            <img
              onLoad={this.showImgBadge}
              className='book-cover'
              src={imageLink}
              alt={title}
            />
            {showBadge && <span className='badge book-badge'>{badge}</span>}
          </figure>
        </Link>
      </li>
    );
  }
}
