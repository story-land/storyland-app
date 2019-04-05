import React, { Fragment, Component } from 'react';
import PendingBooks from '../../components/profile/PendingBooks';
import ReadBooks from '../../components/profile/ReadBooks';
import ReadingBooks from '../../components/profile/ReadingBooks';

export default class Profile extends Component {
  render() {
    return (
      <Fragment>
        <ReadingBooks />
        <PendingBooks />
        <ReadBooks />
      </Fragment>
    );
  }
}
