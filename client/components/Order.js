import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { formatMoney, capWord } from '../lib/utils';
import { StyledOrder } from './styles/OrderStyles';
import { StyledOrderTable } from './styles/TableStyles';
import PriceTag from './PriceTag';


const Order = ({ order }) => (
  <StyledOrder data-test="order">
    <div id="order-header">
      <h2>
        <span>Payment Information</span>
        <span><i>{capWord(order.status)}</i></span>
      </h2>

      <div className="order-payment-details">
        <p>
          <span>Order ID:</span>
          <span>{order.id}</span>
        </p>

        <p>
          <span>Payment ID: </span>
          <span>{order.payment}</span>
        </p>

        <p>
          <span>Order Placed: </span>
          <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
        </p>
      </div>
    </div>

    <StyledOrderTable>
      <thead>
        <tr>
          <th className='column-one'>Product</th>
          <th className='column-two'>Quantity</th>
          <th className='column-three'>Total Price</th>
        </tr>
      </thead>

      <tbody>
        {order.items.map(orderItem => {
          const productId = (!!orderItem.variant && !!orderItem.variant.product)
            ? orderItem.variant.product.id
            : 'unknown';
          return (
            <tr key={orderItem.id}>
              <td className="order-item-details">
                <div className='order-item-image'>
                  <Link href={{
                    pathname: '/buy',
                    query: { id: productId }
                  }}>
                    <a>
                      <img width="100" height="120"
                        src={orderItem.image_url}
                        alt={orderItem.title}
                        title={`Go to: ${orderItem.title}`}
                      />
                    </a>
                  </Link>
                </div>

                <div className='order-item-meta'>
                  <div className="order-item-detail order-item-title">
                    <h4>{orderItem.title}</h4>
                  </div>

                  <div className="order-item-detail">
                    <PriceTag
                      price={orderItem.price}
                      sale={false}
                      salePrice={0}
                    />
                  </div>

                  {orderItem.size && (
                    <div className="order-item-detail">
                      Size: {orderItem.size}
                    </div>
                  )}

                  {orderItem.color && (
                    <div className="order-item-detail">
                      Color: {capWord(orderItem.color)}
                    </div>
                  )}
                </div>
              </td>

              <td className="order-item-quantity">
                {orderItem.quantity}
              </td>

              <td className="order-item-price">
                {formatMoney(orderItem.price * orderItem.quantity)}
              </td>
            </tr>
          )
        })}
      </tbody>

      <tfoot>
        <tr>
          <td></td>
          <td>Subtotal</td>
          <td>{formatMoney(order.subtotal)}</td>
        </tr>

        <tr>
          <td></td>
          <td>Shipping</td>
          <td>{formatMoney(order.shipping)}</td>
        </tr>

        <tr>
          <td></td>
          <td>Sale Tax</td>
          <td>{formatMoney(order.tax)}</td>
        </tr>

        <tr>
          <td></td>
          <td>Grand Total</td>
          <td>{formatMoney(order.total)}</td>
        </tr>
      </tfoot>
    </StyledOrderTable>
  </StyledOrder>
);

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    payment: PropTypes.string.isRequired,
    subtotal: PropTypes.number.isRequired,
    shipping: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      size: PropTypes.string,
      color: PropTypes.string,
      image_url: PropTypes.string.isRequired,
      variant: PropTypes.shape({
        product: PropTypes.shape({
          id: PropTypes.string.isRequired,
        })
      })
    })).isRequired,
  }).isRequired,
};


export default Order;
