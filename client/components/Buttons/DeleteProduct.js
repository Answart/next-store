import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import { PRODUCTS_QUERY, DELETE_PRODUCT_MUTATION } from '../graphql';


class DeleteProduct extends Component {
  render() {
    const { id, className, children } = this.props;
    return (
      <Mutation mutation={DELETE_PRODUCT_MUTATION}
        variables={{ id }}
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
