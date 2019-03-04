import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { UPDATE_CARTITEM_MUTATION, CURRENT_USER_QUERY } from '../../graphql';


const UpdateCartItem = ({ id, quantity, disabled, children }) => {
  const update = (cache, payload) => {
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    const cartItemVariantId = payload.data.updateCartItem.variant.id;
    data.me.cart = data.me.cart.map(cartItem => {
      if (cartItem.variant.id === cartItemVariantId) cartItem.quantity = quantity;
      return cartItem;
    });
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
  return (
    <Mutation mutation={UPDATE_CARTITEM_MUTATION}
      variables={{ id, quantity }}
      update={update}
    >
      {(updateCartItem, { loading, error }) => (
        <button
          disabled={disabled || loading}
          onClick={(e) => {
            e.preventDefault();
            updateCartItem()
              .catch(err => alert(err.message.replace('GraphQL error: ', '')));
          }}
        >
          {children}
        </button>
      )}
    </Mutation>
  );
};

UpdateCartItem.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};


export { UpdateCartItem };
