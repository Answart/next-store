import {
  ADD_TO_CART_MUTATION,
  UPDATE_CARTITEM_MUTATION,
  REMOVE_FROM_CART_MUTATION
} from '../../../graphql'
import { mockCartItem, mockVariant } from '../utils';


const addToCartMutationMock = {
  request: { query: ADD_TO_CART_MUTATION, variables: { id: mockVariant.id } },
  result: {
    data: {
      addToCart: {
        __typename: mockCartItem.__typename,
        id: mockCartItem.id,
      },
    },
  },
};

const updateCartItemMutationMock = (quantity) => ({
  request: { query: UPDATE_CARTITEM_MUTATION, variables: { id: mockCartItem.id, quantity } },
  result: {
    data: {
      updateCartItem: {
        __typename: mockCartItem.__typename,
        id: mockCartItem.id,
        quantity,
        variant: { ...mockCartItem.variant }
      },
    },
  },
});

const removeFromCartMutationMock = {
  request: { query: REMOVE_FROM_CART_MUTATION, variables: { id: mockCartItem.id } },
  result: {
    data: {
      removeFromCart: {
        __typename: mockCartItem.__typename,
        id: mockCartItem.id,
      },
    },
  },
};


export {
  addToCartMutationMock,
  updateCartItemMutationMock,
  removeFromCartMutationMock
}
