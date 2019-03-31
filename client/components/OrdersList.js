import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { formatMoney, capWord } from '../lib/utils';
import { StyledOrderListItems } from './styles/OrderStyles';


const OrdersList = ({ orders }) => (
  <div id='orders-list'>
    <StyledOrderListItems>
      {orders.map(order => {
        const items = order.items.slice(0, 4);
        const plusItems = order.items.length - 4;
        return (
          <div id={`order-list-item-${order.id}`} key={order.id}>
            <Link href={{
              pathname: '/order',
              query: { id: order.id },
            }}>
              <a className="order-list-item">
                <div className="order-list-item-imgs order-list-item-multi-imgs">
                  {items.map(orderItem => (
                    <img key={orderItem.id} className='order-list-item-multi-img'
                      src={orderItem.image_url}
                    />
                  ))}
                </div>

                <div className='order-list-item-details'>
                  <h3 className='page-title'>
                    <span>ID: {order.id}</span>
                    <span><i>{order.status}</i></span>
                  </h3>

                  <p className='page-detail'>
                    <span>Payment ID: </span>
                    <span>{order.payment}</span>
                  </p>

                  <p className='page-detail'>
                    <span>Items: </span>
                    <span>{capWord(order.quantity)}</span>
                  </p>

                  <p className='page-detail'>
                    <span>Grand Total: </span>
                    <span>{formatMoney(order.total)}</span>
                  </p>

                  <p className='page-detail'>
                    <span>Order Placed: </span>
                    <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
                  </p>
                </div>

                <div className='order-list-item-plus'>
                  {(plusItems > 0) && (
                    <b>{`+ ${plusItems} Items`}</b>
                  )}
                </div>
              </a>
            </Link>
          </div>
        )
      })}
    </StyledOrderListItems>
  </div>
);

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    payment: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};


export default OrdersList;
