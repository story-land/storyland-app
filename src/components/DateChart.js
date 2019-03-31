import React, { Component } from 'react';
import Trend from 'react-trend';

export default class DateChart extends Component {
  render() {
    return (
      <div>
        <Trend
          data={[0, 10, 5, 22, 3.6, 11]}
          autoDraw
          autoDrawDuration={5000}
          autoDrawEasing='ease-in-out'
          gradient={['#e2474b', '#406d96', '#2f3a56']}
          strokeWidth={3}
          smooth
          radius={20}
        />
      </div>
    );
  }
}
