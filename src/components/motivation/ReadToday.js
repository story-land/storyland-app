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
      console.log(goals);
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
        <div className='input-field pages-input'>
          <input
            type='number'
            name='pages'
            onChange={this.handlePagesChange}
            value={pagesDay}
          />
          <p>pages</p>
        </div>
        <button
          className='my-button confirm-pages'
          onClick={this.handlePagesSubmit}
        >
          Confirm
        </button>
      </div>
    );
  }
}

export default withAuthConsumer(ReadToday);
