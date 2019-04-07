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

    const unshiftToData = (x, y) => {
      data.unshift({ x, y });
    };

    switch (period) {
      case 'year':
        goalsService.getLastGoals(365).then(goals => {
          for (let goal of goals) {
            let date = new Date(goal.updatedAt);
            unshiftToData(
              DateTime.fromJSDate(date).day +
                DateTime.fromJSDate(date).monthShort,
              goal.pagesDay
            );
          }
          this.setDataGraphic(data, period);
        });
        break;
      case 'month':
        goalsService.getLastGoals(30).then(goals => {
          for (let goal of goals) {
            let date = new Date(goal.updatedAt);
            unshiftToData(
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
            unshiftToData(
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

  componentDidMount = () => {
    this.handleDataGraphic('month');
  };

  render() {
    const { data } = this.state;

    const dataArr = [
      {
        id: 'Pages',
        data: [...data]
      }
    ];
    const responsiveLine = (
      <ResponsiveLine
        data={dataArr}
        margin={{
          top: 50,
          right: 30,
          bottom: 40,
          left: 30
        }}
        xScale={{
          type: 'point',
          stacked: true,
          min: 'auto',
          max: 'auto'
        }}
        yScale={{
          type: 'number',
          stacked: false,
          min: 0,
          max: 150
        }}
        curve='natural'
        axisBottom={{
          orient: 'bottom',
          legend: '',
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: 'center'
        }}
        axisLeft={{
          orient: 'left',
          legend: '',
          tickSize: 0,
          tickPadding: 15,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: 'center'
        }}
        enableGridY={false}
        lineWidth={5}
        dotSize={5}
        colors='paired'
        dotColor='inherit:darker(1)'
        dotBorderColor='#ffffff'
        enableDotLabel={true}
        dotLabel='y'
        dotLabelYOffset={-15}
        enableArea={true}
        areaOpacity={0.2}
        animate={true}
        motionStiffness={100}
        motionDamping={5}
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
