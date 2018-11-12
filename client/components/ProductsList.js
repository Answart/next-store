import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { StyledProductsList } from './styles/ProductStyles';
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
    pageLabel: PropTypes.string.isRequired,
    queryType: PropTypes.string.isRequired
  };
  render() {
    const { variables, pageLabel, queryType } = this.props;
    const query = queries[queryType];
    return (
      <StyledProductsList>
        <div className="prod-lst-title">
          {pageLabel && (
            <div>
              {pageLabel} <i>&#8811; BLANK</i>
            </div>
          )}
        </div>

        <div className="prod-lst-filters">
          Filters
        </div>

        <div className="prod-lst-pagination">
          Pagination
        </div>

        <div className="prod-lst">
          <Query
            query={query}
            variables={variables}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;
              return (
                <div className="prod-lst-itms">
                  {data.products && data.products.map(prdct =>
                    <ProductsListItem product={prdct} key={prdct.id} />
                  )}
                </div>
              );
            }}
          </Query>
        </div>
      </StyledProductsList>
    );
  }
}

export default ProductsList;
