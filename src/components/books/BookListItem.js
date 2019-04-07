import React from 'react';
import { Link } from 'react-router-dom';

const BookListItem = props => {
  const handleAuthors = () => {
    if (props.book.authors) {
      let authors = [props.book.authors];
      if (authors.length === 1) authors = authors[0];
      if (authors.length > 1) authors = authors.join(' & ');
      return authors;
    } else {
      return '';
    }
  };

  const { imageLink, title, id } = props.book;
  const authors = handleAuthors();

  return (
    <li className='collection-item avatar'>
      <Link to={`/user/explore/${id}`}>
        <img src={imageLink} alt={title} className='circle' />
        <span className='title'>
          <strong>{title}</strong>
        </span>
        <p>{authors}</p>
      </Link>
      <a href='#!' className='secondary-content'>
        <i className='material-icons' />
      </a>
    </li>
  );
};

export default BookListItem;
