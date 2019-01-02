import React from 'react';
import { shallow } from 'enzyme';

import Countdown from './Countdown';

describe('Countdown', () => {
  it('has the correct className for styling', () => {
    const props = {
      timeRemaining: 10,
      intervalLength: 60
    };
    const wrapper = shallow(<Countdown {...props} />);

    expect(wrapper.hasClass('Countdown')).toBeTruthy();
  });
});