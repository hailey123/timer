import React, { Component } from 'react'
import ReactCountdownClock from 'react-countdown-clock'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <ReactCountdownClock seconds={ 3000 }
          color='#000'
          alpha={ 0.9 }
          size={ 200 }
          timeFormat='hms'
          onComplete={ () => alert('Done!') } />
        <div className='btnContainer'>
          <button className='btn'>Pause</button>
          <button className='btn'>Reset</button>
          <button className='btn'>Next</button>
        </div>
      </div>
    );
  }
}

export default App
