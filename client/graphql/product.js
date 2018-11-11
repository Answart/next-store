import gql from 'graphql-tag';


const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      department
      title
      description
      image
      category
      brand
      online
      url
      user {
        id
        name
      }
      productVariants {
        id
        quantity
        color
        size
        price
      }
    }
  }
`;

export {
  PRODUCT_QUERY
}
