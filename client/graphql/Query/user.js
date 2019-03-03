import gql from 'graphql-tag';


const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
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


export {
  ALL_USERS_QUERY,
  CURRENT_USER_QUERY,
};
