import gql from 'graphql-tag';


const SHOP_PRODUCTS_QUERY = gql`
  query SHOP_PRODUCTS_QUERY(
    $online: Boolean,
    $department: String,
    $name: String
  ) {
    products(
      where: {
        online: $online,
        department: $department,
        user: {
          name: $name
        }
      }
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
    $online: Boolean,
    $department: String,
    $name: String,
  ) {
    productsConnection(
      where: {
        online: $online,
        department: $department,
        user: {
          name: $name
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
