import Link from 'next/link';
import Nav from './Nav.js';


const Header = () => (
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
      <div>Cart</div>
    </div>

    <Nav />
  </div>
)

export default Header;
