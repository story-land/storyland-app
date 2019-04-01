import React from 'react';
import ExploreAllBooks from '../../components/explore/ExploreAllBooks';

const Explore = () => {
  return (
    <div className='screen-container'>
      <h1 className='section-title'>Explore books that you might like</h1>
      <ExploreAllBooks />
      <ExploreAllBooks />
      <ExploreAllBooks />
      <ExploreAllBooks />
    </div>
  );
};

export default Explore;
