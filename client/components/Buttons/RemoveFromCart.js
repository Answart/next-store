import PropTypes from 'prop-types';


const RemoveFromCart = ({ id }) => {
  const addToCart = e => {
    e.preventDefault();
    console.log('adding', id)
  };
  return (
        <button className="undrln-btn"
          disabled={!id}
          onClick={addToCart}
          title="Delete Item"
        >
          Remove
        </button>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired
};


export default RemoveFromCart;
