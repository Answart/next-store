import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import { DELETE_PROD_VARIANT_MUTATION, PRODUCT_QUERY } from '../../graphql';


class DeleteProductVariant extends Component {
  render() {
    const { productId, id, children } = this.props;
    const update = (cache, payload) => {
      const variables = { id: productId };
      const data = cache.readQuery({ query: PRODUCT_QUERY, variables });
      data.product.variants = data.product.variants.filter(variant => variant.id !== payload.data.deleteProductVariant.id);
      cache.writeQuery({ query: PRODUCT_QUERY, variables, data });
    };
    return (
      <Mutation mutation={DELETE_PROD_VARIANT_MUTATION}
        variables={{ id }}
        update={update}
      >
        {(deleteProductVariant, { error }) => (
          <button className="dlt-btn"
            disabled={!id}
            onClick={() => {
              if (confirm("Are you sure you want to delete this selection?")) {
                deleteProductVariant()
                  .then((res) => {
                    if (this.props.postDelete) this.props.postDelete();
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


export default DeleteProductVariant;
