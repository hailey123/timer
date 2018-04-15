import React, { Component } from 'react'
import ReactCountdownClock from 'react-countdown-clock'

import logo from './logo.svg'
import './App.css'
import {
  DEFAULT_BREAK_TIME,
  DEFAULT_WORK_TIME
} from './constants'

class App extends Component {
  state = {
    timeSegments: [
      {
        name: 'Work',
        length: DEFAULT_WORK_TIME
      },
      {
        name: 'Break',
        length: DEFAULT_BREAK_TIME
      }
    ],
    currentSegment: 0
  }
  render() {
    const {
      timeSegments,
      currentSegment
    } = this.state
    const numSegments = timeSegments.length
    const nextSegment = (currentSegment + 1) % numSegments
    return (
      <div className='App'>
        <ReactCountdownClock seconds={ timeSegments[currentSegment].length }
          color='#000'
          alpha={ 0.9 }
          size={ 160 }
          timeFormat='hms'
          onComplete={ () => alert('Done!') } />
        <div className='btnContainer'>
          <button className='btn'>Pause</button>
          <button className='btn'>Reset</button>
          <button className='btn'
            onClick = { () => this.setState({
              currentSegment: nextSegment
            }) }>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App
