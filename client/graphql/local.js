import gql from 'graphql-tag';


const LOCAL_CARTOPEN_QUERY = gql`
  query LOCAL_CARTOPEN_QUERY {
    cartOpen @client
  }
`;

const TOGGLE_LOCAL_CARTOPEN_MUTATION = gql`
  mutation TOGGLE_LOCAL_CARTOPEN_MUTATION {
    toggleCart @client
  }
`;


export {
  LOCAL_CARTOPEN_QUERY,
  TOGGLE_LOCAL_CARTOPEN_MUTATION
};
