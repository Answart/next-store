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
  button {
    float: right;
  }
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
  .cart-block {
    display: block;
  }
  .cart-overflow {
    overflow: auto;
    -webkit-overflow-scrolling: auto;
    width: 100%;
  }
  .cart-body {
    overflow: auto !important;
    width: 100%;
    height:100%;
  }
  footer {
    grid-row: 3 / 3;
    grid-column: 1 / 1;
    color: ${props => props.theme.darkGrey};
    font-size: 0.9em;
    font-weight: bold;
    display: grid;
  }
`;


export {
  StyledCart,
};
