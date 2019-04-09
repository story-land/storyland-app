import React, { Component } from 'react';
import goalsService from '../../services/goals-service';
import { withAuthConsumer } from '../../contexts/AuthStore';

class ReadToday extends Component {
  state = {
    pagesDay: 0
  };

  handlePagesChange = event => {
    const pages = event.target.value;
    this.setState({
      pagesDay: pages
    });
  };

  handlePagesSubmit = event => {
    event.preventDefault();
    const goal = {
      pagesDay: this.state.pagesDay
    };
    if (goal.pagesDay > 0) {
      goalsService.createGoal(goal).then();
      this.props.user.pagesGoal <= this.state.pagesDay
        ? this.props.congratsBox(true)
        : this.props.congratsBox(false);
    }
  };

  valuePages = () => {
    goalsService.getLastGoals(1).then(goals => {
      if (goals.length !== 0) {
        const todayDate = new Date();
        const goalDate = new Date(goals[0].updatedAt);
        const day = todayDate.getDate() === goalDate.getDate();
        const month = todayDate.getMonth() === goalDate.getMonth();
        const year = todayDate.getFullYear() === goalDate.getFullYear();
        if (day && month && year) {
          this.setState({
            pagesDay: goals[0].pagesDay
          });
        }
      }
    });
  };

  componentDidMount = () => {
    this.valuePages();
  };

  render() {
    const { pagesDay } = this.state;
    return (
      <div className='pages-read-container'>
        <h4 className='how-many-pages-title'>
          How many pages did you read today?
        </h4>
        <div className='pages-read-today'>
          <div className='input-field pages-input'>
            <input
              type='number'
              name='pages'
              onChange={this.handlePagesChange}
              value={pagesDay}
            />
          </div>
          <button
            className='my-button confirm-pages'
            onClick={this.handlePagesSubmit}
          >
            pages read today
          </button>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(ReadToday);
