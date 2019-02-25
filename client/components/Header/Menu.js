import Link from 'next/link';
import PropTypes from 'prop-types';
import User from '../User';
import SvgIcon from '../SvgIcon';
import { ToggleCart, Logout } from '../Buttons';


const Menu = props => (
  <User>
    {({ data }) => {
      if (!data || !data.me)
        return (
          <div className="hdr-menu">
            <Link href="/account">
              <a className="undrln-btn hdr-btn hdr-pad">
                Sign In
              </a>
            </Link>
            |
            <Link href="/signup">
              <a className="undrln-btn hdr-btn hdr-pad">
                Join
              </a>
            </Link>
          </div>
        )
      const { me } = data;
      const myDropdownClasses = props.acctDrpdwn
        ? 'hdr-dropdown-content show'
        : 'hdr-dropdown-content';
      return (
        <div className="hdr-menu">
          <span className="hdr-inline">
            <button id='hdrDropdownBtn' className="hdr-pad hdr-btn undrln-btn"
              onClick={props.toggAcctDrpdwn}
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
    }}
  </User>
);

Menu.propTypes = {
  acctDrpdwn: PropTypes.bool.isRequired,
  toggAcctDrpdwn: PropTypes.func.isRequired
};


export default Menu;
