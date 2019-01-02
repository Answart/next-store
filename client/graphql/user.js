import gql from 'graphql-tag';


const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
    requestPasswordReset(email: $email) {
      message
    }
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;


export {
  ALL_USERS_QUERY,
  CURRENT_USER_QUERY,
  SIGNUP_MUTATION,
  SIGNIN_MUTATION,
  SIGNOUT_MUTATION,
  REQUEST_PASSWORD_RESET_MUTATION,
  RESET_PASSWORD_MUTATION
};
