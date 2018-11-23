import styled from 'styled-components';


const StyledProduct = styled.div`
  display: grid;
  grid-auto-columns: 1fr 1fr;
  grid-gap: 3rem;
  grid-auto-flow: column;
  text-decoration: none;
  font-size: 1.1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  select {
    height: 2rem;
    min-width: 12rem;
    padding: 0.25rem;
    margin: 0.25rem;
    font-size: 1rem;
    border: 1px solid ${props => props.theme.lightGrey};
    background-color: transparent;
    &:focus {
      outline: ${props => props.theme.darkblue};
      border-color: ${props => props.theme.darkblue};
    }
    &:active {
      color: ${props => props.theme.darkblue};
      border-color: ${props => props.theme.darkblue};
    }
  }
  .prdct-padding {
    padding: 0.35rem 0;
  }
  .prdct-imgs {
  }
  .prdct-content {
    color: ${props => props.theme.textGrey};
  }
  .prdct-title {
    color: ${props => props.theme.darkblue};
    font-size: 1.17em;
    padding: 0;
    font-weight: bold;
  }
  .prdct-creator {
    font-size: 1rem;
    padding-bottom: 1rem;
  }
  .prdct-desc {
    border-top: 1px solid ${props => props.theme.textGrey};
    padding: 1rem 0 0 0;
  }
`;

const StyledProductVariants = styled.div`
  width: 100%;
  bottom: 0;
  .prdct-var-price {
    padding: 1rem 0.5rem;
  }
  .prdct-var-sale-price {
    color: ${props => props.theme.red};
  }
`;

const StyledProductsList = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 5rem 1fr;
  grid-template-columns: 18rem 1fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  .prdct-lst-title {
    grid-column: 1 / -1;
    grid-row: 1 / 1;
  }
  .prdct-lst-filters {
    grid-column: 1 / 1;
    grid-row: 2 / -1;
    max-width: ${props => props.theme.maxWidth};
  }
  .prdct-lst-pgntn {
    grid-column: 2 / -1;
    grid-row: 2 / 2;
    max-width: ${props => props.theme.maxWidth};
  }
  .prdct-lst {
    grid-column: 2 / -1;
    grid-row: 3 / -1;
  }
  .prdct-lst-itms {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    grid-gap: 2.2rem;
    justify-content: space-between;
  }
`;

const StyledProductsListItem = styled.div`
  min-width: 16rem;
  max-width: 27rem;
  img {
    background-color: pink;
    display: grid;
    grid-auto-columns: 1fr;
    min-height: 25rem;
    max-height: 34rem;
    width: 100%;
  }
  a {
    padding: 0.2rem 0;
    text-transform: none;
  }
  .prdct-itm-info {
    padding: 0.2rem 0;
    a {
      color: ${props => props.theme.darkblue};
    }
    .prdct-itm-title {
      padding: 0.3rem 0;
      font-size: 1.1rem;
      text-align: left;
      font-weight: bold;
    }
    .prdct-itm-price {
      padding: 0.4rem 0 0.2rem 0;
      font-size: 0.85rem;
      font-weight: bold;
      color: ${props => props.theme.lightGrey};
    }
    .prdct-itm-sale {
      padding-left: 0.5rem;
      color: ${props => props.theme.orange};
    }
    .prdct-itm-avail {
      padding: 0.2rem 0;
      font-style: italic;
      font-size: 1rem;
      color: ${props => props.theme.red};
    }
  }
  .prdct-itm-actns {
    padding: 0.2rem 0;
    font-size: 0.85rem;
    color: ${props => props.theme.textGrey};
    a {
      padding-right: 0.3rem;
      color: ${props => props.theme.textGrey};
      &:hover {
        color: ${props => props.theme.darkblue};
        text-decoration: underline ${props => props.theme.orange};
      }
    }
    button {
      padding: 0.3rem;
      border: 0;
      font-size: 0.9rem;
      font-weight: bold;
      color: ${props => props.theme.textGrey};
      &:hover {
        color: ${props => props.theme.darkblue};
        text-decoration: underline ${props => props.theme.orange};
      }
    }
  }
  .edit-prdct-var {
    color: ${props => props.theme.textGrey};
  }
`;

const StyledEditProduct = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4rem 3rem 1fr;
  .edt-prdct-title {
    grid-row: 1 / 1;
    font-size: 1.1rem;
    color: ${props => props.theme.textGrey};
  }
  .edt-prdct-tab {
    display: grid;
    grid-template-columns: 1fr minmax(45rem, 1fr) 1fr;
    grid-template-rows: 1fr minmax(50rem, 10fr);
  }
  .edt-prdct-navi {
    grid-row: 1 / 1;
    grid-column: 1 / -1;
    width: 100%;
    text-align: center;
  }
  .edt-prdct-cntnt {
    grid-row: 2 / 2;
    grid-column: 2 / 2;
    justify-content: center;
  }
`

const StyledCreateProduct = styled.div`
  display: grid;
  grid-template-rows: 3rem minmax(36rem, 1fr);
  grid-template-columns: 1fr minmax(36rem, 1fr) 1fr;
  form {
    grid-row: 2 / 2;
    grid-column: 2 / 2;
  }
`;

export default StyledProduct;
export {
  StyledProductVariants,
  StyledProductsList,
  StyledProductsListItem,
  StyledEditProduct,
  StyledCreateProduct
};
