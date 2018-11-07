import styled from 'styled-components';


const StyledHeader = styled.header`
  top: 0;
  left: 0;
  background-color: ${props => props.theme.beige};
  a {
    color: ${props => props.theme.textGrey};
  }
  a:hover {
    color: ${props => props.theme.darkblue};
  }
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
  .hdr-account {
    display: flex;
    justify-content: flex-end;
    padding-top: 2.45rem;
    color: ${props => props.theme.textGrey};
    a {
      padding-top: 0;
      padding-left: 0.4rem;
      padding-bottom: 0;
      padding-right: 0.4rem;
    }
  }
  .hdr-pad {
    padding-top: 0.23rem !important;
  }
  .hdr-dropbtn {
    border: none;
    color: ${props => props.theme.textGrey};
    background-color: transparent;
    font-size: 0.85rem;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
  }
  .hdr-dropbtn:hover {
    color: ${props => props.theme.darkblue};
  }
  .hdr-dropdown {
    position: relative;
    display: inline-block;
  }
  .hdr-dropdown-content {
    position: absolute;
    display: none;
    padding: 10px 13px;
    background-color: white;
    min-width: 10rem;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  .hdr-dropdown-content a {
    display: block;
    padding: 6px 0;
    color: ${props => props.theme.textGrey};
    font-size: 0.85rem;
    font-weight: bold;
    text-decoration: none;
  }
  .hdr-dropdown-content a:hover {
    display: block;
    color: ${props => props.theme.textGrey};
    text-decoration: underline ${props => props.theme.orange};
  }
  .show {
    display: block;
  }
`;

export default StyledHeader;
