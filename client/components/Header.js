import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav.js';
import Search from './Search.js';
import StyledHeader from './styles/HeaderStyles.js';


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
