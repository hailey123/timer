import React, { Component } from 'react'

import {
  formatTime,
  calculateIntervalCompletionPercentage
} from '../common/timeUtils'
import './App.css'

/* Electron */
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class App extends Component {
  state = { timerPaused: false, timeRemaining: 0 }
  componentDidMount() {
    ipcRenderer.on('play-pause', (event, { timerPaused }) =>
      this.setState({ timerPaused }))
    ipcRenderer.on('time', (event, { timeRemaining, intervalLength }) => {
      this.setState({ timeRemaining, intervalLength })
    })
  }
  handlePlayPauseClick = () => {
    ipcRenderer.send('play-pause')
  }
  handleResetClick = () => {
    ipcRenderer.send('reset')
  }
  handleNextClick = () => {
    ipcRenderer.send('next')
  }
  render() {
    const { intervalLength, timerPaused, timeRemaining } = this.state
    const completionPercentatage = calculateIntervalCompletionPercentage(
      timeRemaining,
      intervalLength
    )
    return (
      <div className='App'>
        <div className='Countdown'
          style={ {
            background: `linear-gradient(
              to bottom,
              rgb(0, 51, 102),
              rgb(0, 51, 102) ${ completionPercentatage }%,
              rgb(0, 0, 102) ${ completionPercentatage }%
            )`
          } }>
          <h1>{ formatTime(timeRemaining) }</h1>
        </div>
        <div className='btnContainer'>
          <button className='btn'
            onClick={ this.handlePlayPauseClick }>
            { timerPaused ? 'Go' : 'Pause' }
          </button>
          <button className='btn'
            onClick={ this.handleResetClick }>
            Reset</button>
          <button className='btn'
            onClick = { this.handleNextClick }>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App
