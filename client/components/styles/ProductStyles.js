import styled from 'styled-components';


const StyledProduct = styled.div`
  display: grid;
  grid-template-columns: 45rem minmax(20rem, 1fr);
  grid-auto-flow: column;
  grid-gap: 2.5rem;
  text-decoration: none;
  font-size: 1.1rem;
  img {
    width: 100%;
    height: 100%;
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
  .prdct-imgs {
    background-color: yellow;
  }
  .prdct-content {
    color: ${props => props.theme.textGrey};
    padding-right: 2rem;
  }
  .prdct-title {
    color: ${props => props.theme.darkblue};
    font-size: 1.17em;
    padding: 0;
    font-weight: bold;
  }
  .prdct-creator {
    padding-bottom: 1rem;
    font-weight: normal;
    a {
      padding: 0 0.1rem;
      font-weight: bold;
      color: ${props => props.theme.textGrey};
      text-decoration: none;
    }
    a:hover {
      color: ${props => props.theme.darkblue};
      text-decoration: underline ${props => props.theme.orange};
    }
  }
  .prdct-desc {
    border-top: 1px solid ${props => props.theme.textGrey};
    margin: 1rem 0;
    padding: 1rem 0;
  }
  .prdct-padding {
    padding: 0.35rem 0;
  }
`;

const StyledProductVariants = styled.div`
  text-decoration: none;
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
`;

const StyledProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 25rem));
  grid-gap: 2.5rem;
  justify-content: start;
`;

const StyledProductsListItem = styled.div`
  min-width: 16rem;
  max-width: 25rem;
  img {
    display: grid;
    grid-auto-columns: 1fr;
    min-height: 30rem;
    max-height: 35rem;
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

const StyledEditProductVariants = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 2.5rem;
  .edit-prdct-var-form {
    grid-column: 2 / 2;
    justify-content: center;
    background-color: ${props => props.theme.beige};
    box-shadow: ${props => props.theme.bs};
  }
`;

export default StyledProduct;
export {
  StyledProductVariants,
  StyledProductsList,
  StyledProductsListItem,
  StyledEditProductVariants
};
