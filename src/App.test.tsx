import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

test('Renders without crash', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.exists()).toEqual(true);
});
