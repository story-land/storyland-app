import React, { Component } from 'react';
import { DateTime } from 'luxon';
import { Select } from 'antd';
import { Chart } from 'react-charts';
import { withAuthConsumer } from '../../contexts/AuthStore';
import goalsService from '../../services/goals-service';

class DateChart extends Component {
  state = {
    period: 'month',
    data: {}
  };

  handlePeriodChange = event => {
    const periodSelect = event;
    this.handleDataGraphic(periodSelect);
  };

  handleDataGraphic = period => {
    let pages = [];
    let labels = [];
    switch (period) {
      case 'year':
        goalsService.getLastGoals(365).then(goals => {
          for (let goal of goals) {
            let date = new Date(goal.updatedAt);
            labels.push(DateTime.fromJSDate(date).monthShort);
            pages.push(goal.pagesDay);
          }
        });
        break;
      case 'month':
        goalsService.getLastGoals(30).then(goals => {
          for (let goal of goals) {
            let date = new Date(goal.updatedAt);
            labels.push(
              DateTime.fromJSDate(date).day +
                DateTime.fromJSDate(date).monthShort
            );
            pages.push(goal.pagesDay);
          }
        });
        break;
      case 'week':
      default:
        goalsService.getLastGoals(7).then(goals => {
          for (let goal of goals) {
            let date = new Date(goal.updatedAt);
            labels.push(
              DateTime.fromJSDate(date).weekdayShort +
                DateTime.fromJSDate(date).day
            );
            pages.push(goal.pagesDay);
          }
        });
    }
    this.setState({
      data: {
        labels: labels,
        pages: pages
      },
      period: period
    });
  };

  componentWillMount = () => {
    this.handleDataGraphic('month');
  };

  render() {
    const { data } = this.state;
    const { labels, pages } = data;
    const dataArr = [];
    for (let i = 0; i < labels.length; i++) {
      const obj = {
        x: labels[i],
        y: pages[i]
      };
    }
    let dates = [
      {
        label: 'Pages read',
        data: [dataArr]
      }
    ];

    return (
      <div className='chart-section'>
        <div className='chart-input'>
          <h2 className='category-title'>What you read</h2>
          <Select defaultValue='month' onChange={this.handlePeriodChange}>
            <Select.Option value='week'>the last week</Select.Option>
            <Select.Option value='month'>the last month</Select.Option>
            <Select.Option value='year'>the last year</Select.Option>
          </Select>
        </div>
        <div className='chart-graphic'>{/* <Chart data={dates} /> */}</div>
      </div>
    );
  }
}

export default withAuthConsumer(DateChart);
