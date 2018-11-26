import gql from 'graphql-tag';


const PRODUCTS_QUERY = gql`
  query PRODUCTS_QUERY {
    products {
      id
      department
      title
      description
      image
      category
      brand
      online
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
        sale
        salePrice
        availability
      }
    }
  }
`;

const ONLINE_PRODUCTS_QUERY = gql`
  query ONLINE_PRODUCTS_QUERY($online: Boolean!) {
    products(where: { online: $online }) {
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
        sale
        salePrice
        availability
      }
    }
  }
`;


const SELLERS_PRODUCTS_QUERY = gql`
  query SELLERS_PRODUCTS_QUERY($name: String) {
    products(where: { user: { name: $name }}) {
      id
      department
      title
      description
      image
      category
      brand
      online
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
        sale
        salePrice
        availability
      }
    }
  }
`;

const ONLINE_SELLERS_PRODUCTS_QUERY = gql`
  query ONLINE_SELLERS_PRODUCTS_QUERY($online: Boolean, $name: String) {
    products(where: { online: $online, user: { name: $name }}) {
      id
      department
      title
      description
      image
      category
      brand
      online
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
        sale
        salePrice
        availability
      }
    }
  }
`;

const ONLINE_DEPT_PRODUCTS_QUERY = gql`
  query ONLINE_DEPT_PRODUCTS_QUERY($online: Boolean, $department: String!) {
    products(where: { online: $online, department: $department }) {
      id
      department
      title
      description
      image
      category
      brand
      online
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
        sale
        salePrice
        availability
      }
    }
  }
`;

export {
  PRODUCTS_QUERY,
  ONLINE_PRODUCTS_QUERY,
  SELLERS_PRODUCTS_QUERY,
  ONLINE_SELLERS_PRODUCTS_QUERY,
  ONLINE_DEPT_PRODUCTS_QUERY
}
