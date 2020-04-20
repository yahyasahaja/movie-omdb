import axios from 'axios';
import { BASE_URL, API_KEY } from 'config';

export interface MovieItem {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface Movie extends MovieItem {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Plot: string;
  Language: string;
  Country: string;
  imdbRating: string;
  imdbVotes: string;
  Production: string;
}

type MoviesProps = {
  search?: string;
  page: string;
};

type MoviesReturnSuccess = {
  Search: MovieItem[];
  totalResults: string;
  Response: string;
};

type ReturnError = {
  Response: string;
  Error: string;
};

export const fetchMoviesApi = async (
  props: MoviesProps
): Promise<MoviesReturnSuccess | ReturnError> => {
  const { search = '', page = 1 } = props;
  const searchParams = new URLSearchParams();
  if (search) searchParams.set('s', search);
  searchParams.set('page', page.toString());
  searchParams.set('apikey', API_KEY);

  return await axios.get(`${BASE_URL}?${searchParams}`);
};

type MovieProps = {
  imdbID: string;
};

export const fetchMovieApi = async (
  props: MovieProps
): Promise<Movie | ReturnError> => {
  const { imdbID = '' } = props;
  const searchParams = new URLSearchParams();
  searchParams.set('apikey', API_KEY);
  searchParams.set('i', imdbID);

  return await axios.get(`${BASE_URL}?${searchParams}`);
};
