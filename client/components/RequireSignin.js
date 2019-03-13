import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { SigninForm } from './Forms';
import NotFound from './NotFound';
import User from './User';
import styled from 'styled-components';

const StyledRequireSignin = styled.div`
  display: grid;
  grid-template-rows: 2rem minmax(20rem, 30rem);
  grid-auto-flow: row;
  justify-content: center;
  grid-gap: 2rem;
  form {
    max-height: 32rem;
  }
`;


const RequireSignin = (props) => (
  <User>
    {({ loading, error, data }) => {
      if (loading) return (<p>Loading...</p>);
      if (error) return (<NotFound status={401} message={error.message} />);
      const me = (!data || !data.me)
        ? null
        : data.me;
      if (!me) {
        return (
          <StyledRequireSignin>
            <h3>Please Sign In before Continuing</h3>

            <SigninForm />
          </StyledRequireSignin>
        );
      }
      return props.children({ me });
    }}
  </User>
);

RequireSignin.propTypes = {
  children: PropTypes.func.isRequired
};


export default RequireSignin;
