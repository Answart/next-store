import gql from 'graphql-tag';


const TOGGLE_LOCAL_CARTOPEN_MUTATION = gql`
  mutation TOGGLE_LOCAL_CARTOPEN_MUTATION {
    toggleCart @client
  }
`;


export {
  TOGGLE_LOCAL_CARTOPEN_MUTATION
};
