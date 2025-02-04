import React from 'react';
import { mount } from 'enzyme';
import Movies from './index';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import nock from 'nock';
import waitUntil from 'async-wait-until';

const data = {
  Search: [
    {
      Title: 'Batman: The Killing Joke',
      Year: '2016',
      imdbID: 'tt4853102',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      Title: 'Batman: The Dark Knight Returns, Part 2',
      Year: '2013',
      imdbID: 'tt2166834',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYTEzMmE0ZDYtYWNmYi00ZWM4LWJjOTUtYTE0ZmQyYWM3ZjA0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
    },
    {
      Title: 'Batman: Mask of the Phantasm',
      Year: '1993',
      imdbID: 'tt0106364',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYTRiMWM3MGItNjAxZC00M2E3LThhODgtM2QwOGNmZGU4OWZhXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg',
    },
    {
      Title: 'Batman: Assault on Arkham',
      Year: '2014',
      imdbID: 'tt3139086',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZDU1ZGRiY2YtYmZjMi00ZDQwLWJjMWMtNzUwNDMwYjQ4ZTVhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      Title: 'Batman: Year One',
      Year: '2011',
      imdbID: 'tt1672723',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNTJjMmVkZjctNjNjMS00ZmI2LTlmYWEtOWNiYmQxYjY0YWVhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      Title: 'Batman',
      Year: '1966',
      imdbID: 'tt0060153',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMmM1OGIzM2UtNThhZS00ZGNlLWI4NzEtZjlhOTNhNmYxZGQ0XkEyXkFqcGdeQXVyNTkxMzEwMzU@._V1_SX300.jpg',
    },
    {
      Title: 'Batman: Arkham City',
      Year: '2011',
      imdbID: 'tt1568322',
      Type: 'game',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZDE2ZDFhMDAtMDAzZC00ZmY3LThlMTItMGFjMzRlYzExOGE1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      Title: 'Batman: Gotham Knight',
      Year: '2008',
      imdbID: 'tt1117563',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BM2I0YTFjOTUtMWYzNC00ZTgyLTk2NWEtMmE3N2VlYjEwN2JlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      Title: 'Superman/Batman: Apocalypse',
      Year: '2010',
      imdbID: 'tt1673430',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjk3ODhmNjgtZjllOC00ZWZjLTkwYzQtNzc1Y2ZhMjY2ODE0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      Title: 'Batman Beyond',
      Year: '1999–2001',
      imdbID: 'tt0147746',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYTBiZjFlZDQtZjc1MS00YzllLWE5ZTQtMmM5OTkyNjZjMWI3XkEyXkFqcGdeQXVyMTA1OTEwNjE@._V1_SX300.jpg',
    },
  ],
  totalResults: '376',
  Response: 'True',
};

describe('<Movies />', () => {
  it('Should be able to render correct given props', async (done) => {
    nock('https://www.omdbapi.com')
      .get('/?s=batman&page=1&apikey=faf7e5bb')
      .reply(200, data);
    nock('https://www.omdbapi.com')
      .get('/?s=batman&page=2&apikey=faf7e5bb')
      .reply(200, data);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies?search=batman']}>
          <Route path="/movies" component={Movies} />
        </MemoryRouter>
      </Provider>
    );
    let loading = wrapper.find('div[data-testid="loading-wrapper"]');
    expect(loading.exists()).toEqual(true);

    await waitUntil(() => store.getState().movieStore.movies.length > 0);
    wrapper.update();

    loading = wrapper.find('div[data-testid="loading-wrapper"]');
    expect(loading.exists()).toEqual(false);
    const cards = wrapper.find('div[data-testid="movie-card"]');
    expect(cards.length).toEqual(data.Search.length * 2);
    wrapper.unmount();
    done();
  });
});
