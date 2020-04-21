import React from 'react';
import { mount } from 'enzyme';
import MovieDetail from './index';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('<MovieCard />', () => {
  it('Should be able to render correct given props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies/tt2166834']}>
          <MovieDetail />
        </MemoryRouter>
      </Provider>
    );
    // const poster = wrapper.find('[data-testid="card-poster"]');
    expect(wrapper.exists()).toEqual(true);
    wrapper.unmount();
  });
});
