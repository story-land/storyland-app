import React from 'react';
import { Input, Upload, Button, Icon } from 'antd';

export default ({ onSearch, uploadCover }) => (
  <div className='field explore-search-bar'>
    <Input
      className='input'
      type='text'
      placeholder='Search'
      allowClear
      onChange={e => onSearch(e.target.value)}
    />
    <Upload
      className='upload-cover-book'
      name='cover'
      listType='picture'
      beforeUpload={file => {
        uploadCover(file);
        return false;
      }}
    >
      <Button htmlType='button'>
        <Icon type='camera' style={{ fontSize: '20px' }} />
      </Button>
    </Upload>
  </div>
);
