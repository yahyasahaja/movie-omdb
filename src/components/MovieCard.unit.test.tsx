import React from 'react';
import { mount } from 'enzyme';
import MovieCard from './MovieCard';
import { MovieItem } from 'api/omdbAPI';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

const movieData: MovieItem = {
  Title: 'Batman Begins',
  Year: '2005',
  imdbID: 'tt0372784',
  Type: 'movie',
  Poster: 'posterurl',
};

describe('<MovieCard />', () => {
  it('Should be able to render correct given props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MovieCard data={movieData} />
        </BrowserRouter>
      </Provider>
    );
    const poster = wrapper.find('[data-testid="card-poster"]');
    expect(poster.prop('src')).toEqual(movieData.Poster);
    const title = wrapper.find('[data-testid="card-title"]');
    expect(title.text()).toEqual(movieData.Title);
    wrapper.unmount();
  });
});
