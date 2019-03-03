import gql from 'graphql-tag';


const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
    }
  }
`;

const UPDATE_CARTITEM_MUTATION = gql`
  mutation UPDATE_CARTITEM_MUTATION(
    $id: ID!,
    $quantity: Int!
  ) {
    updateCartItem(
      id: $id,
      quantity: $quantity
    ) {
      id
      quantity
      variant {
        id
        quantity
      }
    }
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;


export {
  ADD_TO_CART_MUTATION,
  UPDATE_CARTITEM_MUTATION,
  REMOVE_FROM_CART_MUTATION
}
