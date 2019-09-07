import styled from 'styled-components';


const StyledFilter = styled.div`
  text-align: left;
  width: 100%;
  overflow: hidden;
  .filter {
    display: grid;
    text-align: center;
    align-items: stretch;
    justify-content: start;
    align-content: start;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
    margin-bottom: 1rem;
    .filter-banner {
      display: inline-grid;
      grid-template-columns: 10rem 4rem 4rem;
      grid-auto-flow: column;
      padding: 0.25rem 0;
      color: ${props => props.theme.grey};
      button h4 {
        padding: 0;
        margin: 0;
        text-align: left;
        justify-self: start;
        align-self: center;
        color: ${props => props.theme.darkBlue};
      }
      button.filter-clear-btn {
        justify-self: end;
        align-self: end;
        font-style: italic;
        color: ${props => props.theme.grey};
        &:hover {
          text-decoration: none;
          font-weight: normal;
          color: ${props => props.theme.darkGrey};
        }
      }
      button.filter-show-btn {
        justify-self: end;
        color: ${props => props.theme.grey};
      }
    }
    .filter-show {
      display: grid;
      grid-auto-flow: row;
      padding: 0.25rem 1rem;
      text-align: left;
      font-weight: normal;
      text-align: left;
      justify-content: start;
      button {
        text-align: left;
      }
    }
    .filter-show-color {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(3, 1fr);
      padding: 0.75rem 1rem;
      align-items: stretch;
    }
    .filter-show-size {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, 1fr);
      button {
        text-align: center;
      }
    }
    .filter-show-brand {
      padding: 0.5rem 1rem;
    }
    .filter-show-price {
      padding: 0.5rem 1rem;
    }
  }
`;


export {
  StyledFilter,
};
