import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { REMOVE_FROM_CART_MUTATION, CURRENT_USER_QUERY } from '../../graphql';


const RemoveFromCart = ({ id }) => {
  const update = (cache, payload) => {
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
  return (
    <Mutation mutation={REMOVE_FROM_CART_MUTATION}
      variables={{ id }}
      update={update}
    >
      {(removeFromCart, { loading, error }) => (
        <button className="undrln-btn"
          disabled={!id}
          onClick={(e) => {
            e.preventDefault();
            removeFromCart()
              .catch(err => alert(err.message.replace('GraphQL error: ', '')));
          }}
          title="Delete Item"
        >
          Remov{loading ? 'ing' : 'e'}
        </button>
      )}
    </Mutation>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired
};


export { RemoveFromCart };
