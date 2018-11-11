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

export {
  PRODUCT_QUERY,
  CREATE_PRODUCT_MUTATION
}
