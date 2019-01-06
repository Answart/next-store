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
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${props => props.open && `transform: translateX(0);`};
  button {
    float: right;
  }
  header {
    display: inline-block;
    color: ${props => props.theme.darkBlue};
    margin: 0;
    text-align: right;
    font-style: italic;
    padding-bottom: 1rem;
    button {
      float: left;
    }
  }
  .cart-body {
    overflow: auto !important;
  }
  footer {
    padding: 0 0 1.2rem 0;
    display: grid;
    color: ${props => props.theme.darkGrey};
    font-size: 0.9em;
    font-weight: bold;
  }
`;


export {
  StyledCart,
};
