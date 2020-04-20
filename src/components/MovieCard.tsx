import React from 'react';
import styled from 'styled-components';
import { MovieItem } from 'api/omdbAPI';

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
    height: calc(100% - 30px);

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
  }
`;

type Props = {
  data: MovieItem;
};

const MovieCard = ({ data }: Props) => {
  return (
    <StyledMovieCard>
      <div className="image-wrapper">
        <img src={data.Poster} alt="poster" />
      </div>
      <div className="title">{data.Title}</div>
    </StyledMovieCard>
  );
};

export default React.memo(MovieCard);
