import gql from 'graphql-tag';


const LOCAL_CARTOPEN_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;


export {
  LOCAL_CARTOPEN_STATE_QUERY
};
