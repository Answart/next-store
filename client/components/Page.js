import React, { Component } from 'react';
import Link from 'next/link';
import Meta from './Meta.js';
import Header from './Header.js';


class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Page;
