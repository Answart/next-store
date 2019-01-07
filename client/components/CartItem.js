import React from 'react';
import PropTypes from 'prop-types';
import { StyledCartItem } from './styles/TableStyles';


const CartItem = ({ id, quantity, variant }) => {
  if (!variant)
    return (
      <StyledCartItem>
        <td className="cart-item-details">
          <p>This Product has been removed</p>
        </td>

        <td className="cart-item-quantity">
          <div className="cart-item-quantity-remove">
            <button>remove cartitem here</button>
          </div>
        </td>
      </StyledCartItem>
    );
  return (
    <StyledCartItem>
      <td className="cart-item-details">
        <div>cartitem variant image here</div>

        <div>cartitem variant details here</div>
      </td>

      <td className="cart-item-quantity">
        <div className="cart-item-quantity-actions">
          <button>update cartitem amt by -1</button>

          <div>show cartitem quantity</div>

          <button>update cartitem amt by +1</button>

          <div className="cart-item-quantity-remove">
            <button>remove cartitem here</button>
          </div>
        </div>
      </td>

      <td className="cart-item-total-price">
        price * quantity here
      </td>
    </StyledCartItem>
  );
};

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  variant: PropTypes.shape({
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    sale: PropTypes.bool.isRequired,
    salePrice: PropTypes.number.isRequired,
    image: PropTypes.shape({
      id: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired
    }),
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  })
};


export default CartItem;
