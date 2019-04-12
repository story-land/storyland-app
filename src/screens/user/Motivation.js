import React, { Component } from 'react';
import ReadToday from '../../components/motivation/ReadToday';
import DateChart from '../../components/motivation/DateChart';
import LastReadBooks from '../../components/motivation/LastReadBooks';

class Motivation extends Component {
  state = {
    congratsBox: false,
    congratsText: '',
    refreshChart: true
  };

  handleCongratsText = isAchievedGoal => {
    if (isAchievedGoal) {
      this.setState({
        congratsBox: true,
        congratsText: 'Congrats!! You rocked your goal!'
      });
    } else {
      this.setState({
        congratsBox: true,
        congratsText:
          "Good!! It's better than nothing. Keep improving to reach your daily goal."
      });
    }
  };

  closeCongratsBox = () => {
    this.setState({
      congratsBox: false,
      congratsText: '',
      refreshChart: !this.state.refreshChart
    });
  };

  render() {
    const { congratsText, refreshChart } = this.state;
    return (
      <div className='screen-container'>
        {congratsText && (
          <div className='congrats-box'>
            <div className='congrats-text'>
              <p>{congratsText}</p>
              <button
                className='my-button congrats-button'
                onClick={this.closeCongratsBox}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <DateChart refresh={refreshChart} />
        <ReadToday congratsBox={this.handleCongratsText} />
        <div className='motivation-space-section' />
        <LastReadBooks refresh={refreshChart} />
      </div>
    );
  }
}

export default Motivation;
