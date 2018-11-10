import styled from 'styled-components';


const StyledProduct = styled.div`
  display: grid;
  grid-auto-columns: 1fr 1fr;
  grid-gap: 3rem;
  grid-auto-flow: column;
  min-height: 40rem;
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
    padding: 1rem 0;
  }
`;

const StyledProductVariants = styled.div`
  width: 100%;
  bottom: 0;
  .buy-prdct-slct {
    width: 280px;
  }
  button {
    text-decoration: none;
    background-color: ${props => props.theme.darkblue};
    color: white;
    border: none;
    padding: 0.5rem 1rem;
  }
  .buy-prdct-price {
    padding-bottom: 2rem;
  }
  .buy-prdct-add-btn {
    padding: 0.6rem 3rem;
    font-family: 'Tahoma', 'Geneva', sans-serif;
    font-weight: bold;
  }
`;

export default StyledProduct;
export { StyledProductVariants };
