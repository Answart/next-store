import styled from 'styled-components';


const StyledHeader = styled.header`
  top: 0;
  left: 0;
  background-color: ${props => props.theme.beige};
  .hdr-banner {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    justify-content: center;
    padding: 1rem 11rem;
  }
  .hdr-logo {
    display: grid;
    place-items: center center;
    font-family: 'guttenbg';
    a {
      font-size: 4rem !important;
      font-weight: normal;
      color: ${props => props.theme.darkBlue};
    }
  }
  .hdr-search {
    display: inline-grid;
    grid-auto-flow: column;
    align-items: stretch;
    justify-content: start;
    align-content: start;
    color: ${props => props.theme.darkGrey};
    padding: 1.1rem;
    svg.search-img {
      margin-top: 0.75rem;
    }
    input.search-input {
      line-height: 2rem;
      border: 0;
      font-size: 1rem;
      font-weight: bold;
      color: ${props => props.theme.darkBlue};
      margin: 0 0.5rem;
      padding: 0.5rem 0.5rem 0 0;
      background-color: transparent;
      border-bottom: 1px solid transparent;
      &:hover, &:active, &:focus {
        background-color: transparent;
        border-bottom: 1px solid ${props => props.theme.grey};
      }
      &:focus {
        outline: none;
        border-bottom: 1px solid ${props => props.theme.grey};
      }
    }
    button.hdr-search-btn {
      line-height: 1.7rem;
      padding-top: 0.5rem;
      font-size: 1rem;
      font-weight: bold;
      color: ${props => props.theme.darkGrey};
      &:hover, &:active, &:focus {
        color: ${props => props.theme.darkBlue};
        font-weight: bold;
      }
      &:disabled {
        color: ${props => props.theme.beige};
        pointer-events: none;
      }
    }
  }
  .hdr-nav {
    display: flex;
    justify-content: center;
    a {
      padding: 0 4rem 0.7rem 4rem !important;
      -webkit-font-smoothing: antialiased;
      outline: medium none;
      overflow: hidden;
      color: inherit;
      font-size: 1rem;
      letter-spacing: 0.1rem;
      font-weight: bold;
      border-bottom: 1.5px solid ${props => props.theme.beige};
      &:hover {
        color: ${props => props.theme.darkBlue};
        border-bottom: 1.5px solid ${props => props.theme.coral};
      }
    }
  }
  .hdr-menu {
    display: flex;
    justify-content: flex-end;
    padding-top: 0.55rem;
    color: ${props => props.theme.darkGrey};
    font-size: 1rem;
    a {
      font-size: 1rem;
      padding: 0 0.4rem;
    }
  }
  .hdr-btn {
    font-size: 0.9rem !important;
  }
  .hdr-pad {
    padding-top: 1.5rem !important;
  }
  .hdr-pad-sell {
    padding-top: 1.2rem !important;
  }
  .hdr-pad-shop {
    padding-top: 1.3rem !important;
  }
  .hdr-pad-cart {
    padding: 0.15rem 0.4rem 0 0.4rem !important;
    button {
      padding: 0;
    }
    img {
      margin-right: 1.1rem;
    }
  }
  .hdr-inline {
    position: relative;
    display: inline-block;
    font-size: 1rem;
    letter-spacing: 0.07rem;
  }
  .hdr-dropdown-content {
    position: absolute;
    display: none;
    padding: 10px 13px;
    background-color: white;
    min-width: 12rem;
    box-shadow: ${props => props.theme.headerShadow};
    z-index: 1;
  }
  .hdr-dropdown-content a {
    display: block;
    padding: 6px 0;
  }
  .show {
    display: block;
  }
`;


export default StyledHeader;
