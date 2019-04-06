import React, { Component } from 'react';
import { DateTime } from 'luxon';
import { Select } from 'antd';
import { ResponsiveLine } from 'nivo';
import { withAuthConsumer } from '../../contexts/AuthStore';
import goalsService from '../../services/goals-service';

class DateChart extends Component {
  state = {
    period: 'month',
    data: []
  };

  handlePeriodChange = event => {
    const periodSelect = event;
    this.handleDataGraphic(periodSelect);
  };

  handleDataGraphic = period => {
    const data = [];

    const pushToData = (x, y) => {
      data.push({ x, y });
    };

    switch (period) {
      case 'year':
        goalsService.getLastGoals(365).then(goals => {
          for (let goal of goals) {
            let date = new Date(goal.updatedAt);
            pushToData(DateTime.fromJSDate(date).monthShort, goal.pagesDay);
          }
          this.setDataGraphic(data, period);
        });
        break;
      case 'month':
        goalsService.getLastGoals(30).then(goals => {
          for (let goal of goals) {
            let date = new Date(goal.updatedAt);
            pushToData(
              DateTime.fromJSDate(date).day +
                DateTime.fromJSDate(date).monthShort,
              goal.pagesDay
            );
          }
          this.setDataGraphic(data, period);
        });
        break;
      case 'week':
      default:
        goalsService.getLastGoals(7).then(goals => {
          for (let goal of goals) {
            let date = new Date(goal.updatedAt);
            pushToData(
              DateTime.fromJSDate(date).weekdayShort +
                DateTime.fromJSDate(date).day,
              goal.pagesDay
            );
          }
          this.setDataGraphic(data, period);
        });
    }
  };

  setDataGraphic = (data, period) => {
    this.setState({
      data,
      period
    });
  };

  componentWillMount = () => {
    this.handleDataGraphic('month');
  };

  render() {
    const { data } = this.state;

    const dataArr = [
      {
        id: 'user',
        data: [...data]
      }
    ];

    const responsiveLine = (
      <ResponsiveLine
        data={dataArr}
        margin={{
          top: 30,
          right: 30,
          bottom: 30,
          left: 30
        }}
        xScale={{
          type: 'point',
          stacked: true,
          min: 'auto',
          max: 'auto'
        }}
        yScale={{
          type: 'linear',
          stacked: true,
          min: 'auto',
          max: 'auto'
        }}
        curve='natural'
        axisBottom={{
          orient: 'bottom',
          legend: '',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 5,
          legendOffset: 36,
          legendPosition: 'center'
        }}
        axisLeft={{
          orient: 'left',
          legend: '',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 10,
          legendOffset: -40,
          legendPosition: 'center'
        }}
        enableGridX={false}
        lineWidth={3}
        dotSize={5}
        dotColor='inherit:darker(1)'
        dotBorderColor='#ffffff'
        enableDotLabel={true}
        dotLabel='y'
        dotLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.2}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    );

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
        <div className='chart-graphic'>{responsiveLine}</div>
      </div>
    );
  }
}

export default withAuthConsumer(DateChart);
