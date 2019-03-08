import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Search from './Search.js';
import Menu from './Menu.js';
import Nav from './Nav.js';
import Cart from '../Cart';
import StyledHeader from '../styles/HeaderStyles.js';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../graphql';

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

    this.setState(state => ({ acctDrpdwn: !state.acctDrpdwn }));
  };
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, error }) => (
          <StyledHeader>
            <div className="hdr-banner">
              <Search />

              <div className="hdr-logo">
                <Link href="/">
                  <a>
                    NextStore
                  </a>
                </Link>
              </div>

              <Menu
                me={!!data ? data.me : null}
                acctDrpdwn={this.state.acctDrpdwn}
                toggAcctDrpdwn={this.toggAcctDrpdwn}
              />
            </div>

            <Cart
              me={!!data ? data.me : null}
            />

            <Nav />
          </StyledHeader>
        )}
      </Query>
    );
  }
};


export default Header;
