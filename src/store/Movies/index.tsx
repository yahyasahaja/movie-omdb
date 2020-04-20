import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchMovieApi,
  fetchMoviesApi,
  Movie,
  MovieItem,
  MoviesParams,
} from '../../api/omdbAPI';
import { getDataFromLocal, setDataToLocal } from '../../utils';
import { LOCAL_MOVIE_URL } from '../../config';
import { AppThunk } from 'store';

export interface MoviesState {
  isFetchingMovies: boolean;
  isFetchingMovie: boolean;
  movies: MovieItem[];
  movie?: Movie;
  currentPage: number;
  searchMovie?: string;
  hasNext: boolean;
  totalLength: number;
}

const moviesInitialState: MoviesState = {
  isFetchingMovies: false,
  isFetchingMovie: false,
  movies: [],
  currentPage: 1,
  hasNext: true,
  totalLength: 0,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {
    setIsFetchingMovies: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchingMovies = payload;
    },
    setIsFetchingMovie: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchingMovie = payload;
    },
    setMovies: (state, { payload }: PayloadAction<MovieItem[]>) => {
      state.movies = payload;
    },
    setMovie: (state, { payload }: PayloadAction<Movie>) => {
      state.movie = payload;
    },
    setSearchMovie: (state, { payload }: PayloadAction<string>) => {
      state.searchMovie = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    setHasNext: (state, { payload }: PayloadAction<boolean>) => {
      state.hasNext = payload;
    },
    setTotalLength: (state, { payload }: PayloadAction<number>) => {
      state.totalLength = payload;
    },
    resetMovies: (state) => {
      state.movies = [];
      state.searchMovie = undefined;
      state.isFetchingMovies = false;
      state.hasNext = true;
      state.totalLength = 0;
      state.currentPage = 1;
    },
  },
});

export const {
  setIsFetchingMovie,
  setIsFetchingMovies,
  setMovie,
  setMovies,
  resetMovies,
  setCurrentPage,
  setHasNext,
  setSearchMovie,
  setTotalLength,
} = moviesSlice.actions;

export const movieReducer = moviesSlice.reducer;

export const fetchMovies = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setIsFetchingMovies(true));

    const { currentPage, searchMovie } = getState().movieStore;
    const params: MoviesParams = {
      page: currentPage,
    };
    if (searchMovie) params.search = searchMovie;

    const { data } = await fetchMoviesApi(params);
    if (data.Response === 'True') {
      const { movies } = getState().movieStore;
      dispatch(setMovies([...movies, ...data.Search]));
    }
  } catch (err) {
    console.log('ERROR FETCHING MOVIES', err);
  } finally {
    dispatch(setIsFetchingMovies(false));
  }
};

export const fetchNextMovies = (): AppThunk => async (dispatch, getState) => {
  try {
    const { currentPage } = getState().movieStore;
    dispatch(setCurrentPage(currentPage + 1));
    await dispatch(fetchMovies());
    const afterLength = getState().movieStore.movies.length;
    const totalLength = getState().movieStore.totalLength;
    if (afterLength === totalLength) {
      dispatch(setHasNext(false));
    }
  } catch (err) {
    console.log('ERROR FETCHING MOVIES', err);
  }
};

//CACHE AND FETCH POLICY
export const fetchMovie = (imdbID: number): AppThunk => async (dispatch) => {
  try {
    const movieFromLocal = getDataFromLocal<Movie>(LOCAL_MOVIE_URL);
    if (movieFromLocal) {
      dispatch(setMovie(movieFromLocal));
    } else {
      dispatch(setIsFetchingMovie(true));
    }

    const { data } = await fetchMovieApi(imdbID);
    if (data.Response === 'True') {
      dispatch(setMovie(data));
      setDataToLocal(LOCAL_MOVIE_URL, data);
    }
  } catch (err) {
    console.log('ERROR FETCHING MOVIE', err);
  } finally {
    dispatch(setIsFetchingMovie(false));
  }
};
