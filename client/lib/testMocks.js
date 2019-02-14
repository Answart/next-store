import { CURRENT_USER_QUERY } from '../graphql';
import {
  fakeUser,
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


export {
  userQueryMock,
};
