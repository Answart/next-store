import {
  LOCAL_CARTOPEN_QUERY,
  LOCAL_USER_QUERY,
} from '../../../../graphql'
import { mockUser, mockCartItem } from '../typeDefs';


const localUserQueryEmptyCartMock = {
  request: { query: LOCAL_USER_QUERY },
  result: {
    data: {
      me: {
        ...mockUser,
        cart: [],
      },
    },
  },
};

const localUserQueryNoUserMock = {
  request: { query: LOCAL_USER_QUERY },
  result: {
    data: { me: null }
  },
};

const localUserQueryCartItemMock = overrides => ({
  request: { query: LOCAL_USER_QUERY },
  result: {
    data: {
      me: {
        ...mockUser,
        cart: [{
          ...mockCartItem,
          ...overrides
        }],
      },
    },
  },
});


export {
  localUserQueryEmptyCartMock, localUserQueryNoUserMock, localUserQueryCartItemMock,
};
