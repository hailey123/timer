import React, { Component } from 'react';

import Countdown from '../Countdown';
import ButtonPanel from '../ButtonPanel';
import { Intervals } from '../../common/constants';

import './App.css';

let ipcRenderer;

class App extends Component {
  state = { timerPaused: true, timeRemaining: Intervals[0].length, intervalLength: Intervals[0].length }
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
      <div className='app'>
        <Countdown timeRemaining={timeRemaining} intervalLength={intervalLength} />
        <ButtonPanel
          timerPaused={timerPaused}
          onPlayPauseClick={this.handlePlayPauseClick}
          onResetClick={this.handleResetClick}
          onNextClick={this.handleNextClick} />
      </div>
    );
  }
}

export default App;
