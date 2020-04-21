import React from 'react';
import { mount } from 'enzyme';
import MovieDetail from './index';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import nock from 'nock';
import waitUntil from 'async-wait-until';

const data = {
  Title: 'Batman: The Dark Knight Returns, Part 2',
  Year: '2013',
  Rated: 'PG-13',
  Released: '29 Jan 2013',
  Runtime: '76 min',
  Genre: 'Animation, Action, Adventure, Crime, Drama, Horror, Sci-Fi, Thriller',
  Director: 'Jay Oliva',
  Writer:
    'Bob Kane (character created by: Batman), Jerry Siegel (character created by: Superman), Joe Shuster (character created by: Superman), Frank Miller (comic book), Klaus Janson (comic book), Bob Goodman',
  Actors: 'Peter Weller, Ariel Winter, Michael Emerson, David Selby',
  Plot:
    'The Batman has returned after a 10-year absence. The Gotham authorities want to arrest him. An old foe wants a reunion. The Feds want the Man of Tomorrow to put a stop to him.',
  Language: 'English',
  Country: 'USA',
  Awards: '1 win & 1 nomination.',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BYTEzMmE0ZDYtYWNmYi00ZWM4LWJjOTUtYTE0ZmQyYWM3ZjA0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
  Ratings: [{ Source: 'Internet Movie Database', Value: '8.4/10' }],
  Metascore: 'N/A',
  imdbRating: '8.4',
  imdbVotes: '42,988',
  imdbID: 'tt2166834',
  Type: 'movie',
  DVD: '29 Jan 2013',
  BoxOffice: 'N/A',
  Production: 'Warner Bros.',
  Website: 'N/A',
  Response: 'True',
};

describe('<MovieDetail />', () => {
  it('Should be able to render correct given props', async (done) => {
    nock('https://www.omdbapi.com')
      .get('/?apikey=faf7e5bb&i=tt2166834')
      .reply(200, data);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies/tt2166834']}>
          <Route path="/movies/:imdbID" component={MovieDetail} />
        </MemoryRouter>
      </Provider>
    );
    let loading = wrapper.find('div[data-testid="loading-wrapper"]');
    expect(loading.exists()).toEqual(true);

    await waitUntil(() => store.getState().movieStore.movie);
    wrapper.update();

    loading = wrapper.find('div[data-testid="loading-wrapper"]');
    expect(loading.exists()).toEqual(false);
    const detail = wrapper.find('div[data-testid="detail-wrapper"]');
    expect(detail.exists()).toEqual(true);
    const poster = wrapper.find('img[data-testid="detail-poster"]');
    expect(poster.prop('src')).toEqual(data.Poster);
    const title = wrapper.find('div[data-testid="detail-title"]');
    expect(title.text()).toEqual(`${data.Title} (${data.Year})`);
    const plot = wrapper.find('div[data-testid="detail-plot"]');
    expect(plot.text()).toEqual(data.Plot);
    const rating = wrapper.find('span[data-testid="detail-rating"]');
    expect(rating.text()).toEqual(data.imdbRating);
    wrapper.unmount();
    done();
  });
});
