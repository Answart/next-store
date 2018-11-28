import gql from 'graphql-tag';


const LOCAL_CARTOPEN_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_LOCAL_CARTOPEN_MUTATION = gql`
  query {
    toggleCart @client
  }
`;


export {
  LOCAL_CARTOPEN_STATE_QUERY,
  TOGGLE_LOCAL_CARTOPEN_MUTATION
};
