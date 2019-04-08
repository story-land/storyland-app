import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = props => {
  const { id, name, avatarURL, pagesGoal } = props.user;
  return (
    <li className='collection-item avatar'>
      <Link to={`/user/friends/${id}`}>
        <img src={avatarURL} alt={name} className='circle' />
        <span className='title'>
          <strong>{name}</strong>
        </span>
        <p>Pages goal: {pagesGoal}</p>
      </Link>
      <a href='#!' className='secondary-content'>
        <i className='material-icons' />
      </a>
    </li>
  );
};

export default UserItem;
