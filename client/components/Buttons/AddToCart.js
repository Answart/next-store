import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from '../../graphql';


const AddToCart = ({ variant, disabled }) => (
  <Mutation mutation={ADD_TO_CART_MUTATION}
    variables={{ id: variant.id }}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(addToCart, { loading }) => (
      <button className="big-btn"
        disabled={!variant.id || disabled}
        onClick={(e) => {
          e.preventDefault();
          addToCart()
            .catch(err => alert(err.message.replace('GraphQL error: ', '')));
        }}
      >
        Add{loading ? 'ing' : ''} To Cart
      </button>
    )}
  </Mutation>
);

AddToCart.propTypes = {
  variant: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  disabled: PropTypes.bool.isRequired
};


export { AddToCart };
