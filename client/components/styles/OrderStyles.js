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

const StyledOrderListItems = styled.div`
  align-self: center;
  .order-list-item {
    display: grid;
    grid-template-columns: 24rem 1fr;
    grid-template-rows: 1fr 2rem;
    grid-auto-flow: column;
    padding: 2rem;
    margin: 3rem 6rem;
    align-self: center;
    background-color: ${props => props.theme.beige};
    box-shadow: ${props => props.theme.bs};
    .order-list-item-imgs {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      padding: 2rem;
      text-align: center;
      align-self: center;
      &.order-list-item-one-imgs {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
      }
      &.order-list-item-multi-imgs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-auto-flow: column;
        grid-gap: 1rem;
        padding-bottom: 1rem;
      }
      img {
        border-radius: 50%;
        &.order-list-item-multi-img {
          width: 8rem;
          height: 8rem;
        }
        &.order-list-item-one-img {
          width: 20rem;
          height: 20rem;
        }
      }
    }
    .order-list-item-details {
      grid-row: 1 / 2;
      grid-column: 2 / 2;
      text-align: center;
      grid-gap: 1.5rem;
      font-size: 1.35rem;
      font-weight: normal;
      justify-self: center;
      align-self: center;
      text-decoration: none;
      color: ${props => props.theme.darkGrey};
      .cart-item-title {
        padding-bottom: 1rem;
        font-size: 2rem;
        font-weight: bold;
      }
      .cart-item-detail {
        padding: 0.1rem 0;
      }
    }
    .order-list-item-plus {
      grid-row: 2 / 2;
      grid-column: 1 / 2;
      text-align: left;
      font-size: 1.25rem;
      text-decoration: none;
      color: ${props => props.theme.darkGrey};
    }
  }
  .page-title {
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin: 0;
    font-weight: 1.2rem;
    border-bottom: 2px solid ${props => props.theme.lightGrey};
    text-align: right;
    span {
      padding: 1rem;
      &:first-child {
        text-align: left;
      }
    }
  }
  p.page-detail {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 0;
    span {
      padding: 0.5rem;
      border-bottom: 1px solid ${props => props.theme.offWhite};
      text-align: left;
      &:first-child {
        font-weight: 900;
        text-align: right;
        padding-right: 1rem;
      }
    }
  }
`;


export {
  StyledOrder,
  StyledOrderListItems,
};
