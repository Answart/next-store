import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';


const StyledNotFound = styled.div`
  padding: 10rem 0;
  background: white;
  text-align: center;
  h1 {
    padding-bottom: 10rem;
  }
  p {
    margin: 0;
    padding: 2rem 0;
    font-weight: 100;
  }
`;

const NotFound = (props) => {
  let title = 'Not Found';
  let message = 'Unable to find what you are looking for!';

  if (props.status) {
    if (props.status === 204) title = 'Nothing Here';
    if (props.status === 400) {
      title = 'Error';
      message = 'An error occured. Please try again later.';
    };
  };
  if (props.message && !!props.message.length) message = props.message;

  return (
    <StyledNotFound>
      <h1>{title}</h1>

      <p>{message}</p>

      <p>
        Go back to
        <Link href={{ pathname: '/' }}><a className="undrln-btn">
          home
        </a></Link>
        page.
      </p>
    </StyledNotFound>
  )
};


NotFound.propTypes = {
  status: PropTypes.number,
  message: PropTypes.string,
};

export default NotFound;
