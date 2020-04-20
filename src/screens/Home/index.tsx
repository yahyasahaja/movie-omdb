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

const StyledHome = styled.div`
  display: block;
  background: ${COLORS.backgroundColor};
  padding: 20px;

  .home-title {
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

const Home = () => {
  const { movies, hasNext, totalLength } = useSelector(
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
    dispatch(resetMovies());

    if (search) {
      dispatch(setSearchMovie(search));

      if (timeoutId !== -1) {
        clearTimeout(timeoutId);
        setTimeoutId(-1);
      }

      setTimeoutId(
        setTimeout(() => {
          dispatch(fetchMovies());
          dispatch(fetchNextMovies());
        }, 1000)
      );
    }
  }, [search, dispatch]);

  return (
    <StyledHome>
      <div className="home-title">Omdb Movie</div>

      <div className="search-wrapper">
        <SearchField
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search movie name"
          value={search}
        />
      </div>

      {search && (
        <InfiniteScroll
          className="card-wrapper"
          dataLength={movies.length}
          next={fetchNextMoviesCallback}
          hasMore={hasNext}
          loader={
            <div className="loading-wrapper">
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
    </StyledHome>
  );
};

export default Home;
