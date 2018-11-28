import gql from 'graphql-tag';


const LOCAL_CARTOPEN_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_LOCAL_CARTOPEN_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;


export {
  LOCAL_CARTOPEN_QUERY,
  TOGGLE_LOCAL_CARTOPEN_MUTATION
};
