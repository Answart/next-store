import PropTypes from 'prop-types';


const UpdateCartItem = ({ id, quantity, children }) => {
  const disabled = !id || !quantity || quantity <= 0;
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
  children: PropTypes.string.isRequired
};


export default UpdateCartItem;
