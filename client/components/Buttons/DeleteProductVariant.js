import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { DELETE_PROD_VARIANT_MUTATION, PRODUCT_QUERY } from '../../graphql';


const DeleteProductVariant = props => {
  const { productId, id, children } = props;
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
                .catch(err => alert(err.message))
                .then((res) => {
                  if (props.postDelete) props.postDelete();
                });
            }
          }}
        >
          {children}
        </button>
      )}
    </Mutation>
  );
};

DeleteProductVariant.propTypes = {
  productId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};


export { DeleteProductVariant };
