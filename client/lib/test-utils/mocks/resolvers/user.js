import {
  CURRENT_USER_QUERY,
  SIGNUP_MUTATION,
  SIGNOUT_MUTATION,
  REQUEST_PASSWORD_RESET_MUTATION, RESET_PASSWORD_MUTATION
} from '../../../../graphql'
import { mockUser, mockCartItem } from '../typeDefs';


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

const signupMutationMock = {
  request: { query: SIGNUP_MUTATION, variables: {
    email: mockUser.email, name: mockUser.name, password: mockUser.password,
  }},
  result: {
    data: {
      createUser: {
        __typename: 'User',
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
      },
    },
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

const resetPasswordMutationMock = {
  request: { query: RESET_PASSWORD_MUTATION, variables: {
    resetToken: 'test-token',
    password: mockUser.password,
    confirmPassword: mockUser.password,
  }},
  result: {
    data: {
      resetPassword: {
        // __typename: 'User',
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name
      }
    },
  },
};

const resetPasswordMutationErrorMock = {
  request: { query: RESET_PASSWORD_MUTATION, variables: {
    resetToken: 'test-token',
    password: mockUser.password,
    confirmPassword: 'wrong-password',
  }},
  result: {
    errors: [{ message: 'ack!' }],
  },
};


export {
  userQueryEmptyCartMock, userQueryNoUserMock, userQueryCartItemMock,
  signupMutationMock,
  signoutMutationMock,
  requestPasswordResetMutationMock, requestPasswordResetMutationErrorMock,
  resetPasswordMutationMock, resetPasswordMutationErrorMock,
};
