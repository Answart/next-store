import gql from 'graphql-tag';


const ORDER_QUERY = gql`
  query ORDER_QUERY($id: ID!) {
    order(where: { id: $id }) {
      id
      status
      quantity
      payment
      subtotal
      shipping
      tax
      total
      createdAt
      buyer {
        id
        name
      }
      items {
        id
        title
        quantity
        price
        color
        size
        image_url
        variant {
          id
          product {
            id
          }
        }
      }
    }
  }
`;


export {
  ORDER_QUERY,
}
