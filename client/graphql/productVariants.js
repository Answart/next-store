import gql from 'graphql-tag';


const PROD_VARIANT_QUERY = gql`
  query PROD_VARIANT_QUERY($id: ID!) {
    productVariants(where: { product: { id: $id } }) {
      id
      quantity
      color
      size
      price
      product {
        id
        department
        title
        description
        image
        category
        brand
        online
      }
    }
  }
`;

const PROD_VARIANTS_QUERY = gql`
  query PROD_VARIANTS_QUERY {
    productVariants {
      id
      price
      quantity
      color
      size
      sale
      salePrice
      product {
        id
        department
        title
        description
        image
        category
        brand
        online
        url
      }
    }
  }
`;


export {
  PROD_VARIANT_QUERY,
  PROD_VARIANTS_QUERY
};
