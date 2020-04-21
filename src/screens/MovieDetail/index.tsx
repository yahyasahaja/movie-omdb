import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { fetchMovie } from 'store/Movies';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { HistoryState } from 'types';
import FAIcon from 'components/FAIcon';
import { showImagePresentation } from 'store/ImagePresentation';

const StyledMovieDetail = styled.div`
  display: block;
  background: ${COLORS.backgroundColor};
  padding: 20px;

  .detail-container {
    padding-top: 20px;
    margin: auto;
    max-width: 800px;

    .navigation {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 20px;

      &:active {
        opacity: 0.5;
      }

      .nav-title {
        margin-left: 20px;
        font-size: 14pt;
      }
    }

    .detail-wrapper {
      display: flex;
      flex-wrap: wrap;

      @media (max-width: 530px) {
        justify-content: center;
        .left {
          margin-bottom: 20px;
        }
      }

      .left {
        display: block;

        .movie-image {
          width: 140px;
          height: 190px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: 0.3s;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          &:hover {
            transform: scale(1.1);
          }

          &:active {
            transform: scale(1.05);
            opacity: 0.5;
            transition: 0.1s;
          }
        }
      }

      .right {
        display: block;
        margin-left: 20px;
        min-width: 300px;
        flex: 1;

        .movie-detail-title {
          font-size: 18pt;
          font-weight: bold;
        }

        .plot {
          margin-top: 10px;
          padding: 20px;
          background: #4a4a4a;
          border-radius: 30px;
          margin: 20px 0;
        }

        .additional-info {
          margin-top: 10px;

          .label {
            font-weight: bold;
          }
        }
      }
    }
  }
`;

type Params = {
  imdbID: string;
};

const MovieDetail = () => {
  const params = useParams<Params>();
  const history = useHistory<HistoryState>();
  const location = useLocation<HistoryState>();
  const { movie, isFetchingMovie } = useSelector(
    (store: RootState) => store.movieStore
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    const imdbID = params.imdbID;
    if (params.imdbID) {
      dispatch(fetchMovie(imdbID));
    }
    // eslint-disable-next-line
  }, []);
  const showModalCallback = React.useCallback(() => {
    if (movie?.Poster) dispatch(showImagePresentation(movie.Poster));
    // eslint-disable-next-line
  }, [dispatch, movie && movie.Poster]);

  const renderMovie = () => {
    if (isFetchingMovie)
      return (
        <div data-testid="loading-wrapper" className="fetching-movie">
          Loading...
        </div>
      );
    if (!movie) return <div className="movie-not-found">Movie Not Found</div>;

    return (
      <div data-testid="detail-wrapper" className="detail-wrapper">
        <div className="left">
          <div className="movie-image" onClick={showModalCallback}>
            <img data-testid="detail-poster" src={movie.Poster} alt="poster" />
          </div>
        </div>

        <div className="right">
          <div data-testid="detail-title" className="movie-detail-title">
            {movie.Title} ({movie.Year})
          </div>
          <div data-testid="detail-plot" className="plot">
            {movie.Plot}
          </div>
          <div className="additional-info">
            <span className="label">Rating: </span>
            <span data-testid="detail-rating">{movie.imdbRating}</span>
          </div>
          <div className="additional-info">
            <span className="label">Released: </span>
            {movie.Released}
          </div>
          <div className="additional-info">
            <span className="label">Writer: </span>
            {movie.Writer}
          </div>
          <div className="additional-info">
            <span className="label">Director: </span>
            {movie.Director}
          </div>
          <div className="additional-info">
            <span className="label">Production: </span>
            {movie.Production}
          </div>
          <div className="additional-info">
            <span className="label">Country: </span>
            {movie.Country}
          </div>
          <div className="additional-info">
            <span className="label">Language: </span>
            {movie.Language}
          </div>
        </div>
      </div>
    );
  };

  let previousPath = '/movies';
  let previousTitle = 'Movie List';
  let previousSearch: undefined | string;

  if (location.state) {
    const locState = location.state;

    if (locState.previousPath) previousPath = locState.previousPath;
    if (locState.previousTitle) previousTitle = locState.previousTitle;
    if (locState.previousSearch) previousSearch = locState.previousSearch;
  }

  return (
    <StyledMovieDetail>
      <div className="detail-container">
        <div
          className="navigation"
          onClick={() => {
            history.push({
              pathname: previousPath,
              search: previousSearch,
              state: {
                previousPath: location.pathname,
                previousTitle: movie ? movie.Title : 'Movie Detail',
              },
            });
          }}
        >
          <FAIcon name="chevron-left" />
          <span className="nav-title">Back to {previousTitle}</span>
        </div>
        {renderMovie()}
      </div>
    </StyledMovieDetail>
  );
};

export default MovieDetail;
