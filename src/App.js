import React, { Component } from 'react'
import ReactCountdownClock from 'react-countdown-clock'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactCountdownClock seconds={ 3000 }
          color="#000"
          alpha={ 0.9 }
          size={ 300 }
          timeFormat='hms'
          onComplete={ () => alert('Done!') } />
      </div>
    );
  }
}

export default App
