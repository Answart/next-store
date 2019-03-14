import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Mutation } from 'react-apollo';
import { CREATE_ORDER_MUTATION } from '../../graphql';


const CheckoutCart = props => {
  const onToken = async (e, tokenRes, createOrder) => {
    if (!!e && !!e.preventDefault) e.preventDefault();
    NProgress.start();
    await createOrder({ variables: { token: tokenRes.id }}).then((res) => {
      if (!res || !res.data) return NProgress.done();
      Router.push({
        pathname: '/order',
        query: { id: res.data.createOrder.id },
      });
    });
  };
  return (
    <Mutation mutation={CREATE_ORDER_MUTATION}
      onError={(e) => {
        NProgress.done();
        alert(e.message.replace('GraphQL error: ', ''));
      }}
    >
      {createOrder => (
          <button className="big-btn"
            disabled={props.disabled || !props.email}
            onClick={(e) => onToken(e, { id: 'dummy-token' }, createOrder)}
          >
            {props.children}
          </button>
      )}
    </Mutation>
  );
};

CheckoutCart.propTypes = {
  totalQuantity: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired
};


export { CheckoutCart };
