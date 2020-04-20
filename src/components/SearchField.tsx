import React from 'react';
import styled from 'styled-components';

const StyledSearchField = styled.div`
  display: block;
  width: 100%;

  input {
    width: 100%;
    padding: 10px 30px;
    border: 1px solid black;
    background: white;
    border-radius: 100px;
    font-size: 15pt;
  }
`;

const SearchField = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <StyledSearchField>
      <input {...props} />
    </StyledSearchField>
  );
};

export default React.memo(SearchField);
