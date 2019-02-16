import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from '../graphql';
import {
  fakeUser, fakeCartItem, fakeVariant,
} from './testUtils';


const mockUser = fakeUser();
const mockCartItem = fakeCartItem();
const mockVariant = fakeVariant();

const userQueryMock = {
  request: { query: CURRENT_USER_QUERY },
  result: {
    data: {
      me: {
        ...mockUser,
        cart: [],
      },
    },
  },
};

const userQueryCartItemMock = {
  request: { query: CURRENT_USER_QUERY },
  result: {
    data: {
      me: {
        ...mockUser,
        cart: [mockCartItem],
      },
    },
  },
};

const addToCartMutationMock = {
  request: { query: ADD_TO_CART_MUTATION, variables: { id: mockVariant.id } },
  result: {
    data: {
      addToCart: {
        ...mockCartItem,
        quantity: 1,
      },
    },
  },
};


export {
  userQueryMock,
  userQueryCartItemMock,
  addToCartMutationMock
};
