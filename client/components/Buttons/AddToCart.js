import PropTypes from 'prop-types';


const AddToCart = ({ variant, disabled }) => (
      <button className="big-btn"
        disabled={disabled}
        onClick={(e) => e.preventDefault;console.log('adding', variant.id)}
      >
        Add To Cart
      </button>
);

AddToCart.propTypes = {
  variant: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  disabled: PropTypes.bool.isRequired
};


export default AddToCart;
