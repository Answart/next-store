import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import Product from './Product';


const ProductsListStyles = styled.div`
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

let PRODUCTS_DEPT_QUERY = null;

class Products extends Component {
  render() {

    const dept = this.props.department;

    PRODUCTS_DEPT_QUERY = gql`
      query PRODUCTS_DEPT_QUERY {
        products(where: { department: "${dept}" }) {
          id
          category
          title
          image
          size
          sale
          price
          salePrice
          availability
        }
      }
    `;

    return (
      <ProductsListStyles>
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
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;
              return (
                <div>
                  {data.products.length && data.products.map(product =>
                    <Product product={product} key={product.id} />
                  )}
                </div>
              );
            }}
          </Query>
        </List>
      </ProductsListStyles>
    );
  }
}

export default Products;
export { PRODUCTS_DEPT_QUERY };
