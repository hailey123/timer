import React, { Component } from 'react';

import './App.css';
import Countdown from '../Countdown';

let ipcRenderer;

class App extends Component {
  state = { timerPaused: false, timeRemaining: 0, intervalLength: 0 }
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
    return (
      <div className='App'>
        <Countdown timeRemaining={timeRemaining} intervalLength={intervalLength} />
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
