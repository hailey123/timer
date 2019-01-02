import { shallow } from 'enzyme';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.require = jest.fn().mockReturnValue({
  ipcRenderer: {
    on: jest.fn(),
    send: jest.fn()
  }
});

describe('App', () => {
  const mockState = {
    intervalLength: 60,
    timeRemaining: 10,
    timerPaused: false
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('has the correct className for styling', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.hasClass('App')).toBeTruthy();
  });
});

