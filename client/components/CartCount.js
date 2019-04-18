import React from 'react';
import PropTypes from 'prop-types';
import { StyledCartCountAnimation, StyledCartCountDot } from './styles/CartStyles';


const CartCount = ({ count }) => (
  <StyledCartCountAnimation>
        <StyledCartCountDot>
          <div className={!count ? '' : 'active-count'}>
            {count}
          </div>
        </StyledCartCountDot>
  </StyledCartCountAnimation>
);

CartCount.propTypes = {
  count: PropTypes.number.isRequired,
};


export default CartCount;
