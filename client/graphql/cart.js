import gql from 'graphql-tag';


const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
    }
  }
`;


export {
  ADD_TO_CART_MUTATION,
}
