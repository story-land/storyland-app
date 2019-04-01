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
      goalsService
        .createGoal(goal)
        .then(() => console.log('Goal created'), error => console.log(error));
    }
  };

  valuePages = () => {
    const todayGoal = this.props.goals.find(elem => {
      const todayDate = new Date();
      const elemDate = new Date(elem.updatedAt);
      const day = todayDate.getDate() === elemDate.getDate();
      const month = todayDate.getMonth() === elemDate.getMonth();
      const year = todayDate.getFullYear() === elemDate.getFullYear();
      if (day && month && year) {
        return elem;
      }
    });
    if (todayGoal) {
      this.setState({
        pagesDay: todayGoal.pagesDay
      });
    }
  };

  componentDidMount = () => {
    goalsService.getGoals().then(goals => {
      this.props.goalsChanged(goals);
      this.valuePages();
    });
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
