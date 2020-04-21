import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCardSkeleton from 'components/MovieCardSkeleton';
import MovieCard from 'components/MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import {
  fetchNextMovies,
  setSearchMovie,
  resetMovies,
  fetchMovies,
} from 'store/Movies';
import SearchField from 'components/SearchField';
import { useLocation, useHistory } from 'react-router-dom';

const StyledMovies = styled.div`
  display: block;
  background: ${COLORS.backgroundColor};
  padding: 20px;

  .movies-title {
    text-align: center;
    font-size: 18pt;
    font-weight: bold;
  }

  .search-wrapper {
    max-width: 500px;
    margin: auto;
    margin-top: 20px;
  }

  .card-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
    padding-top: 30px;

    .loading-wrapper {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: flex-start;
    }

    .fetched-all {
      text-align: center;
      margin-top: 10px;
      color: ${COLORS.textColor};
      padding: 20px;
      border: 1px dashed white;
      border-radius: 20px;
      width: 100%;
      max-width: 500px;
    }
  }
`;

const Movies = () => {
  const history = useHistory();
  const location = useLocation();
  const { movies, hasNext } = useSelector(
    (store: RootState) => store.movieStore
  );
  const dispatch = useDispatch();
  const fetchNextMoviesCallback = React.useCallback(() => {
    dispatch(fetchNextMovies());
  }, [dispatch]);

  //LOCAL STATE
  const [search, setSearch] = React.useState('');
  const [timeoutId, setTimeoutId] = React.useState(-1);

  React.useEffect(() => {
    if (timeoutId !== -1) {
      clearTimeout(timeoutId);
    }

    const params = new URLSearchParams();
    params.set('search', search);
    const pushParams: any = {
      pathname: location.pathname,
    };
    if (search) pushParams.search = params.toString();

    if (timeoutId !== -1 || pushParams.search) {
      setTimeoutId(
        setTimeout(() => {
          history.push(pushParams);
        }, 1000)
      );
    }
    // eslint-disable-next-line
  }, [search]);

  React.useEffect(
    () => () => {
      if (timeoutId !== -1) {
        clearTimeout(timeoutId);
      }
    },
    [timeoutId]
  );

  //search params
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locationSearch = params.get('search');
    setSearch(locationSearch || '');
    dispatch(resetMovies());

    if (locationSearch) {
      dispatch(setSearchMovie(locationSearch));
      dispatch(fetchMovies());
      dispatch(fetchNextMovies());
    }

    return () => {
      if (timeoutId !== -1) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line
  }, [location.search, dispatch]);

  return (
    <StyledMovies>
      <div className="movies-title">Omdb Movie</div>

      <div className="search-wrapper">
        <SearchField
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search movie name"
          value={search}
        />
      </div>

      {(search || movies.length > 0) && (
        <InfiniteScroll
          className="card-wrapper"
          dataLength={movies.length}
          next={fetchNextMoviesCallback}
          hasMore={hasNext}
          loader={
            <div data-testid="loading-wrapper" className="loading-wrapper">
              <MovieCardSkeleton />
              <MovieCardSkeleton />
              <MovieCardSkeleton />
              <MovieCardSkeleton />
            </div>
          }
          endMessage={
            <div className="fetched-all">
              <div>
                {movies.length === 0
                  ? 'Movie name not found'
                  : 'All movies are fetched'}
              </div>
            </div>
          }
        >
          {movies.map((movie, i) => (
            <MovieCard data={movie} key={i} />
          ))}
        </InfiniteScroll>
      )}
    </StyledMovies>
  );
};

export default Movies;
