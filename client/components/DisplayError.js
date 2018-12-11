import styled from 'styled-components';
import React from 'react';

import PropTypes from 'prop-types';

const StyledDisplayError = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid ${props => props.theme.red};
  border-right: 5px solid ${props => props.theme.red};
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  const errors = error.networkError && error.networkError.result && !!error.networkError.result.errors.length
    ? error.networkError.result.errors
    : [{ ...error }];

  return errors.map((error, i) => (
    <StyledDisplayError key={i}>
      <p data-test="graphql-error">
        <strong>Hold up!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </StyledDisplayError>
  ));
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};


export default DisplayError;
