import PropTypes from 'prop-types';


const CheckoutCart = (props) => {
  return (
          <button className="big-btn"
            disabled={props.disabled}
          >
            {props.children}
          </button>
  );
};

CheckoutCart.propTypes = {
  totalQuantity: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  image_url: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired
};


export { CheckoutCart };
