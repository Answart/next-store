import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { formatMoney, capWord } from '../lib/utils';
import { StyledOrderListItems } from './styles/OrderStyles';


const SalesList = ({ orderItems }) => (
  <div id='sales-list'>
    <StyledOrderListItems>
      {orderItems.map(orderItem => {
        const productId = (!!orderItem.variant && !!orderItem.variant.product)
          ? orderItem.variant.product.id
          : 'unknown';
        return (
          <div key={orderItem.id} id={`sales-list-item-${orderItem.id}`} className="order-list-item">
            <div className="order-list-item-imgs order-list-item-one-imgs">
              <Link href={{
                pathname: '/product/edit',
                query: { id: productId },
              }}>
                <a>
                  <img className='order-list-item-one-img'
                    src={orderItem.image_url}
                    alt={orderItem.title}
                    title={`Go to: ${orderItem.title}`}
                  />
                </a>
              </Link>
            </div>

            <div className='order-list-item-details'>
              <h3 className='page-title'>
                <span>ID: {orderItem.id}</span>
                <span><i>{orderItem.order.status}</i></span>
              </h3>

              <p className='page-detail'>
                <span>Product: </span>
                <span>{orderItem.title}</span>
              </p>

              <p className='page-detail'>
                <span>Quantity: </span>
                <span>{orderItem.quantity}</span>
              </p>

              {!!orderItem.color && (
                <p className='page-detail'>
                  <span>Color: </span>
                  <span>{capWord(orderItem.color)}</span>
                </p>
              )}

              {!!orderItem.size && (
                <p className='page-detail'>
                  <span>Size: </span>
                  <span>{orderItem.size}</span>
                </p>
              )}

              <p className='page-detail'>
                <span>Price: </span>
                <span>{formatMoney(orderItem.price)}</span>
              </p>

              <p className='page-detail'>
                <span>Bought by: </span>
                <span>{capWord(orderItem.order.buyer.name)}</span>
              </p>

              <p className='page-detail'>
                <span>Order Placed: </span>
                <span>{format(orderItem.createdAt, 'MM/DD/YYYY')}</span>
              </p>
            </div>
          </div>
        )
      })}
    </StyledOrderListItems>
  </div>
);

SalesList.propTypes = {
  orderItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    image_url: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    variant: PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
    order: PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      buyer: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired,
};


export default SalesList;
