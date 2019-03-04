import Link from 'next/link';
import PropTypes from 'prop-types';
import User from '../User';
import SvgIcon from '../SvgIcon';
import { ToggleCart, Logout } from '../Buttons';


const Menu = ({ me, acctDrpdwn, toggAcctDrpdwn }) => {
  const myDropdownClasses = acctDrpdwn
    ? 'hdr-dropdown-content show'
    : 'hdr-dropdown-content';
  if (!me) {
    return (
      <div className="hdr-menu">
        <Link href="/signup">
          <a className="undrln-btn hdr-btn hdr-pad">
            Signin
          </a>
        </Link>
      </div>
    )
  }
  return (
    <div className="hdr-menu">
      <span className="hdr-inline">
        <button id='hdrDropdownBtn' className="hdr-pad hdr-btn undrln-btn"
          onClick={toggAcctDrpdwn}
        >
          Hi, {me.name}!
        </button>

        <div id="myDropdown" className={myDropdownClasses}>
          <a className="undrln-btn" href="/sell">Create Product</a>
          <a className="undrln-btn" href={`/shop?name=${me.name}`}>My Products</a>
          <a className="undrln-btn" href="/account/orders">Order History</a>
          <a className="undrln-btn" href="/account/sales">Sale History</a>
          <Logout />
        </div>
      </span>

      <Link href="/sell">
        <a className="hdr-pad-sell">
          <SvgIcon width={18} name='openBox' title='Create Product' />
        </a>
      </Link>

      <Link href={{
        pathname: "/shop",
        query: { name: `${me.name}` }
      }}>
        <a className="hdr-pad-shop">
          <SvgIcon width={16} name='closedBox' title='My Products' />
        </a>
      </Link>

      <span className="hdr-inline hdr-pad-cart">
        <ToggleCart>
          <>
            <SvgIcon width={15} name='cart' title='My Cart' />
          </>
        </ToggleCart>
      </span>
    </div>
  )
};

Menu.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    cart: PropTypes.array.isRequired,
  }),
  acctDrpdwn: PropTypes.bool.isRequired,
  toggAcctDrpdwn: PropTypes.func.isRequired
};


export default Menu;
