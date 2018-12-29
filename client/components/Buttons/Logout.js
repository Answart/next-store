import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import { SIGNOUT_MUTATION } from '../../graphql';


const Logout = () => (
  <Mutation mutation={SIGNOUT_MUTATION}>
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


export default Logout;
