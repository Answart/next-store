import {
  CURRENT_USER_QUERY,
  SIGNOUT_MUTATION,
  REQUEST_PASSWORD_RESET_MUTATION,
} from '../../../graphql'
import { fakeUser } from '../utils';
import { mockCartItem } from './cart';

const mockUser = fakeUser();


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

const userQueryCartItemMock = overrides => ({
  request: { query: CURRENT_USER_QUERY },
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

const requestPasswordResetMutationMock = {
  request: { query: REQUEST_PASSWORD_RESET_MUTATION, variables: { email: 'answart@sbcglobal.net' } },
  result: {
    data: {
      requestPasswordReset: {
        __typename: 'Message',
        success: true,
        message: 'Your request has been sent! Check your email.',
      }
    },
  },
};

const requestPasswordResetMutationErrorMock = {
  request: { query: REQUEST_PASSWORD_RESET_MUTATION, variables: { email: 'err@g.c' } },
  result: {
    data: {
      requestPasswordReset: {
        __typename: 'Message',
        success: false,
        message: 'No such user found for email err@g.c',
      }
    },
  },
};


export {
  mockUser,
  userQueryEmptyCartMock, userQueryNoUserMock, userQueryCartItemMock,
  signoutMutationMock,
  requestPasswordResetMutationMock, requestPasswordResetMutationErrorMock
};