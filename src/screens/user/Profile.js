import React, { Fragment, Component } from 'react';
import PendingBooks from '../../components/profile/PendingBooks';
import ReadBooks from '../../components/profile/ReadBooks';

export default class Profile extends Component {
  render() {
    return (
      <Fragment>
        <PendingBooks />
        <ReadBooks />
      </Fragment>
    );
  }
}
