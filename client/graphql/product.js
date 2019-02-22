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
      variants {
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
`;

const SHOP_PRODUCTS_QUERY = gql`
  query SHOP_PRODUCTS_QUERY(
    $orderBy: ProductOrderByInput,
    $skip: Int,
    $first: Int,
    $title: String,
    $online: Boolean,
    $department: String,
    $name: String,
    $category: String,
    $brand: String,
    $color: String,
    $size: String
  ) {
    products(
      where: {
        title_contains: $title,
        online: $online,
        department: $department,
        category: $category,
        brand: $brand,
        user: {
          name: $name
        },
        variants_every: {
          color: $color,
          size: $size
        }
      },
      orderBy: $orderBy,
      skip: $skip,
      first: $first
    ) {
      id
      department
      title
      category
      brand
      online
      user {
        id
        name
      }
      image {
        id
        name
        image_url
      }
      variants {
        id
        quantity
        color
        size
        price
        sale
        salePrice
        availability
      }
    }
  }
`;

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY(
    $title: String,
    $online: Boolean,
    $department: String,
    $name: String,
    $category: String,
    $brand: String,
    $color: String,
    $size: String,
  ) {
    productsConnection(
      where: {
        title_contains: $title,
        online: $online,
        department: $department,
        category: $category,
        brand: $brand,
        user: {
          name: $name
        },
        variants_every: {
          color: $color,
          size: $size
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

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
  PRODUCT_QUERY,
  SHOP_PRODUCTS_QUERY,
  PAGINATION_QUERY,
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION
}
