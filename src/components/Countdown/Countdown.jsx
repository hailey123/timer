import React from 'react';
import PropTypes from 'prop-types';

import {
  formatTime,
  calculateIntervalCompletionPercentage
} from '../../common/timeUtils';

const Countdown = ({
  timeRemaining,
  intervalLength
}) => {
  const completionPercentage = calculateIntervalCompletionPercentage(
    timeRemaining,
    intervalLength
  );
  return (
    <div className='Countdown'
      style={{
        background: `linear-gradient(
              to bottom,
              rgb(0, 51, 102),
              rgb(0, 51, 102) ${ completionPercentage}%,
              rgb(0, 0, 102) ${ completionPercentage}%
            )`
      }}>
      <h1>{formatTime(timeRemaining)}</h1>
    </div>
  );
};
Countdown.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
  intervalLength: PropTypes.number.isRequired
};

export default Countdown;