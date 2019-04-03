import React from 'react';
import { Link } from 'react-router-dom';

const BookListItem = props => {
  const { imageLink, title, authors, id } = props.book;
  const author = [authors]
    .flat()
    .map((author, index) => <span key={index}>{author}</span>);
  return (
    <li className='collection-item avatar'>
      <Link to={`/user/explore/${id}`}>
        <img src={imageLink} alt={title} className='circle' />
        <span className='title'>{title}</span>
        <p>{author}</p>
      </Link>
      <a href='#!' className='secondary-content'>
        <i className='material-icons' />
      </a>
    </li>
  );
};

export default BookListItem;
