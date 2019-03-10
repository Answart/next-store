import styled from 'styled-components';

const StyledPermissionsTable = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid ${props => props.theme.offWhite};
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    padding: 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      padding: 10px 5px;
      display: block;
    }
  }
  tr {
    &:hover {
      background: ${props => props.theme.offWhite};
    }
  }
`;

const StyledCartTable = styled.table`
  table-layout:fixed;
  height:100%;
  font-size: 1rem;
  letter-spacing: 0.02rem;
  border-spacing: 0;
  font-weight: bold;
  thead {
    tr {
      th {
        padding: 0.7rem 0;
        color: ${props => props.theme.darkBlue};
        text-align: center;
        width: 10rem;
        &:first-child {
          text-align: left;
          width: 32rem;
        }
      }
    }
  }
  tbody {
    width: 100%;
    height: 100%;
    max-height: 43.5rem;
    border-top: 1px solid ${props => props.theme.coral};
    border-bottom: 1px solid ${props => props.theme.coral};
    tr {
      padding: 2rem 0;
    }
    td {
      width: 10rem;
      padding: 0.75rem 0;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${props => props.theme.darkGrey};
      text-align: center;
      &.cart-page {
        width: 51rem;
      }
      &:first-child {
        text-align: left;
        width: 32rem;
      }
    }
  }
`;

const StyledCartItem = styled.tr`
  .cart-item-details {
    display: grid;
    grid-template-columns: 10rem 1fr;
    grid-auto-flow: column;
    grid-gap: 1rem;
    .cart-item-image {
      grid-column: 1 / 2;
      padding-right: 1rem;
    }
    .cart-item-meta {
      grid-column: 2 / 2;
      .cart-item-title {
        color: ${props => props.theme.darkBlue};
      }
      .cart-item-detail {
        padding: 0.1rem 0;
      }
    }
  }
  .cart-item-quantity-actions {
    display: grid;
    grid-template-columns: 1fr 1rem 1fr;
    grid-template-rows: 1rem 2rem;
    grid-gap: 0.5rem;
    place-items: start center;
    .cart-item-quantity-remove {
      grid-row: 2 / 2;
      grid-column: 2 / 2;
    }
    button {
      text-align: center;
    }
  }
`;

const StyledTotalsTable = styled.table`
  float: right;
  color: ${props => props.theme.darkBlue};
  text-align: right;
  .totals-table-last-item td {
    padding: 0 3.5rem 0.5rem 0;
  }
  td {
    width: 17rem;
    padding-right: 3.5rem;
  }
  tr {
    &:last-child {
      td {
        padding: 1rem 3.5rem 0 0;
        border-top: 1px solid ${props => props.theme.coral};
      }
    }
    td:last-child {
      width: 9rem;
    }
  }
`;


export {
  StyledPermissionsTable,
  StyledCartTable,
  StyledCartItem,
  StyledTotalsTable
};
