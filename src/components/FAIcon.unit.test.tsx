import React from 'react';
import { mount } from 'enzyme';
import FAIcon from './FAIcon';

describe('<FAIcon />', () => {
  it('Should be able to render correct user icon', () => {
    const wrapper = mount(<FAIcon name="chevron-left" />);
    const icon = wrapper.find('svg');
    expect(icon.exists()).toEqual(true);
    wrapper.unmount();
  });
});
