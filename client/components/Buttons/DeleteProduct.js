import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import { DELETE_PRODUCT_MUTATION, SHOP_PRODUCTS_QUERY } from '../../graphql';
import { user } from '../../lib/dummyData';


const DeleteProduct = props => {
  const { id, className, children } = props;
  const update = (cache, payload) => {
    try {
      const variables = { name: user.name };
      const data = cache.readQuery({ query: SHOP_PRODUCTS_QUERY, variables });
      data.products = data.products.filter(product => product.id !== payload.data.deleteProduct.id);
      cache.writeQuery({ query: SHOP_PRODUCTS_QUERY, variables, data });
    } catch(e) {}
  }
  return (
    <Mutation mutation={DELETE_PRODUCT_MUTATION}
      variables={{ id }}
      update={update}
    >
      {(deleteProduct, { error }) => (
        <button className={className ? `${className}` : 'dlt-btn'}
          disabled={!id}
          onClick={() => {
            if (confirm("Are you sure you want to delete this product?")) {
              deleteProduct()
                .catch(err => alert(err.message))
                .then((res) => {
                  Router.push({
                    pathname: "/shop",
                    query: { name: user.name }
                  });
                });
            }
          }}
        >
          {children}
        </button>
      )}
    </Mutation>
  )
};

DeleteProduct.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.string.isRequired
};


export default DeleteProduct;
