import React from 'react';
import ReadToday from '../../components/motivation/ReadToday';
import DateChart from '../../components/motivation/DateChart';

const Motivation = () => {
  return (
    <div className='screen-container'>
      <h1 className='section-title'>How much did you read today?</h1>
      <ReadToday />
      <DateChart />
    </div>
  );
};

export default Motivation;
