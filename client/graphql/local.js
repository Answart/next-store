import gql from 'graphql-tag';


const LOCAL_CARTOPEN_QUERY = gql`
  query LOCAL_CARTOPEN_QUERY {
    cartOpen @client
  }
`;

const LOCAL_USER_QUERY = gql`
  query LOCAL_USER_QUERY {
    me @client {
      id
      email
      name
      cart {
        id
        quantity
        user {
          id
          name
        }
        variant {
          id
          size
          color
          quantity
          price
          sale
          salePrice
          product {
            id
            title
          }
          image {
            id
            image_url
          }
        }
      }
    }
  }
`;

const TOGGLE_LOCAL_CARTOPEN_MUTATION = gql`
  mutation TOGGLE_LOCAL_CARTOPEN_MUTATION {
    toggleCart @client
  }
`;


export {
  LOCAL_CARTOPEN_QUERY,
  LOCAL_USER_QUERY,
  TOGGLE_LOCAL_CARTOPEN_MUTATION
};
