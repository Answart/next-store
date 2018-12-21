import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import { DELETE_PRODUCT_MUTATION, SHOP_PRODUCTS_QUERY } from '../../graphql';
import { user } from '../../lib/dummyData';


class DeleteProduct extends Component {
  update = (cache, payload) => {
    try {
      const variables = { name: user.name };
      const data = cache.readQuery({ query: SHOP_PRODUCTS_QUERY, variables });
      data.products = data.products.filter(product => product.id !== payload.data.deleteProduct.id);
      cache.writeQuery({ query: SHOP_PRODUCTS_QUERY, variables, data });
    } catch(e) {}
  };
  render() {
    const { id, className, children } = this.props;
    return (
      <Mutation mutation={DELETE_PRODUCT_MUTATION}
        variables={{ id }}
        update={this.update}
      >
        {(deleteProduct, { error }) => (
          <button className={className ? `${className}` : 'dlt-btn'}
            disabled={!id}
            onClick={() => {
              if (confirm("Are you sure you want to delete this product?")) {
                deleteProduct()
                  .then((res) => {
                    Router.push({
                      pathname: "/shop",
                      query: { name: user.name }
                    });
                  })
                  .catch(err => alert(err.message));
              }
            }}
          >
            {children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteProduct;
