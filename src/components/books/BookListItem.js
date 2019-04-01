import React from 'react';

const BookListItem = props => {
  const { imageLink, title, authors } = props.book;
  const author = [authors]
    .flat()
    .map((author, index) => <span key={index}>{author}</span>);
  return (
    <li className='collection-item avatar'>
      <img src={imageLink} alt={title} className='circle' />
      <span className='title'>{title}</span>
      <p>{author}</p>
      <a href='#!' className='secondary-content'>
        <i className='material-icons'>grade</i>
      </a>
    </li>
  );
};

export default BookListItem;
