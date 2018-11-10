import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ProductsListItem from './ProductsListItem';


const StyledProductsList = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 5rem 10fr;
  grid-template-columns: 1fr 6fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  .prod-lst-title {
    grid-column: 1 / -1;
    grid-row: 1 / 1;
  }
`;

const Filters = styled.div`
  grid-column: 1 / 1;
  grid-row: 2 / -1;
  max-width: ${props => props.theme.maxWidth};
`;

const Pagination = styled.div`
  grid-column: 2 / -1;
  grid-row: 2 / 2;
  max-width: ${props => props.theme.maxWidth};
`;

const List = styled.div`
  grid-column: 2 / -1;
  grid-row: 3 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 0.5rem;
  justify-content: space-between;
  height: 100%;
`;

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    products {
      id
      department
      title
      description
      image
      category
      brand
      status
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

const DEPT_PRODUCTS_QUERY = gql`
  query DEPT_PRODUCTS_QUERY($department: String!) {
    products(where: { department: $department }) {
      id
      department
      title
      description
      image
      category
      brand
      status
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
      status
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

class ProductsList extends Component {
  render() {
    const queryHash = {
      department: DEPT_PRODUCTS_QUERY,
      name: SELLERS_PRODUCTS_QUERY,
      all: ALL_PRODUCTS_QUERY
    };
    const variables = this.props.shopQuery;
    const key = Object.keys(variables)[0];
    const query = key ? queryHash[key] : queryHash['all'];
    return (
      <StyledProductsList>
        <div className="prod-lst-title">
          {key && (
            <div>
              {key}: <i>{variables[key]}</i>
            </div>
          )}
        </div>

        <Filters>
          Filters
        </Filters>

        <Pagination>
          Pagination
        </Pagination>

        <List>
          <Query
            query={query}
            variables={variables}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;
              return (
                <div>
                  {data.products.length && data.products.map(product =>
                    <ProductsListItem product={product} key={product.id} />
                  )}
                </div>
              );
            }}
          </Query>
        </List>
      </StyledProductsList>
    );
  }
}

export default ProductsList;
export {
  ALL_PRODUCTS_QUERY,
  DEPT_PRODUCTS_QUERY,
  SELLERS_PRODUCTS_QUERY
};
