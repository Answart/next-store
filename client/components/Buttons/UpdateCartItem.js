import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { UPDATE_CARTITEM_MUTATION } from '../../graphql';


const UpdateCartItem = ({ id, quantity, disabled, children }) => {
  return (
    <Mutation mutation={UPDATE_CARTITEM_MUTATION}
      variables={{ id, quantity }}
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
  children: PropTypes.string.isRequired
};


export { UpdateCartItem };
