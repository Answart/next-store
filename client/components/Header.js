import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav.js';
import Search from './Search.js';


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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acctDrpdwn: false
    };
    this.toggAcctDrpdwn = this.toggAcctDrpdwn.bind(this);
  }
  toggAcctDrpdwn = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    let currentState = this.state.acctDrpdwn;

    this.setState({ acctDrpdwn: !currentState });
  };
  render() {
    const authed = true;
    return (
      <StyledHeader>
        <div className="hdr-banner">
          <Search />

          <div className="hdr-logo">
            <Link href="/">
              <a>NextStore</a>
            </Link>
          </div>

          <div className="hdr-account">
            {authed ? (
              <>
                <span className="hdr-dropdown">
                  <button className="hdr-dropbtn" onClick={(e) => this.toggAcctDrpdwn(e)}>
                    Firstname
                  </button>
                  <div id="myDropdown" className={this.state.acctDrpdwn ? 'hdr-dropdown-content show' : 'hdr-dropdown-content'}>
                    <a href="/account/sell">Create Sale</a>
                    <a href="/account/sales">Current Sales</a>
                    <a href="/account/orders">Order History</a>
                    <a href="/account/sold">Sale History</a>
                    <a href="/logout">Logout</a>
                  </div>
                </span>
                <Link href="/sell">
                  <a>
                    <img src="/static/images/box.svg" alt="Sell" height="17" width="17" />
                  </a>
                </Link>
                <Link href="/account/sell">
                  <a className="hdr-pad">
                    <img src="/static/images/package.svg" alt="Sell" height="14" width="14" />
                  </a>
                </Link>
                <Link href="/account/cart">
                  <a className="hdr-pad">
                    <img src="/static/images/cart.svg" alt="Cart" height="13" width="13" />
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/account">
                  <a className="hdr-pad">
                    Sign In
                  </a>
                </Link>
                |
                <Link href="/signup">
                  <a className="hdr-pad">
                    Join
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>

        <Nav />
      </StyledHeader>
    );
  }
}

export default Header;
