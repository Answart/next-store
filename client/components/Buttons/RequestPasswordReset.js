import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { REQUEST_PASSWORD_RESET_MUTATION } from '../../graphql';


const RequestPasswordReset = ({ email, children }) => (
  <Mutation mutation={REQUEST_PASSWORD_RESET_MUTATION} variables={{ email }}>
    {(requestPasswordReset) => (
      <button className='undrln-btn'
        disabled={!email}
        onClick={async e => {
          e.preventDefault();
          if (confirm(`Send reset confirmation email to '${email}'?`)) {
            await requestPasswordReset()
              .catch(err => alert(err.message))
              .then(res => alert(res.data.requestPasswordReset.message))
            }
        }}
      >
        {children}
      </button>
    )}
  </Mutation>
);

RequestPasswordReset.propTypes = {
  email: PropTypes.string,
  children: PropTypes.string.isRequired
};


export default RequestPasswordReset;
