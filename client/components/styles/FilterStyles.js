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
      .filter-brand {
        padding: 0.2rem 0;
      }
      .brand-label {
        font-weight: bold;
        padding-left: 0.5rem;
      }
    }
    .filter-show-price {
      padding: 0.5rem 1rem;
    }
  }
`;

const StyledFilterRange = styled.div`
  padding: 0.5rem 1.5em;
  display: block;
  .filter-range-preview {
    float: left;
    font-weight: bold;
    text-align: left;
    display: inline-block;
    width: 100%;
    span {
      &:nth-child(1) {
        text-align: left;
      }
      &:nth-child(2) {
        float: right;
        text-align: right;
      }
    }
  }
  .filter-range {
    /* background-color:yellow; */
    position: relative;
    display: block;
    height: 3em;
    width: 15em;
    input[type=range] {
      text-align: center;
      display: block;
      box-sizing: border-box;
      appearance: none;
      width:100%;
      margin: 0;
      padding: 5px 1.75px;
      overflow: hidden;
      border: 0;
      border-radius: 1px;
      outline: none;
      background: linear-gradient(grey, grey) no-repeat center;
      background-size: 100% 2px;
      pointer-events: none;
      cursor: pointer;
      position: absolute;
      &:active,
      &:focus {
        outline: none;
      }
      &:nth-child(2) {
        background: none;
        &::-webkit-slider-thumb::before {
          background-color: grey;
        }
        &::-moz-range-thumb::before {
          background-color: grey;
        }
      }
      /* support webkit (e.g. Chrome/Safari) */
      &::-webkit-slider-thumb {
        min-height: 1em;
        height: 1.5em;
        min-width: 1em;
        width: 1.5em;
        border-radius: 28px;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        appearance: none;
        pointer-events: all;
        outline: 0;
        box-shadow: 0 1px 4px 1.5px rgba(0, 0, 0, 0.35);
        &::before {
          content: ' ';
          display: block;
          position: absolute;
        }
        z-index: 10;
      }
      /* support for Firefox */
      &::-moz-range-thumb {
        min-height: 1em;
        height: 1.5em;
        min-width: 1em;
        width: 1.5em;
        border-radius: 28px;
        background-color: #fff;
        position: relative;
        margin: 5px 0;
        cursor: pointer;
        appearance: none;
        pointer-events: all;
        box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.35);
        &::before {
          content: ' ';
          display: block;
          position: absolute;
          top: 5px;
        }
        z-index: 10;
        -moz-appearance: none;
        background: linear-gradient(to bottom, #fff 0%, #fff 100%);
      }
      &::-moz-range-track {
        position: relative;
        z-index: -1;
        border: 0;
      }
      &::last-of-type::-moz-range-track {
        -moz-appearance: none;
        border: 0;
      }
      /* support  */
      &::-ms-thumb  {
      }
    }
  }
`;


export {
  StyledFilter,
  StyledFilterRange
};
