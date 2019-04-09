import React, { Component } from 'react';
import ProfileBox from '../../components/profile/ProfileBox';
import PendingBooks from '../../components/profile/PendingBooks';
import ReadBooks from '../../components/profile/ReadBooks';
import ReadingBooks from '../../components/profile/ReadingBooks';

export default class Profile extends Component {
  render() {
    return (
      <div className='screen-container'>
        <ProfileBox />
        <ReadingBooks />
        <PendingBooks />
        <ReadBooks />
      </div>
    );
  }
}
