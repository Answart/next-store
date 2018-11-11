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
  .buy-prdct-imgs {
  }
  .buy-prdct-content {
    color: ${props => props.theme.textGrey};
  }
  .buy-prdct-padding {
    padding: 0.35rem 0;
  }
  .buy-prdct-creator {
    font-size: 1rem;
    a {
      text-decoration: none;
      padding: 0 0.1rem;
      font-weight: bold;
      font-size: 1rem;
      color: ${props => props.theme.textGrey};
    }
  }
  .buy-prdct-desc {
    border-top: 1px solid ${props => props.theme.textGrey};
    padding: 1rem 0 0 0;
  }
`;

const StyledProductVariants = styled.div`
  width: 100%;
  bottom: 0;
  .buy-prdct-slct {
    width: 280px;
  }
  select {
    width: 100%;
    height: 2rem;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid ${props => props.theme.textGrey};
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.darkblue};
    }
  }
  button {
    text-decoration: none;
    background-color: ${props => props.theme.darkblue};
    color: white;
    border: none;
    padding: 0.5rem 1.2rem;
  }
  .buy-prdct-price {
    padding-bottom: 2rem;
  }
  .buy-prdct-btn {
    padding: 0.6rem 3rem;
    font-family: 'Tahoma', 'Geneva', sans-serif;
    font-weight: bold;
    text-align: center;
  }
`;

const StyledProductsList = styled.div`
  display: grid;
  grid-template-rows: 1.9rem 5rem 10fr;
  grid-template-columns: 1fr 6fr;
  grid-gap: 2.5rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  .prod-lst-title {
    grid-column: 1 / -1;
    grid-row: 1 / 1;
  }
  .prod-lst-filters {
    grid-column: 1 / 1;
    grid-row: 2 / -1;
    max-width: ${props => props.theme.maxWidth};
  }
  .prod-lst-pagination {
    grid-column: 2 / -1;
    grid-row: 2 / 2;
    max-width: ${props => props.theme.maxWidth};
  }
  .prod-lst {
    grid-column: 2 / -1;
    grid-row: 3 / -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 0.5rem;
    justify-content: space-between;
    height: 100%;
  }
`;

export default StyledProduct;
export {
  StyledProductVariants,
  StyledProductsList
};
