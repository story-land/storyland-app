import React from 'react';
import { Input } from 'antd';

export default ({ onSearch, clearSearch }) => (
  <div className='field'>
    <Input
      className='input'
      type='text'
      placeholder='Search'
      allowClear
      onChange={e => onSearch(e.target.value)}
    />
  </div>
);
