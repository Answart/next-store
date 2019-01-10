import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { REMOVE_FROM_CART_MUTATION } from '../../graphql';


const RemoveFromCart = ({ id }) => {
  return (
    <Mutation mutation={REMOVE_FROM_CART_MUTATION}
      variables={{ id }}
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


export default RemoveFromCart;
