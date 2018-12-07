import gql from 'graphql-tag';


const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      department
      title
      description
      category
      brand
      online
      image {
        id
        cloudinary_id
        name
        width
        height
        transformation
        image_url
        large_image_url
      }
      user {
        id
        name
      }
      productVariants {
        id
        price
        quantity
        color
        size
        price
        sale
        salePrice
        availability
        product {
          id
          image {
            id
            cloudinary_id
            name
            width
            height
            transformation
            image_url
            large_image_url
          }
        }
      }
    }
  }
`;

const CREATE_PRODUCT_WITH_IMAGE_MUTATION = gql`
  mutation CREATE_PRODUCT_WITH_IMAGE_MUTATION(
    $title: String!,
    $department: String!,
    $description: String!,
    $category: String,
    $brand: String
    $online: Boolean!,
    $cloudinary_id: String!,
    $name: String!,
    $height: Int!,
    $width: Int!,
    $transformation: String!,
    $image_url: String!,
    $large_image_url: String!
  ) {
    createProductWithImage(
      title: $title,
      department: $department,
      description: $description,
      category: $category,
      brand: $brand,
      online: $online,
      cloudinary_id: $cloudinary_id,
      name: $name,
      height: $height,
      width: $width,
      transformation: $transformation,
      image_url: $image_url,
      large_image_url: $large_image_url
    ) {
      id
    }
  }
`;

const UPDATE_PRODUCT_WITH_IMAGE_MUTATION = gql`
  mutation UPDATE_PRODUCT_WITH_IMAGE_MUTATION(
    $id: ID!,
    $title: String!,
    $department: String!,
    $description: String!,
    $category: String,
    $brand: String,
    $online: Boolean!,
    $cloudinary_id: String!,
    $name: String!,
    $height: Int!,
    $width: Int!,
    $transformation: String!,
    $image_url: String!,
    $large_image_url: String!
  ) {
    updateProductWithImage(
      id: $id,
      title: $title,
      department: $department,
      description: $description,
      category: $category,
      brand: $brand,
      online: $online,
      cloudinary_id: $cloudinary_id,
      name: $name,
      height: $height,
      width: $width,
      transformation: $transformation,
      image_url: $image_url,
      large_image_url: $large_image_url
    ) {
      id
    }
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export {
  PRODUCT_QUERY,
  CREATE_PRODUCT_WITH_IMAGE_MUTATION,
  UPDATE_PRODUCT_WITH_IMAGE_MUTATION,
  DELETE_PRODUCT_MUTATION
}
