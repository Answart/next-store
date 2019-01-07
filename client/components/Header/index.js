import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Search from './Search.js';
import Menu from './Menu.js';
import Nav from './Nav.js';
import Cart from '../Cart';
import StyledHeader from '../styles/HeaderStyles.js';


Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

class Header extends Component {
  state = { acctDrpdwn: false };
  toggAcctDrpdwn = e => {
    if (!!e && e.preventDefault) e.preventDefault();
    let currentState = this.state.acctDrpdwn;

    this.setState({ acctDrpdwn: !currentState });
  };
  render() {
    return (
      <StyledHeader>
        <div className="hdr-banner">
          <Search />

          <div className="hdr-logo">
            <Link href="/"><a>
              NextStore
            </a></Link>
          </div>

          <Menu
            acctDrpdwn={this.state.acctDrpdwn}
            toggAcctDrpdwn={this.toggAcctDrpdwn}
          />
        </div>
        <Cart />

        <Nav />
      </StyledHeader>
    );
  }
};


export default Header;
