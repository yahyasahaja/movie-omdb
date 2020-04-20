import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config';

const StyledHome = styled.div`
  display: block;
  background: ${COLORS.backgroundColor};
`;

const Home = () => {
  return <StyledHome>Home</StyledHome>;
};

export default Home;
