import React from 'react';
import styled from 'styled-components';
import { MovieItem } from 'api/omdbAPI';
import { COLORS } from 'config';
import { useHistory, useLocation } from 'react-router-dom';
import { HistoryState } from 'types';
import { showImagePresentation } from 'store/ImagePresentation';
import { useDispatch } from 'react-redux';

const StyledMovieCard = styled.div`
  display: block;
  border-radius: 10px;
  overflow: hidden;
  width: 140px;
  height: 230px;
  margin: 10px;
  transition: 0.2s;
  cursor: pointer;
  background: #5f5f5f;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
    opacity: 0.5;
    transition: 0.1s;
  }

  .image-wrapper {
    width: 100%;
    height: calc(100% - 50px);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    padding: 0 10px;
    padding-top: 4px;
    overflow: hidden;
    transition: 0.3s;
    height: 100%;

    &:hover {
      background: ${COLORS.primary};
    }

    .view-details {
      text-align: right;
      font-size: 9pt;
      margin-top: 3px;
    }
  }
`;

type Props = {
  data: MovieItem;
};

const MovieCard = ({ data }: Props) => {
  const history = useHistory<HistoryState>();
  const location = useLocation<HistoryState>();
  const dispatch = useDispatch();
  const showModalCallback = React.useCallback(() => {
    dispatch(showImagePresentation(data.Poster));
    // eslint-disable-next-line
  }, [dispatch, data.Poster]);

  return (
    <StyledMovieCard>
      <div className="image-wrapper" onClick={showModalCallback}>
        <img data-testid="card-poster" src={data.Poster} alt="poster" />
      </div>
      <div
        className="title"
        onClick={() => {
          history.push({
            pathname: `/movies/${data.imdbID}`,
            state: {
              previousPath: location.pathname,
              previousTitle: 'Omdb Movie List',
              previousSearch: location.search,
            },
          });
        }}
      >
        <span data-testid="card-title">{data.Title}</span>
        <div className="view-details">View details</div>
      </div>
    </StyledMovieCard>
  );
};

export default React.memo(MovieCard);
