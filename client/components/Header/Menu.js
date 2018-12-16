import Link from 'next/link';
import Logout from '../Buttons/Logout.js';
import ToggleCart from '../Buttons/ToggleCart.js';
import { user } from '../../lib/dummyData';


const Menu = props => {
  const { acctDrpdwn, toggAcctDrpdwn } = props;
  const authed = !!user ? !!user.name : false;
  return (
    <div className="hdr-menu">
      {authed ? (
        <>
          <span className="hdr-inline">
            <button className="hdr-pad hdr-btn undrln-btn"
              onClick={toggAcctDrpdwn}
            >Hi, {user.name}!</button>

            <div id="myDropdown" className={acctDrpdwn ? 'hdr-dropdown-content show' : 'hdr-dropdown-content'}>
              <a className="undrln-btn" href="/sell">Create Product</a>
              <a className="undrln-btn" href={`/shop?name=${user.name}`}>My Products</a>
              <a className="undrln-btn" href="/account/orders">Order History</a>
              <a className="undrln-btn" href="/account/sales">Sale History</a>
              <Logout />
            </div>
          </span>

          <Link href="/sell"><a>
            <img src="/static/images/box.svg" alt="Sell" height="17" width="17" />
          </a></Link>

          <Link href={{
            pathname: "/shop",
            query: { name: `${user.name}` }
          }}><a className="hdr-pad">
            <img src="/static/images/package.svg" alt="Products" height="14" width="14" />
          </a></Link>

          <span className="hdr-inline hdr-pad">
            <ToggleCart>
              <img src="/static/images/cart.svg" alt="Cart" height="14" width="14" />
            </ToggleCart>
          </span>
        </>
      ) : (
        <>
          <Link href="/account">
            <a className="hdr-btn hdr-pad">
              Sign In
            </a>
          </Link>
          |
          <Link href="/signup">
            <a className="hdr-btn hdr-pad">
              Join
            </a>
          </Link>
        </>
      )}
    </div>
  )
};


export default Menu;
