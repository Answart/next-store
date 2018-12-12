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
  const notFound = {
    title: 'Not Found',
    message: 'Unable to find what you are looking for!'
  };
  if (props.status) {
    if (props.status === 204) notFound.title = 'Nothing Here';
    if (props.status === 400) {
      notFound.title = 'Error';
      notFound.message = !!props.message ? props.message : 'An error occured. Please try again later.';
    };
  };

  return (
    <StyledNotFound>
      <h1>{notFound.title}</h1>

      <p>{notFound.message}</p>

      <p>
        Go to back
        <Link href={{ pathname: '/' }}><a className="undrln-btn">
          home.
        </a></Link>
      </p>
    </StyledNotFound>
  )
};


NotFound.propTypes = {
  status: PropTypes.number,
  message: PropTypes.string,
};

export default NotFound;
