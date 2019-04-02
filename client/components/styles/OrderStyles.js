import styled from 'styled-components';


const StyledOrder = styled.div`
  padding: 2rem;
  margin: 3rem 6rem;
  align-self: center;
  align-self: center;
  background-color: ${props => props.theme.beige};
  box-shadow: ${props => props.theme.bs};
  h2 {
    display: grid;
    grid-template-columns: 2fr 2fr;
    margin: 0;
    border-bottom: 2px solid ${props => props.theme.lightGrey};
    text-align: right;
    span {
      padding: 1rem;
      &:first-child {
        text-align: left;
      }
    }
  }
  .order-payment-details {
    padding: 1rem 0;
    p {
      display: grid;
      grid-template-columns: 1fr 4fr;
      margin: 0;
      border-bottom: 1px solid ${props => props.theme.offWhite};
      span {
        padding: 0.5rem;
        &:first-child {
          font-weight: 900;
          text-align: right;
        }
      }
    }
  }
`;


export {
  StyledOrder,
};
