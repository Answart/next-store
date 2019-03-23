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

const ORDERS_QUERY = gql`
  query ORDERS_QUERY(
    $orderBy: OrderOrderByInput,
    $skip: Int,
    $after: String,
    $before: String,
    $first: Int,
    $last: Int,
    $buyerId: ID,
  ) {
    orders(
      where: {
        buyer: { id: $buyerId },
      },
      orderBy: $orderBy,
      skip: $skip,
      after: $after,
      before: $before,
      first: $first,
      last: $last,
    ) {
      id
      status
      quantity
      payment
      total
      createdAt
      buyer {
        id
      }
      items {
        id
        title
        image_url
        seller {
          id
        }
      }
    }
  }
`;

const ORDER_ITEMS_QUERY = gql`
  query ORDER_ITEMS_QUERY(
    $orderBy: OrderItemOrderByInput,
    $skip: Int,
    $after: String,
    $before: String,
    $first: Int,
    $last: Int,
    $sellerId: ID
  ) {
    orderItems(
      where: {
        seller: { id: $sellerId }
      },
      orderBy: $orderBy,
      skip: $skip,
      after: $after,
      before: $before,
      first: $first,
      last: $last,
    ) {
      id
      title
      quantity
      price
      color
      size
      image_url
      createdAt
      seller {
        id
      }
      order {
        id
        status
        buyer {
          id
          name
        }
      }
      variant {
        id
        product {
          id
        }
      }
    }
  }
`;


export {
  ORDER_QUERY,
  ORDERS_QUERY,
  ORDER_ITEMS_QUERY,
}
