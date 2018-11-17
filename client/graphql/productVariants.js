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


export {
  PROD_VARIANTS_QUERY
};
