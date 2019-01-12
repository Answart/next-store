import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from '../../graphql';


const Logout = () => (
  <Mutation mutation={SIGNOUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(signout) => (
      <button className="undrln-btn"
        onClick={() => {
          signout()
            .catch(err => alert(err.message))
            .then((res) => {
              Router.push({ pathname: '/' });
            })
        }}
      >
        Log Out
      </button>
    )}
  </Mutation>
);


export { Logout };
