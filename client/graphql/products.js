import gql from 'graphql-tag';


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


export {
  SHOP_PRODUCTS_QUERY,
  PAGINATION_QUERY
}
