import Link from 'next/link';
import PropTypes from 'prop-types';
import User from '../User';
import { ToggleCart, Logout } from '../Buttons';


const Menu = props => (
  <User>
    {({ data }) => {
      if (!data || !data.me)
        return (
          <div className="hdr-menu">
            <Link href="/account"><a className="undrln-btn hdr-btn hdr-pad">
              Sign In
            </a></Link>
            |
            <Link href="/signup"><a className="undrln-btn hdr-btn hdr-pad">
              Join
            </a></Link>
          </div>
        )
      const { me } = data;
      return (
        <div className="hdr-menu">
          <span className="hdr-inline">
            <button className="hdr-pad hdr-btn undrln-btn"
              onClick={props.toggAcctDrpdwn}
            >Hi, {me.name}!</button>

            <div id="myDropdown" className={props.acctDrpdwn ? 'hdr-dropdown-content show' : 'hdr-dropdown-content'}>
              <a className="undrln-btn" href="/sell">Create Product</a>
              <a className="undrln-btn" href={`/shop?name=${me.name}`}>My Products</a>
              <a className="undrln-btn" href="/account/orders">Order History</a>
              <a className="undrln-btn" href="/account/sales">Sale History</a>
              <Logout />
            </div>
          </span>

          <Link href="/sell"><a className="hdr-pad-sell">
            <img src="/static/images/box.svg" alt="Sell" height="19" width="19" />
          </a></Link>

          <Link href={{
            pathname: "/shop",
            query: { name: `${me.name}` }
          }}><a className="hdr-pad-shop">
            <img src="/static/images/package.svg" alt="Products" height="17" width="17" />
          </a></Link>

          <span className="hdr-inline hdr-pad-cart">
            <ToggleCart>
              <>
                <img src="/static/images/cart.svg" alt="Cart" height="16" width="16" />
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
