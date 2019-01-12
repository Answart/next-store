import PropTypes from 'prop-types';


const UpdateCartItem = ({ id, quantity, disabled, children }) => {
  return (
        <button
          disabled={disabled}
          onClick={(e) => console.log('updating', id, quantity)}
        >
          {children}
        </button>
  );
};

UpdateCartItem.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired
};


export { UpdateCartItem };
