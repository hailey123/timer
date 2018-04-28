import React, { Component } from 'react'

import logo from './logo.svg'
import './App.css'

/* Electron */
const electron = window.require('electron');
const fs = electron.remote.require('fs');
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
  componentWillUnmount() {
    clearInterval(this.interval)
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
  getFormattedTime = () => {
    const { timeRemaining } = this.state
    const date = new Date(null)
    date.setSeconds(timeRemaining)
    return timeRemaining >= 3600
      ? date.toISOString().substr(12, 7)
      : date.toISOString().substr(14, 5)
  }
  calculateCompletionPercentage = () => {
    const { timeRemaining, intervalLength } = this.state
    return timeRemaining / intervalLength * 100
  }
  render() {
    const { timerPaused, timeRemaining } = this.state
    const completionPercentatage = this.calculateCompletionPercentage()
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
          <h1>{ this.getFormattedTime() }</h1>
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
