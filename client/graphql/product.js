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

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $title: String!,
    $department: String!,
    $description: String!,
    $image: String!,
    $category: String,
    $brand: String
  ) {
    createProduct(
      title: $title,
      department: $department,
      description: $description,
      image: $image,
      category: $category,
      brand: $brand,
    ) {
      id
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!,
    $title: String!,
    $department: String!,
    $description: String!,
    $image: String!,
    $category: String,
    $brand: String
    $online: Boolean!
  ) {
    updateProduct(
      id: $id,
      title: $title,
      department: $department,
      description: $description,
      image: $image,
      category: $category,
      brand: $brand,
      online: $online
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
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION
}
