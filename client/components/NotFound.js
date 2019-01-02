import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';


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

const NotFound = ({ status, message }) => {
  let title = 'Not Found';

  if (status === 204) title = 'Nothing Here';
  if (status === 401) title = 'Unauthorized';
  if (status === 400) {
    title = 'Error';
    message = 'An error occured. Please try again later.';
  };

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

NotFound.defaultProps = {
  status: 404,
  message: 'Unable to find what you are looking for!'
};

NotFound.propTypes = {
  status: PropTypes.number,
  message: PropTypes.string
};


export default NotFound;
