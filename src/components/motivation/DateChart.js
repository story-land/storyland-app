import React, { Component } from 'react';
import Trend from 'react-trend';
import { Select } from 'antd';
import { withAuthConsumer } from '../../contexts/AuthStore';

class DateChart extends Component {
  state = {
    period: 'month',
    data: []
  };

  handlePeriodChange = event => {
    const periodSelect = event;
    this.setState({
      period: periodSelect
    });
    this.handleDataGraphic(periodSelect);
  };

  handleDataGraphic = period => {
    const { goals } = this.props;
    let data = [];
    switch (period) {
      case 'year':
        {
          data = goals
            .filter(elem => {
              return (
                new Date().getFullYear() ===
                new Date(elem.updatedAt).getFullYear()
              );
            })
            .map(elem => elem.pagesDay);
        }
        break;
      case 'month':
        {
          data = goals
            .filter(elem => {
              return (
                new Date().getMonth() === new Date(elem.updatedAt).getMonth()
              );
            })
            .map(elem => elem.pagesDay);
        }
        break;
      case 'week':
      default:
      // Implement later
      // {
      //   data = goals
      //     .reduce(elem => {
      //       return (
      //         new Date().getMonth() === new Date(elem.updatedAt).getMonth()
      //       );
      //     })
      //     .map(elem => elem.pagesDay);
      // }
      // break;
    }
    this.setState({ data: data });
  };

  render() {
    const { period, data } = this.state;
    console.log(period);
    console.log(data);
    return (
      <div className='chart-section'>
        <div className='chart-input'>
          <h2 className='category-title'>What you read</h2>
          <Select defaultValue='month' onChange={this.handlePeriodChange}>
            <Select.Option value='week'>this week</Select.Option>
            <Select.Option value='month'>this month</Select.Option>
            <Select.Option value='year'>this year</Select.Option>
          </Select>
        </div>
        <div className='chart-graphic'>
          <Trend
            data={[...data, 3, 4, 5]}
            autoDraw
            autoDrawDuration={5000}
            autoDrawEasing='ease-in-out'
            gradient={['#e2474b', '#406d96', '#2f3a56']}
            strokeWidth={4}
            smooth
            height={200}
            radius={20}
          />
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(DateChart);
