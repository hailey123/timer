import React, { Component } from 'react'

import logo from './logo.svg'
import './App.css'
import {
  DEFAULT_BREAK_TIME,
  DEFAULT_WORK_TIME
} from './constants'

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
    // TODO: remove the timer on close
    setInterval(() => {
      if (!this.state.timerPaused) {
        this.setState({
          timeRemaining: this.state.timeRemaining - 1
        })
      }
    }, 1000)
  }
  formatTime = timeRemaining => {
    const date = new Date(null)
    date.setSeconds(timeRemaining)
    return timeRemaining >= 3600
      ? date.toISOString().substr(12, 7)
      : date.toISOString().substr(14, 5)
  }
  render() {
    const {
      currentSegment,
      timerPaused,
      timeRemaining
    } = this.state
    const numSegments = timeSegments.length
    const nextSegment = (currentSegment + 1) % numSegments
    return (
      <div className='App'>
        <div className='Countdown'>
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
            onClick={ () => this.setState({
              timeRemaining: timeSegments[currentSegment].length,
              timerPaused: true
            }) }>
            Reset</button>
          <button className='btn'
            onClick = { () => this.setState({
              currentSegment: nextSegment,
              timeRemaining: timeSegments[nextSegment].length
            }) }>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App
