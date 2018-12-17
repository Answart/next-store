import gql from 'graphql-tag';


const SHOP_PRODUCTS_QUERY = gql`
  query SHOP_PRODUCTS_QUERY(
    $online: Boolean,
    $department: String,
    $name: String
  ) {
    products(where: {
      online: $online,
      department: $department,
      user: { name: $name }
    }) {
      id
      department
      title
      description
      category
      brand
      online
      user {
        id
        name
      }
      image {
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


export {
  SHOP_PRODUCTS_QUERY
}
