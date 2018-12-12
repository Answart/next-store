import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { StyledProductsList } from './styles/ProductStyles';
import NotFound from './DisplayError';
import ProductsListItem from './ProductsListItem';
import {
  PRODUCTS_QUERY,
  ONLINE_PRODUCTS_QUERY,
  SELLERS_PRODUCTS_QUERY,
  ONLINE_SELLERS_PRODUCTS_QUERY,
  ONLINE_DEPT_PRODUCTS_QUERY
} from '../graphql';


const queries = {
  all: PRODUCTS_QUERY,
  online: ONLINE_PRODUCTS_QUERY,
  my: SELLERS_PRODUCTS_QUERY,
  name: ONLINE_SELLERS_PRODUCTS_QUERY,
  department: ONLINE_DEPT_PRODUCTS_QUERY
};

class ProductsList extends Component {
  static propTypes = {
    variables: PropTypes.object.isRequired,
    queryType: PropTypes.string.isRequired
  };
  render() {
    const { variables, queryType } = this.props;
    const query = queries[queryType];
    return (
      <Query
        query={query}
        variables={variables}
      >
        {({ data, error, loading }) => {
          if (loading) return (<p>Loading...</p>);
          if (error) return (<NotFound status={400} message={error.message} />);
          return (
            <StyledProductsList>
              {data.products.map(prdct =>
                <ProductsListItem
                  key={prdct.id}
                  product={prdct}
                />
              )}
            </StyledProductsList>
          );
        }}
      </Query>
    );
  }
}

export default ProductsList;
