import gql from 'graphql-tag';


const CREATE_PROD_VARIANT_MUTATION = gql`
  mutation CREATE_PROD_VARIANT_MUTATION(
    $price: Int!
    $quantity: Int!
    $color: String
    $size: String
    $sale: Boolean!
    $salePrice: Int
    $productId: String!
  ) {
    createProductVariant(
      price: $price
      quantity: $quantity
      color: $color
      size: $size
      sale: $sale
      salePrice: $salePrice
      productId: $productId
    ) {
      id
    }
  }
`;

const UPDATE_PROD_VARIANT_MUTATION = gql`
  mutation UPDATE_PROD_VARIANT_MUTATION(
    $id: ID!,
    $price: Int!
    $quantity: Int!
    $color: String
    $size: String
    $sale: Boolean!
    $salePrice: Int
  ) {
    updateProductVariant(
      id: $id
      price: $price
      quantity: $quantity
      color: $color
      size: $size
      sale: $sale
      salePrice: $salePrice
    ) {
      id
      product {
        id
      }
    }
  }
`;

const DELETE_PROD_VARIANT_MUTATION = gql`
  mutation DELETE_PROD_VARIANT_MUTATION($id: ID!) {
    deleteProductVariant(id: $id) {
      id
    }
  }
`;


export {
  CREATE_PROD_VARIANT_MUTATION,
  UPDATE_PROD_VARIANT_MUTATION,
  DELETE_PROD_VARIANT_MUTATION
};
