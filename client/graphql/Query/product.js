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
    $size: String,
    $price_lte: Float,
    $price_gte: Float
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
        variants_some: {
          price_lte: $price_lte,
          price_gte: $price_gte,
          salePrice_lte: $price_lte,
          salePrice_gte: $price_gte,
          color: $color,
          size: $size
        },
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
  PRODUCT_QUERY,
  SHOP_PRODUCTS_QUERY,
  PAGINATION_QUERY,
}
