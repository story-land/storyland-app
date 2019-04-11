import React, { Component } from 'react';
import { DateTime } from 'luxon';
import { Select } from 'antd';
import { ResponsiveLine } from 'nivo';
import { withAuthConsumer } from '../../contexts/AuthStore';
import CountUp from 'react-countup';
import goalsService from '../../services/goals-service';

class DateChart extends Component {
  state = {
    period: 'month',
    pagesRead: 0,
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
          if (goals) {
            for (let goal of goals) {
              let date = new Date(goal.updatedAt);
              unshiftToData(
                DateTime.fromJSDate(date).day +
                  DateTime.fromJSDate(date).monthShort,
                goal.pagesDay
              );
            }
          }
          this.setDataGraphic(data, period);
        });
        break;
      case 'month':
        goalsService.getLastGoals(30).then(goals => {
          if (goals) {
            for (let goal of goals) {
              let date = new Date(goal.updatedAt);
              unshiftToData(
                DateTime.fromJSDate(date).day +
                  DateTime.fromJSDate(date).monthShort,
                goal.pagesDay
              );
            }
          }
          this.setDataGraphic(data, period);
        });
        break;
      case 'week':
      default:
        goalsService.getLastGoals(7).then(goals => {
          if (goals) {
            for (let goal of goals) {
              let date = new Date(goal.updatedAt);
              unshiftToData(
                DateTime.fromJSDate(date).weekdayShort +
                  DateTime.fromJSDate(date).day,
                goal.pagesDay
              );
            }
          }
          this.setDataGraphic(data, period);
        });
    }
  };

  setDataGraphic = (data, period) => {
    const pagesRead = data.reduce((acc, elem) => {
      return acc + elem.y;
    }, 0);
    this.setState({
      data,
      period,
      pagesRead
    });
  };

  componentDidMount = () => {
    this.handleDataGraphic('month');
  };

  componentDidUpdate = prevProps => {
    if (prevProps.refresh !== this.props.refresh) {
      this.handleDataGraphic(this.state.period);
    }
  };

  render() {
    const { data, pagesRead } = this.state;
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
          top: 30,
          right: 20,
          bottom: 30,
          left: 20
        }}
        curve='natural'
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridY={false}
        enableGridX={false}
        lineWidth={7}
        dotSize={0}
        colors='#fafafa'
        dotColor='inherit:darker(1)'
        dotLabelYOffset={-15}
        isInteractive={false}
        enableStackTooltip={false}
        animate={true}
        motionStiffness={100}
        motionDamping={5}
      />
    );

    return (
      <div className='category-screen'>
        <div className='pages-read-wrapper'>
          <CountUp
            className='pages-read-count'
            start={0}
            duration={3}
            end={pagesRead}
            redraw={true}
          />
          <h4 className='pages-read-in'>pages read in</h4>
          <Select
            className='pages-period-select'
            defaultValue='month'
            onChange={this.handlePeriodChange}
          >
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
