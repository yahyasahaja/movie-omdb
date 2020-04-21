import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';

const StyledFAIcon = styled.div`
  font-size: 1.5rem;
  display: block;
  transition: 0.3s;
  color: white;
`;

type Props = {
  name: IconName;
  prefix?: IconPrefix;
  className?: string;
  onClick?: any;
};

const FAIcon = (props: Props) => {
  const { name, prefix = 'fas', ...others } = props;

  return (
    <StyledFAIcon {...others}>
      <FontAwesomeIcon icon={[prefix, name]} />
    </StyledFAIcon>
  );
};

export default React.memo(FAIcon);
