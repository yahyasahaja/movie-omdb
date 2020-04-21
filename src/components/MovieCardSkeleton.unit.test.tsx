import React from 'react';
import { shallow } from 'enzyme';
import MovieCardSkeleton from './MovieCardSkeleton';

test('Renders without crash', () => {
  const wrapper = shallow(<MovieCardSkeleton />);
  expect(wrapper.exists()).toEqual(true);
});
