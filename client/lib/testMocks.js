import {
  CURRENT_USER_QUERY,
  SIGNOUT_MUTATION,
  ADD_TO_CART_MUTATION, REMOVE_FROM_CART_MUTATION
} from '../graphql';
import {
  fakeUser, fakeCartItem, fakeVariant,
} from './testUtils';

const mockUser = fakeUser();
const mockCartItem = fakeCartItem();
const mockVariant = fakeVariant();


const userQueryEmptyCartMock = {
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

const userQueryNoUserMock = {
  request: { query: CURRENT_USER_QUERY },
  result: {
    data: { me: null }
  },
};

const signoutMutationMock = {
  request: { query: SIGNOUT_MUTATION },
  result: {
    data: {
      signout: {
        __typename: 'Message',
        success: true,
        message: 'Goodbye!'
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


export {
  userQueryNoUserMock,
  userQueryEmptyCartMock,
  userQuerySignoutMock,
  userQueryCartItemMock,
  addToCartMutationMock,
  updateCartItemMutationMock,
  removeFromCartMutationMock
};