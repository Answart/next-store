import gql from 'graphql-tag';


const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
    }
  }
`;


export {
  CREATE_ORDER_MUTATION
}
