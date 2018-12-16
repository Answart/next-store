import gql from 'graphql-tag';


const CREATE_PROD_VARIANT_MUTATION = gql`
  mutation CREATE_PROD_VARIANT_MUTATION(
    $color: String!,
    $size: String!,
    $quantity: Int!,
    $price: Float!,
    $sale: Boolean!,
    $salePrice: Float,
    $productId: String!,
    $imageId: String!
  ) {
    createProductVariant(
      color: $color,
      size: $size,
      price: $price,
      quantity: $quantity,
      sale: $sale,
      salePrice: $salePrice,
      productId: $productId,
      imageId: $imageId
    ) {
      id
    }
  }
`;

const UPDATE_PROD_VARIANT_MUTATION = gql`
  mutation UPDATE_PROD_VARIANT_MUTATION(
    $id: ID!,
    $color: String!,
    $size: String!,
    $quantity: Int,
    $price: Float,
    $sale: Boolean,
    $salePrice: Float,
    $imageId: String
  ) {
    updateProductVariant(
      id: $id,
      color: $color,
      size: $size,
      quantity: $quantity,
      price: $price,
      sale: $sale,
      salePrice: $salePrice,
      imageId: $imageId
    ) {
      id
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
