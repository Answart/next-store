import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import { DELETE_PROD_VARIANT_MUTATION } from '../../graphql';


class DeleteProductVariant extends Component {
  render() {
    const { productId, id, children } = this.props;
    return (
      <Mutation
        mutation={DELETE_PROD_VARIANT_MUTATION}
        variables={{ id }}
      >
        {(deleteProductVariant, { error }) => (
          <button className="dlt-btn"
            disabled={!id}
            onClick={() => {
              if (confirm('Are you sure you want to delete this selection?')) {
                deleteProductVariant()
                  .then((res) => {
                    Router.push({
                      pathname: '/product/edit',
                      query: { id: productId }
                    });
                  })
                  .catch(err => {
                    alert(err.message);
                  });
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
