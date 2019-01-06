import styled from 'styled-components';


const StyledShopPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 1fr;
  grid-gap: 3rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  .shop-pg-content {
    display: grid;
    grid-row: 2 / -1;
    grid-template-columns: 18rem 1fr;
    grid-gap: 3rem;
    grid-auto-flow: column;
    .shop-pg-lst {
      grid-column: 2 / -1;
      display: grid;
      grid-template-rows: 5rem minmax(50rem, 1fr) 5rem;
      grid-gap: 3rem;
      grid-auto-flow: row;
    }
  }
`;

const StyledCreatePage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(36rem, 1fr);
  grid-template-columns: minmax(80rem, 4fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .create-pg-form {
    grid-row: 2 / 2;
    grid-column: 1 / 1;
    margin: 0 4rem;
  }
`;

const StyledEditPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 2rem minmax(50rem, 1fr);
  grid-template-columns: minmax(80rem, 4fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .edit-pg-navi {
    grid-column: 1 / -1;
    grid-row: 2 / 2;
    text-align: right;
  }
  .edit-pg-content {
    grid-column: 1 / 1;
    grid-row: 3 / -1;
    margin: 0 4rem;
    .edit-pg-content-footer {
      padding: 5rem 0;
      text-align: center;
    }
  }
`;

const StyledBuyPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(50rem, 1fr);
  grid-template-columns: minmax(80rem, 4fr);
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .buy-page-content {
    grid-row: 2 / 2;
    grid-column: 1 / 1;
  }
`;

const StyledSignupPage = styled.div`
  display: grid;
  grid-template-rows: 1.9rem minmax(50rem, 1fr);
  grid-template-columns: 1fr 80% 1fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  .signup-page-content {
    grid-row: 2 / 2;
    grid-column: 2 / 2;
  }
`;

const StyledCartPage = styled.div`
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

const StyledPageTitle = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  font-size: 1.1rem;
  color: ${props => props.theme.darkGrey};
`;

export {
  StyledShopPage,
  StyledCreatePage,
  StyledEditPage,
  StyledBuyPage,
  StyledSignupPage,
  StyledCartPage,
  StyledPageTitle
};
