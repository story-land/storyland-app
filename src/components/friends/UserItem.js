import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserItem extends Component {
  state = {
    user: this.props.user,
    book: this.props.book
  };

  render() {
    const { id, name, avatarURL } = this.state.user;
    const { book } = this.state;
    return (
      <li className='collection-item avatar'>
        <Link to={`/user/friends/${id}`}>
          <img src={avatarURL} alt={name} className='circle' />
          <span className='title'>
            <strong>{name}</strong>
          </span>
          {book ? (
            <p className='currently-reading'>
              Currently reading:{' '}
              <span className='currently-reading-text'>
                <span className='currently-reading-title'> {book.title}</span>{' '}
              </span>
            </p>
          ) : (
            <p className='currently-reading'>Not currently reading</p>
          )}
        </Link>
        <a href='#!' className='secondary-content'>
          <i className='material-icons' />
        </a>
      </li>
    );
  }
}
