import React from 'react';
import { shallow } from 'enzyme';

import ButtonPanel from './ButtonPanel';

describe('ButtonPanel', () => {
  it('has the correct className for styling', () => {
    const props = {
      timerPaused: false,
      onPlayPauseClick: jest.fn(),
      onResetClick: jest.fn(),
      onNextClick: jest.fn()
    };
    const wrapper = shallow(<ButtonPanel {...props} />);

    expect(wrapper.hasClass('button-panel')).toBeTruthy();
  });
});