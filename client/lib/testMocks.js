import { CURRENT_USER_QUERY } from '../graphql';
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


export {
  userQueryMock,
  userQueryCartItemMock,
};
