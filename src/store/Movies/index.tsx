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
  search?: string;
  hasNext: boolean;
}

const moviesInitialState: MoviesState = {
  isFetchingMovies: false,
  isFetchingMovie: false,
  movies: [],
  currentPage: 1,
  hasNext: true,
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
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    setHasNext: (state, { payload }: PayloadAction<boolean>) => {
      state.hasNext = payload;
    },
    resetMovies: (state) => {
      state.movies = [];
      state.search = undefined;
      state.isFetchingMovies = false;
      state.hasNext = true;
    },
  },
});

export const {
  setIsFetchingMovie,
  setIsFetchingMovies,
  setMovie,
  setMovies,
} = moviesSlice.actions;

export const movieReducer = moviesSlice.reducer;

export const fetchNextMovies = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setIsFetchingMovies(true));

    const { currentPage, search, movies } = getState().movieStore;
    const params: MoviesParams = {
      page: currentPage + 1,
    };
    if (search) params.search = search;

    const { data } = await fetchMoviesApi(params);
    if (data.Response === 'True') {
      dispatch(setMovies([...movies, ...data.Search]));
    }
  } catch (err) {
    console.log('ERROR FETCHING MOVIES', err);
  } finally {
    dispatch(setIsFetchingMovies(false));
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
