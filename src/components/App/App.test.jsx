import { shallow } from 'enzyme';

import React from 'react';
import App from './App';

window.require = jest.fn().mockReturnValue({
  ipcRenderer: {
    on: jest.fn(),
    send: jest.fn()
  }
});

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('has the correct className for styling', () => {
    expect(wrapper.hasClass('app')).toBeTruthy();
  });
  it('has a Countdown', () => {
    expect(wrapper.find('Countdown').length).toBe(1);
  });
  it('has a ButtonPanel', () => {
    expect(wrapper.find('ButtonPanel').length).toBe(1);
  });
});

