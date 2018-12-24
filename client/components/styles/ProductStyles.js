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
    border: 1px solid ${props => props.theme.grey};
    background-color: transparent;
    &:focus {
      outline: ${props => props.theme.darkBlue};
      border-color: ${props => props.theme.darkBlue};
    }
    &:active {
      color: ${props => props.theme.darkBlue};
      border-color: ${props => props.theme.darkBlue};
    }
  }
  .prdct-imgs {
    background-color: yellow;
  }
  .prdct-content {
    color: ${props => props.theme.darkGrey};
    padding-right: 2rem;
  }
  .prdct-title {
    color: ${props => props.theme.darkBlue};
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
      color: ${props => props.theme.darkGrey};
      text-decoration: none;
    }
    a:hover {
      color: ${props => props.theme.darkBlue};
      text-decoration: underline ${props => props.theme.coral};
    }
  }
  .prdct-desc {
    border-top: 1px solid ${props => props.theme.darkGrey};
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
    border: 1px solid ${props => props.theme.grey};
    background-color: transparent;
    &:focus {
      outline: ${props => props.theme.darkBlue};
      border-color: ${props => props.theme.darkBlue};
    }
    &:active {
      color: ${props => props.theme.darkBlue};
      border-color: ${props => props.theme.darkBlue};
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
      color: ${props => props.theme.darkBlue};
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
      color: ${props => props.theme.grey};
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
    color: ${props => props.theme.darkGrey};
    a {
      padding-right: 0.3rem;
      color: ${props => props.theme.darkGrey};
      &:hover {
        color: ${props => props.theme.darkBlue};
        text-decoration: underline ${props => props.theme.coral};
      }
    }
    button {
      padding: 0.3rem;
      border: 0;
      font-size: 0.9rem;
      font-weight: bold;
      color: ${props => props.theme.darkGrey};
      &:hover {
        color: ${props => props.theme.darkBlue};
        text-decoration: underline ${props => props.theme.coral};
      }
    }
  }
  .edit-prdct-var {
    color: ${props => props.theme.darkGrey};
  }
`;

const StyledEditProductVariants = styled.div`
  display: grid;
  grid-gap: 2.5rem;
  .edit-prdct-lbl {
    padding: 1rem 0;
    font-weight: bold;
  }
`;

export default StyledProduct;
export {
  StyledProductVariants,
  StyledProductsList,
  StyledProductsListItem,
  StyledEditProductVariants
};
