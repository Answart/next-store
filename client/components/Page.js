import React, { Component } from 'react';
import Link from 'next/link';
import Meta from './Meta';


class Page extends Component {
  render() {
    return (
      <div>
        <Meta />

        <div>
          <div>
            <Link href="/search">
              <a>Search</a>
            </Link>
            <Link href="/">
              <a>Next Store</a>
            </Link>
            <Link href="/account">
              <a>Account</a>
            </Link>
          </div>

          <div>
            <Link href="/new" >
              <a>New</a>
            </Link>
            <Link href="/tops">
              <a>Tops</a>
            </Link>
            <Link href="/bottoms">
              <a>Bottoms</a>
            </Link>
            <Link href="/shoes">
              <a>Shoes</a>
            </Link>
            <Link href="/accessories">
              <a>Accessories</a>
            </Link>
            <Link href="/sale">
              <a>Sale</a>
            </Link>
          </div>
        </div>

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Page;
