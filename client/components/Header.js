import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav.js';
import Search from './Search.js';
import StyledHeader from './styles/HeaderStyles.js';
import { user } from '../lib/dummyData';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acctDrpdwn: false
    };
  }
  toggAcctDrpdwn = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    let currentState = this.state.acctDrpdwn;

    this.setState({ acctDrpdwn: !currentState });
  };
  toggleCart = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    console.log('toggling cart');
  }
  render() {
    const authed = !!user ? !!user.name : false;
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
                <span className="hdr-inline">
                  <button className="hdr-btn" onClick={this.toggAcctDrpdwn}>
                    Hi, {user.name}!
                  </button>
                  <div id="myDropdown" className={this.state.acctDrpdwn ? 'hdr-dropdown-content show' : 'hdr-dropdown-content'}>
                    <a href="/product/create">Create Product</a>
                    <a href={`/shop?name=${user.name}`}>My Products</a>
                    <a href="/account/orders">Order History</a>
                    <a href="/account/sold">Sale History</a>
                    <a href="/logout">Logout</a>
                  </div>
                </span>

                <Link href="/product/create">
                  <a>
                    <img src="/static/images/box.svg" alt="Sell" height="17" width="17" />
                  </a>
                </Link>
                <Link href={{
                  pathname: `/shop`,
                  query: { name: `${user.name}` }
                }}>
                  <a className="hdr-pad">
                    <img src="/static/images/package.svg" alt="Products" height="14" width="14" />
                  </a>
                </Link>

                <span className="hdr-inline hdr-pad">
                  <button className="hdr-btnn" onClick={this.toggleCart}>
                    <img src="/static/images/cart.svg" alt="Cart" height="14" width="14" />
                  </button>
                </span>
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
