import React from 'react';
import ExploreAllBooks from '../../components/books/ExploreAllBooks';

const Explore = () => {
  return (
    <div className='explore-container'>
      <div className='screen-container'>
        <h1 className='section-title'>Explore books that you might like</h1>
        <ExploreAllBooks />
        <ExploreAllBooks />
        <ExploreAllBooks />
        <ExploreAllBooks />
      </div>
    </div>
  );
};

export default Explore;
