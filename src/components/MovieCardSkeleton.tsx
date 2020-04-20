import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const StyledSkeleton = styled.div`
  display: block;
  width: 140px;
  height: 230px;
  margin: 10px;
`;

const MovieCardSkeleton = () => {
  return (
    <StyledSkeleton>
      <Skeleton width="100%" height={230} />
    </StyledSkeleton>
  );
};

export default React.memo(MovieCardSkeleton);
