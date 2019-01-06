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
  margin: 0;
  padding: 0.2rem 0;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  letter-spacing: 0.02rem;
  border-spacing: 0;
  font-weight: bold;
  letter-spacing: 0.02rem;
  border-bottom: 1px solid ${props => props.theme.coral};
  td,
  th {
    padding: 0.5rem 0;
    position: relative;
    color: ${props => props.theme.darkGrey};
    text-align: center;
  }
  thead tr {
    display: block;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.coral};
    th {
      color: ${props => props.theme.darkBlue};
      width: 10rem;
      &:first-child {
        text-align: left;
        width: 34rem;
      }
      &:last-child {
        text-align: right;
        width: 8rem;
      }
    }
  }
  tbody {
    display: block;
    overflow: auto;
    -webkit-overflow-scrolling: auto;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    tr {
      margin: 0;
      width: 100%;
    }
    td.cart-page {
      width: 51rem;
    }
  }
`;

const StyledTotalsTable = styled.table`
  float: right;
  padding: 0.7rem 0;
  td {
    text-align: right;
    width: 15rem;
  }
  tr:first-child {
    td {
      padding-top: 1rem;
    }
  }
  tr:last-child {
    td {
      padding: 1rem 0;
      border-top: 1px solid ${props => props.theme.coral};
    }
  }
  .totals-table-last-item td {
    padding-bottom: 1rem;
  }
`;


export {
  StyledPermissionsTable,
  StyledCartTable,
  StyledTotalsTable
};
