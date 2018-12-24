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
      color: ${props => props.theme.darkblue};
    }
  }
  .hdr-search {
    display: grid;
    grid-gap: 2px;
    grid-template-columns: 20px auto;
    place-items: center start;
    color: ${props => props.theme.textGrey};
    img.search-img {
      padding-top: 0.3rem;
      line-height: 1.7rem;
    }
    input.search-input {
      width: 85%;
      width: calc(100% - 3rem);
      line-height: 2rem;
      border: 0;
      font-size: 1rem;
      font-weight: bold;
      color: ${props => props.theme.darkblue};
      background-color: transparent;
    }
    input.search-input:hover {
      border-bottom: 1px solid ${props => props.theme.lightGrey};
    }
    input.search-input:focus {
      outline: none;
      background-color: transparent;
      border-bottom: 1px solid ${props => props.theme.lightGrey};
    }
  }
  .hdr-nav {
    display: flex;
    justify-content: center;
    a {
      padding: 0 3rem 0.7rem 3rem !important;
      -webkit-font-smoothing: antialiased;
      outline: medium none;
      overflow: hidden;
      border-bottom: 1px solid ${props => props.theme.beige};
    }
    a:hover {
      border-bottom: 1px solid ${props => props.theme.coral};
    }
  }
  .hdr-menu {
    display: flex;
    justify-content: flex-end;
    padding-top: 2.1rem;
    color: ${props => props.theme.textGrey};
    a {
      padding: 0 0.4rem;
    }
  }
  .hdr-btn {
    font-size: 0.9rem !important;
  }
  .hdr-pad {
    padding-top: 0.23rem !important;
  }
  .hdr-inline {
    position: relative;
    display: inline-block;
  }
  .hdr-dropdown-content {
    position: absolute;
    display: none;
    padding: 10px 13px;
    background-color: white;
    min-width: 12rem;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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
