import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import PriceTag from './PriceTag';
import SvgIcon from './SvgIcon';
import { RemoveFromCart, UpdateCartItem } from './Buttons';
import { formatMoney, capWord } from '../lib/utils';


const CartItem = ({ id, quantity, variant }) => {
  if (!variant)
    return (
      <tr>
        <td className="cart-item-details">
          <p>This Product has been removed</p>
        </td>

        <td className="cart-item-quantity">
          <div className="cart-item-quantity-remove">
            <RemoveFromCart id={id} />
          </div>
        </td>
      </tr>
    );
  const title = variant.product.title;
  const price = variant.sale
    ? variant.salePrice
    : variant.price;
  return (
    <tr>
      <td className="cart-item-details">
        <div className='cart-item-image'>
          <Link href={{
            pathname: '/shop',
            query: { id: variant.product.id }
          }}>
            <a>
              <img width="100" height="120"
                src={variant.image.image_url}
                alt={title}
                title={`Go to: ${title}`}
              />
            </a>
          </Link>
        </div>

        <div className='cart-item-meta'>
          <div className="cart-item-detail">
            <h4>{title}</h4>
          </div>

          <div className="cart-item-detail">
            <PriceTag
              price={variant.price}
              sale={variant.sale}
              salePrice={variant.salePrice}
            />
          </div>

          {variant.size && (
            <div className="cart-item-detail">
              Size: {variant.size}
            </div>
          )}

          {variant.color && (
            <div className="cart-item-detail">
              Color: {capWord(variant.color)}
            </div>
          )}
        </div>
      </td>

      <td className="cart-item-quantity">
        <div className="cart-item-quantity-actions">
          <UpdateCartItem
            id={variant.id}
            quantity={quantity - 1}
            disabled={(quantity - 1) <= 0}
          >
            <SvgIcon width={7} name='minus' color='darkBlue' />
          </UpdateCartItem>

          {quantity}

          <UpdateCartItem
            id={variant.id}
            quantity={quantity + 1}
            disabled={(quantity + 1) > variant.quantity}
          >
            <SvgIcon width={7} name='plus' color='darkBlue' />
          </UpdateCartItem>

          <div className="cart-item-quantity-remove">
            <RemoveFromCart id={id} />
          </div>
        </div>
      </td>

      <td className="cart-item-total-price">
        {formatMoney(price * quantity)}
      </td>
    </tr>
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
