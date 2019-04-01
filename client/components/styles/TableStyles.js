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
  border-bottom: 1px solid ${props => props.theme.coral};
  thead {
    height: 5%;
    tr {
      display: block;
      margin-top: 0;
      top: 0;
      border-bottom: 1px solid ${props => props.theme.coral};
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
    display: block;
    max-height: 44rem;
    height: 100%;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: auto;
    td {
      width: 10rem;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${props => props.theme.darkGrey};
      text-align: center;
      padding: 0.5rem 0;
      &.cart-page {
        width: 51rem;
      }
      &:first-child {
        text-align: left;
        width: 32rem;
      }
    }
  }
  tr {
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

const StyledOrderTable = styled.table`
  margin: 0;
  padding: 0.2rem 0;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  letter-spacing: 0.02rem;
  border-spacing: 0;
  font-weight: bold;
  letter-spacing: 0.02rem;
  table-layout:fixed;
  .column-one {
    width: 60%;
    text-align: left;
  }
  .column-two {
    width: 20%;
    text-align: center;
  }
  .column-three {
    width: 20%;
    text-align: center;
  }
  thead {
    tr {
      th {
        padding: 0.7rem 0;
        color: ${props => props.theme.darkBlue};
        border-bottom: 2px solid ${props => props.theme.coral};
      }
    }
  }
  tbody {
    height: 100px;
    overflow-y: auto;
    overflow-x: hidden;
    tr {
      padding: 2rem 0;
    }
    td {
      padding: 1.5rem 0;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      .order-item-details {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 10rem 1fr;
        grid-gap: 1rem;
        text-align: left;
        .order-item-image {
          grid-column: 1 / 2;
        }
        .order-item-meta {
          grid-column: 2 / 2;
          text-align: left;
          .order-item-title {
            color: ${props => props.theme.darkBlue};
          }
          .order-item-detail {
            padding: 0.1rem 0;
          }
        }
      }
      .order-item-quantity {
        text-align: center;
        justify-content: center;
        justify-self: center;
        align-content: start;
        align-items: start;
        align-self: start;
      }
      .order-item-price {
        text-align: center;
        justify-content: center;
        justify-self: center;
        align-content: start;
        align-items: start;
        align-self: start;
      }
    }
  }
  tfoot {
    color: ${props => props.theme.darkBlue};
    tr {
      td {
        border-top: 2px solid ${props => props.theme.coral};
        text-align: center;
        padding: 1rem 0;
        &:first-child {
          text-align: right;
        }
      }
    }
  }
`;


export {
  StyledPermissionsTable,
  StyledCartTable,
  StyledTotalsTable,
  StyledOrderTable,
};
