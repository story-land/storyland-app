import React, { Component } from 'react';
import ReadToday from '../../components/motivation/ReadToday';
import DateChart from '../../components/motivation/DateChart';

class Motivation extends Component {
  state = {
    congratsBox: false,
    congratsText: ''
  };

  handleCongratsText = isAchievedGoal => {
    if (isAchievedGoal) {
      this.setState({
        congratsBox: true,
        congratsText: 'Congrats!! You rocked your goal'
      });
    } else {
      this.setState({
        congratsBox: true,
        congratsText:
          "Good! It's better than nothing. Keep improving to reach your daily goal"
      });
    }
  };

  closeCongratsBox = () => {
    this.setState({
      congratsBox: false,
      congratsText: ''
    });
  };

  render() {
    const { congratsText } = this.state;
    return (
      <div className='screen-container'>
        {congratsText && (
          <div className='congrats-box'>
            <h4>{congratsText}</h4>
            <button
              className='my-button congrats-button'
              onClick={this.closeCongratsBox}
            >
              Close
            </button>
          </div>
        )}
        <h1 className='section-title'>How much did you read today?</h1>
        <ReadToday congratsBox={this.handleCongratsText} />
        <DateChart />
      </div>
    );
  }
}

export default Motivation;
