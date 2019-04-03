import React from 'react';

export default ({ onSearch }) => (
  <div className='field'>
    <input
      className='input'
      type='text'
      placeholder='Search'
      onChange={e => onSearch(e.target.value)}
    />
  </div>
);
