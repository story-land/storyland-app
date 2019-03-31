import React, { Component } from 'react';
import ExploreAllBooks from '../../components/books/ExploreAllBooks';

export default class Explore extends Component {
  render() {
    return (
      <div className='explore-container'>
        <div className='screen-container'>
          <h1 className='explore-title'>Explore books that you might like</h1>
          <ExploreAllBooks />
        </div>
      </div>
    );
  }
}
