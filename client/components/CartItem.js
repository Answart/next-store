import React from 'react';
import Link from 'next/link';
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
  const title = variant.product.title;
  return (
    <StyledCartItem>
      <td className="cart-item-details">
        <Link href={{
          pathname: "/shop",
          query: {
            id: variant.product.id
          }
        }}><a>
          <img width="100" height="120"
            src={variant.image.image_url}
            alt={title}
            title={`Go to: ${title}`}
          />
        </a></Link>

        <div>
          <div className="cart-item-detail">
            <h4>{title}</h4>
          </div>

          <div className="cart-item-detail">
            Price: {variant.price}
          </div>

          {variant.size && (
            <div className="cart-item-detail">
              Size: {variant.size}
            </div>
          )}

          {variant.color && (
            <div className="cart-item-detail">
              Color: {variant.color}
            </div>
          )}
        </div>
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
