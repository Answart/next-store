import gql from 'graphql-tag';


const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $title: String!,
    $department: String!,
    $description: String!,
    $category: String,
    $brand: String,
    $online: Boolean!,
    $imageId: String!
  ) {
    createProduct(
      title: $title,
      department: $department,
      description: $description,
      category: $category,
      brand: $brand,
      online: $online,
      imageId: $imageId
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
    $category: String,
    $brand: String,
    $online: Boolean!,
    $imageId: String!
  ) {
    updateProduct(
      id: $id,
      title: $title,
      department: $department,
      description: $description,
      category: $category,
      brand: $brand,
      online: $online,
      imageId: $imageId
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
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
}
