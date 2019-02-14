import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from '../graphql';
import {
  fakeUser, fakeCartItem,
} from './testUtils';


const userQueryMock = {
  request: { query: CURRENT_USER_QUERY },
  result: {
    data: {
      me: {
        ...fakeUser(),
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
        ...fakeUser(),
        cart: [fakeCartItem()],
      },
    },
  },
};

const addToCartMutationMock = {
  request: { query: ADD_TO_CART_MUTATION, variables: { id: 'abc123' } },
  result: {
    data: {
      addToCart: {
        ...fakeCartItem(),
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
