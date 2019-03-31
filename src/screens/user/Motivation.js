import React from 'react';
import ReadToday from '../../components/ReadToday';
import DateChart from '../../components/DateChart';

const Motivation = () => {
  return (
    <div className='motivation-container'>
      <div className='screen-container'>
        <h1 className='section-title'>How much did you read today?</h1>
        <ReadToday />
        <DateChart />
      </div>
    </div>
  );
};

export default Motivation;
