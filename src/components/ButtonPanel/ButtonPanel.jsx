import React from 'react';
import PropTypes from 'prop-types';

import './ButtonPanel.css';

const ButtonPanel = ({
  timerPaused,
  onPlayPauseClick,
  onResetClick,
  onNextClick
}) => (
    <div className='button-panel'>
      <button className='panel-button'
        onClick={onPlayPauseClick}>
        {timerPaused ? 'Go' : 'Pause'}
      </button>
      <button className='panel-button'
        onClick={onResetClick}>
        Reset</button>
      <button className='panel-button'
        onClick={onNextClick}>
        Next
          </button>
    </div>
  );
ButtonPanel.propTypes = {
  timerPaused: PropTypes.bool.isRequired,
  onPlayPauseClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired
};

export default ButtonPanel;