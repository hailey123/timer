import React, { Component } from 'react'

import logo from './logo.svg'
import './App.css'
import {
  DEFAULT_BREAK_TIME,
  DEFAULT_WORK_TIME
} from './constants'

/* Electron */
const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer  = electron.ipcRenderer;

const timeSegments = [
  {
    name: 'Work',
    length: DEFAULT_WORK_TIME
  },
  {
    name: 'Break',
    length: DEFAULT_BREAK_TIME
  }
]

class App extends Component {
  state = {
    currentSegment: 0,
    timeRemaining: 0,
    timerPaused: false
  }
  componentDidMount() {
    this.setState({
      timeRemaining: timeSegments[this.state.currentSegment].length
    })
    ipcRenderer.on('time', (event, time) => {
      console.log(time)
      this.setState({
        timeRemaining: time.value
      })
    })
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  getCurrentIntervalLength = () => {
    const { currentSegment } = this.state
    return timeSegments[currentSegment].length
  }
  handleResetClick = () => {
    console.log('sending reset')
    ipcRenderer.send('reset')
  }
  formatTime = timeRemaining => {
    const date = new Date(null)
    date.setSeconds(timeRemaining)
    return timeRemaining >= 3600
      ? date.toISOString().substr(12, 7)
      : date.toISOString().substr(14, 5)
  }
  calculateCompletionPercentage = () => {
    const { currentSegment, timeRemaining } = this.state
    return timeRemaining / this.getCurrentIntervalLength() * 100
  }
  render() {
    const {
      currentSegment,
      timerPaused,
      timeRemaining
    } = this.state
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
          <h1>{ this.formatTime(timeRemaining) }</h1>
        </div>
        <div className='btnContainer'>
          <button className='btn'
            onClick={ () => this.setState({
              timerPaused: !timerPaused
            }) }>
            { timerPaused ? 'Go' : 'Pause' }
          </button>
          <button className='btn'
            onClick={ this.handleResetClick }>
            Reset</button>
          <button className='btn'
            onClick = { () => console.log('todo - handle next') }>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App
