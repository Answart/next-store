import styled from 'styled-components';


const StyledCart = styled.div`
  position: relative;
  background: white;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 40%;
  min-width: 55rem;
  padding: 2rem;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: ${props => props.theme.cartShadow};
  z-index: 5;
  display: grid;
  grid-auto-flow: rows;
  grid-template-rows: 1rem 1fr 12rem;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  ${props => props.open && `transform: translateX(0);`};
  header {
    color: ${props => props.theme.darkBlue};
    text-align: right;
    font-style: italic;
    grid-row: 1 / 3;
    grid-column: 1 / 1;
    button {
      float: left;
    }
  }
  .cart-container {
    grid-row: 2 / 3;
    grid-column: 1 / 1;
  }
  footer {
    grid-row: 3 / 3;
    grid-column: 1 / 1;
    color: ${props => props.theme.darkGrey};
    font-size: 0.9em;
    font-weight: bold;
    display: grid;
    button {
      float: right;
    }
  }
`;

const StyledCartCountAnimation = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

const StyledCartCountDot = styled.div`
  background-color: transparent;
  color: transparent;
  line-height: 1.4rem;
  min-width: 2rem;
  padding: 0.2rem 0;
  margin: 0 0 -0.6rem 0;
  font-size: 0.85rem;
  font-weight: bold;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  .active-count {
    background-color: ${props => props.theme.redOrange};
    color: ${props => props.theme.beige};
    border-radius: 50%;
  }
`;


export {
  StyledCart,
  StyledCartCountAnimation,
  StyledCartCountDot
};
