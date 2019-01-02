import React, { Component } from 'react';

import {
  formatTime,
  calculateIntervalCompletionPercentage
} from '../../common/timeUtils';

import './App.css';

let ipcRenderer;

class App extends Component {
  state = { timerPaused: false, timeRemaining: 0 }
  componentWillMount() {
    const electron = window.require('electron');
    ipcRenderer = electron.ipcRenderer;
  }
  componentDidMount() {
    ipcRenderer.on('play-pause', (_event, { timerPaused }) =>
      this.setState({ timerPaused }));
    ipcRenderer.on('time', (_event, { timeRemaining, intervalLength }) => {
      this.setState({ timeRemaining, intervalLength });
    });
  }
  handlePlayPauseClick = () => {
    ipcRenderer.send('play-pause');
  }
  handleResetClick = () => {
    ipcRenderer.send('reset');
  }
  handleNextClick = () => {
    ipcRenderer.send('next');
  }
  render() {
    const { intervalLength, timerPaused, timeRemaining } = this.state;
    const completionPercentage = calculateIntervalCompletionPercentage(
      timeRemaining,
      intervalLength
    );
    return (
      <div className='App'>
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
        <div className='btnContainer'>
          <button className='btn'
            onClick={this.handlePlayPauseClick}>
            {timerPaused ? 'Go' : 'Pause'}
          </button>
          <button className='btn'
            onClick={this.handleResetClick}>
            Reset</button>
          <button className='btn'
            onClick={this.handleNextClick}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App;
