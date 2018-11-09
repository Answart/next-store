import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import ProductsListItem from './ProductsListItem';


const StyledProductsList = styled.div`
  display: grid;
  grid-template-rows: 0.5rem 5rem 10fr;
  grid-template-columns: 1fr 6fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
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

const PRODUCTS_DEPT_QUERY = gql`
  query PRODUCTS_DEPT_QUERY($dept: String!) {
    products(where: { department: $dept }) {
      id
      department
      title
      description
      image
      category
      brand
      status
      url
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
    const dept = this.props.dept;
    return (
      <StyledProductsList>
        <i>{dept}</i>

        <Filters>
          Filters
        </Filters>

        <Pagination>
          Pagination
        </Pagination>

        <List>
          <Query
            query={PRODUCTS_DEPT_QUERY}
            variables={{ dept }}
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
export { PRODUCTS_DEPT_QUERY };
