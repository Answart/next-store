import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { StyledCartCountAnimation, StyledCartCountDot } from './styles/CartStyles';


const CartCount = ({ count }) => (
  <StyledCartCountAnimation>
    <TransitionGroup>
      <CSSTransition
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
        unmountOnExit
      >
        <StyledCartCountDot>
          <div className={!count ? '' : 'active-count'}>
            {count}
          </div>
        </StyledCartCountDot>
      </CSSTransition>
    </TransitionGroup>
  </StyledCartCountAnimation>
);

CartCount.propTypes = {
  count: PropTypes.number.isRequired,
};


export default CartCount;
