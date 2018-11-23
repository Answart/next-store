import gql from 'graphql-tag';


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

const PRODUCT_PROD_VARIANTS_QUERY = gql`
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


export {
  PROD_VARIANTS_QUERY,
  PRODUCT_PROD_VARIANTS_QUERY
};
