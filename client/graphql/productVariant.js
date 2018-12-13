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

const CREATE_PROD_VARIANT_WITH_IMAGE_MUTATION = gql`
  mutation CREATE_PROD_VARIANT_WITH_IMAGE_MUTATION(
    $price: Float!
    $quantity: Int!
    $color: String
    $size: String
    $sale: Boolean!
    $salePrice: Float
    $cloudinary_id: String,
    $name: String,
    $height: Int,
    $width: Int,
    $transformation: String,
    $image_url: String,
    $large_image_url: String,
    $productId: String!
  ) {
    createProductVariantWithImage(
      price: $price
      quantity: $quantity
      color: $color
      size: $size
      sale: $sale
      salePrice: $salePrice
      cloudinary_id: $cloudinary_id,
      name: $name,
      height: $height,
      width: $width,
      transformation: $transformation,
      image_url: $image_url,
      large_image_url: $large_image_url,
      productId: $productId
    ) {
      id
    }
  }
`;

const UPDATE_PROD_VARIANT_WITH_IMAGE_MUTATION = gql`
  mutation UPDATE_PROD_VARIANT_WITH_IMAGE_MUTATION(
    $id: ID!,
    $price: Float!
    $quantity: Int!
    $sale: Boolean!
    $salePrice: Float,
    $cloudinary_id: String!,
    $name: String!,
    $height: Int!,
    $width: Int!,
    $transformation: String!,
    $image_url: String!,
    $large_image_url: String!
  ) {
    updateProductVariantWithImage(
      id: $id
      price: $price
      quantity: $quantity
      sale: $sale
      salePrice: $salePrice
      cloudinary_id: $cloudinary_id,
      name: $name,
      height: $height,
      width: $width,
      transformation: $transformation,
      image_url: $image_url,
      large_image_url: $large_image_url
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
  CREATE_PROD_VARIANT_WITH_IMAGE_MUTATION,
  UPDATE_PROD_VARIANT_WITH_IMAGE_MUTATION,
  DELETE_PROD_VARIANT_MUTATION
};
